<?php

namespace App\Http\Controllers;

use App\Models\Memo;
use Illuminate\Http\Request;

class MemoController extends Controller
{
    //* 一覧取得
    public function index()
    {
        return Memo::orderBy('created_at', 'desc')->get();
    }

    //*　新規作成
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        return Memo::create($validated);
    }

    //* 詳細取得
    public function show($id)
    {
        return Memo::findOrFile($id);
    }

    //* 更新
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $memo = Memo::findOrFile($id);
        $memo->update($validated);

        return $memo;
    }

    //* 削除
    public function destroy($id)
    {
        $memo = Memo::findOrFail($id);
        $memo->delete();

        return response()->json(['message' => 'deleted']);
    }
}
