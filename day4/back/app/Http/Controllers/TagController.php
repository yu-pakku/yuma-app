<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    //* タグ一覧取得
    public function index() {
        return Tag::all();
    }

    //* タグ作成
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:tags,name',
        ]);

        $tag = Tag::create($validated);

        return response()->json($tag, 201);
    }
}
