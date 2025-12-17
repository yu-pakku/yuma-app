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
    const [editingId, setEditingId] = useState<number | null>(null);

    //* 一覧取得
    const fetchMemos = async () => {
        const res = await fetch("http://localhost:8003/api/memos");
        const data = await res.json();
        setMemos(data);
        setLoading(false)
    };

    //* 追加
    const addMemo = async () => {
        if (!title.trim() || !content.trim()) return;

        await fetch("http://localhost:8003/api/memos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        });

        setTitle("");
        setContent("");
        fetchMemos();
    };

    //* 更新
    const updateMemo = async () => {
        if(!editingId) return;

        await fetch(`http://localhost:8003/api/memos/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        });

        setEditingId(null);
        setTitle("");
        setContent("");
        fetchMemos();
    };

    //* 削除
    const deleteMemo = async (id: number) => {
        await fetch(`http://localhost:8003/api/memos/${id}`, {
            method: "DELETE",
        });

        fetchMemos();
    };

    //* 初回読み込み
    useEffect(() => {
        fetchMemos();
    }, []);

    if (loading) {
        return <p className="p-4">読み込み中...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl mx-auto">
                {/* {入力フォーム} */}
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
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <button
                        onClick={editingId ? updateMemo : addMemo}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {editingId ? "更新" : "追加"}
                    </button>
                </div>

                {/*　一覧　*/}
                <h1 className="text-2xl font-bold mb-4">メモ一覧</h1>

                <ul className="space-y-3">
                    {memos.map((memo) => (
                        <li
                            key={memo.id}
                            className="bg-white p-4 rounded-lg shadow"
                        >
                            <h2 className="font-semibold text-lg">{memo.title}</h2>
                            <p className="text-gray-600 text-sm mt-1">{memo.content}</p>

                            <div className="flex gap-4 mt-3 text-sm">
                                <button
                                    onClick={() => {
                                        setEditingId(memo.id);
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
        </div>
    );
}