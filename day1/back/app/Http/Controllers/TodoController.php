<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\HttpCache\Store;

class TodoController extends Controller
{
    public function index() {
        return Todo::orderBy('created_at', 'desc')->get();
    }

    public function store(StoreTodoRequest $request) {
        return Todo::create($request->validated());
    }

    public function destroy($id) {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'deleted']);
    }

    public function toggle($id) {
        $todo = Todo::findOrFail($id);
        $todo->done = !$todo->done;
        $todo->save();

        return $todo;
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::findOrFail($id);
        $todo->update($validated);

        return $todo;
    }
}
