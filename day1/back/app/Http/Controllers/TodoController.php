<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index() {
        return Todo::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        return Todo::create($validated);
    }

    public function destroy($id) {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'deleted']);
    }

    public function toggle($id) {
        $todo = Todo::findOrFail($id);
        $todo->completed = !$todo->completed;
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
