'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMemoStore } from '../../store/memoStore';

export default function EditMemoPage() {
    const params = useParams();
    const router = useRouter();

  //! 🔴 ここが超重要：params.id を number に確定させる
    const id = Number(params.id);

    const {
        fetchMemo,
        updateMemo,
        tags,
        fetchTags,
    } = useMemoStore();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //! id が不正なら何もしない
        if (!id || Number.isNaN(id)) return;

        const init = async () => {
            try {
                await fetchTags();

        const memo = await fetchMemo(id);

        setTitle(memo.title);
        setContent(memo.content);
        setSelectedTags(memo.tags.map((t: any) => t.id));
    } catch (error) {
        console.error('Failed to load memo:', error);
    } finally {
        setLoading(false);
    }
    };

        init();
    }, [id, fetchMemo, fetchTags]);

    const toggleTag = (tagId: number) => {
        setSelectedTags((prev) =>
            prev.includes(tagId)
                ? prev.filter((t) => t !== tagId)
                : [...prev, tagId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id || Number.isNaN(id)) return;

        try {
            await updateMemo(id, {
                title,
                content,
                tags: selectedTags,
        });

        router.push('/');
        } catch (error) {
        console.error('Update failed:', error);
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 max-w-full mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Memo</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                className="border p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                className="border p-2 w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-2 py-1 rounded ${
                        selectedTags.includes(tag.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                >
                    {tag.name}
                </button>
            ))}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Save
            </button>
        </form>
    </div>
    );
}
