"use client"

import { useEffect, useState } from "react";

type Memo = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

export default function Home() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const fetchMemos = async () => {
        const res = await fetch("http://localhost:8002/api/memos");
        const data = await res.json();
        setMemos(data);
        setLoading(false);
    };

    const addMemo = async () => {
        if (!title.trim() || !content.trim()) return;

        await fetch("http://localhost:8002/api/memos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });

        setTitle("");
        setContent("");
        fetchMemos(); //* 一覧更新
    }

    const deleteMemo = async (id: number) => {
        await fetch(`http://localhost:8002/api/memos/${id}`, {
            method: "DELETE",
        });

        fetchMemos();
    }

    const updateMemo = async (id: number, title: string, content: string) => {
        await fetch(`http://localhost:8002/api/memos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        });

        fetchMemos(); //* 更新後に再取得
    };

    useEffect(() => {
        fetchMemos();
    }, []);

    if (loading) {
        return <p className="p-4">読み込み中...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <input
                    type="text"
                    placeholder="タイトル"
                    className="w-full border p-2 rounded mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="内容"
                    className="w-full border p-2 rounded mb-2"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>
                </textarea>
                <button
                    onClick={addMemo}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    追加
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">メモ一覧</h1>

            <ul className="space-y-3">
                {memos.map((memo) => (
                    <li
                        key={memo.id}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <div>
                            <h2 className="font-semibold text-lg">{memo.title}</h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {memo.content}
                            </p>
                        </div>

                        <button
                            onClick={() => deleteMemo(memo.id)}
                            className="text-red-500 hover:underline text-sm"
                        >
                            削除
                        </button>
                        <button
                            onClick={() => {
                                const newTitle = prompt("新しいタイトル", memo.title);
                                const newContent = prompt("新しい内容", memo.content);

                                if (newTitle && newContent) {
                                    updateMemo(memo.id, newTitle, newContent);
                                }
                            }}
                            className="text-blue-500 hover:underline text-sm mr-2"
                        >
                            編集
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}