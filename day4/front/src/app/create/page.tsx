'use client';

import { useEffect, useState } from 'react';
import { useMemoStore } from '.././store/memoStore';
import { useRouter } from 'next/navigation';

export default function CreateMemoPage() {
  const { createMemo, tags, fetchTags } = useMemoStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const router = useRouter();

  // 初回タグ取得
  useEffect(() => { fetchTags(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMemo({ title, content, tags: selectedTags });
    setTitle('');
    setContent('');
    setSelectedTags([]);
    router.push('/');
  };

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Memo</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="border p-2 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag.id}
              className={`px-2 py-1 rounded ${
                selectedTags.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
