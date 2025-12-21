"use client";

import { useEffect, useState } from "react";
import { useMemoStore, Memo } from "./store/memoStore";

export default function Home() {
  const {
    memos,
    loading,
    fetchMemos,
    addMemo,
    updateMemo,
    deleteMemo,
  } = useMemoStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  if (loading) return <p className="p-4">読み込み中...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* フォーム */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={4}
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {editingMemo ? (
          <button
            onClick={() => {
              updateMemo(editingMemo.id, title, content);
              setEditingMemo(null);
              setTitle("");
              setContent("");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            更新
          </button>
        ) : (
          <button
            onClick={() => {
              if (!title || !content) return;
              addMemo(title, content);
              setTitle("");
              setContent("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            追加
          </button>
        )}
      </div>

      {/* 一覧 */}
      <h1 className="text-2xl font-bold mb-4">メモ一覧</h1>

      <ul className="space-y-3">
        {memos.map((memo) => (
          <li
            key={memo.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{memo.title}</h2>
              <p className="text-sm text-gray-600">{memo.content}</p>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => {
                  setEditingMemo(memo);
                  setTitle(memo.title);
                  setContent(memo.content);
                }}
                className="text-blue-500 hover:underline"
              >
                編集
              </button>

              <button
                onClick={() => deleteMemo(memo.id)}
                className="text-red-500 hover:underline"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
