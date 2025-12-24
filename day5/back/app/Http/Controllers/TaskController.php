<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::with('categories')->get();
    }

    public function show(Task $task)
    {
        return $task->load('categories');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'is_completed' => 'boolean',
            'categories' => 'array',
            'categories.*' => 'integer|exists:categories,id',
        ]);

        $task = Task::create($validated);
        if (isset($validated['categories'])) {
            $task->categories()->sync($validated['categories']);
        }

        return response()->json($task->load('categories'), 201);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'is_completed' => 'boolean',
            'categories' => 'array',
            'categories.*' => 'integer|exists:categories,id',
        ]);

        $task->update($validated);
        if (isset($validated['categories'])) {
            $task->categories()->sync($validated['categories']);
        }

        return $task->load('categories');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
