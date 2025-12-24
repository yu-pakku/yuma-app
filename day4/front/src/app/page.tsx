"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMemoStore } from "./store/memoStore";

export default function Homepage() {
  const {
    memos,
    tags,
    fetchMemos,
    fetchTags,
    deleteMemo,
    createTag,
  } = useMemoStore();

  const [tagName, setTagName] = useState("");

  useEffect(() => {
    fetchMemos();
    fetchTags();
  }, [fetchMemos, fetchTags]);

  const handleAddTag = async () => {
    if (!tagName.trim()) return;

    try {
      await createTag(tagName);
      setTagName("");
    } catch (e) {
      alert("Tag already exists or failed to create");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Memos</h1>

        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Memo
        </Link>
      </div>

      {/* タグ作成 */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Add Tag</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="New tag name"
          />
          <button
            onClick={handleAddTag}
            className="bg-green-600 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* 既存タグ一覧 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-200 px-2 py-1 rounded text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* メモ一覧 */}
      <ul className="space-y-3">
        {memos.map((memo) => (
          <li
            key={memo.id}
            className="border p-3 rounded flex justify-between items-start"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{memo.title}</h2>
              <p className="text-sm text-gray-700">{memo.content}</p>

              {/* メモに付いたタグ */}
              <div className="flex flex-wrap gap-2 mt-2">
                {memo.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 操作ボタン */}
            <div className="flex flex-col gap-2 ml-4">
              <Link
                href={`/memos/${memo.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded text-center"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteMemo(memo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
