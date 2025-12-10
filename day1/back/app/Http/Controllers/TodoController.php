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

        return Todo::created($validated);
    }
}
