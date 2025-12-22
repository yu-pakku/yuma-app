<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Memo;
use App\Models\Tag;

class MemoController extends Controller
{
    //* メモ一覧取得
    public function index()
    {
        return Memo::with('tags')->get();
    }

    //* メモ作成
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            "content" => 'required|string',
            'tags' => 'array'
        ]);

        $memo = Memo::create([
            'title' => $request->title,
            'content' => $request->content
        ]);

        if ($request->has('tags')) {
            $memo->tags()->attach($request->tags);
        }

        return $memo->load('tags');
    }

    //* メモ詳細取得
    public function show($id)
    {
        return Memo::with('tags')->findOrFail($id);
    }

    //* メモ更新
    public function update(Request $request, $id)
    {
        $memo = Memo::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'tags' => 'array'
        ]);

        $memo->update([
            'title' => $request->title,
            'content' => $request->content
        ]);

        if ($request->has('tags')) {
            $memo->tags()->sync($request->tags);
        }

        return $memo->load('tags');
    }

    //*　メモ一覧
    public function destroy($id)
    {
        $memo = Memo::findOrFail($id);
        $memo->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
