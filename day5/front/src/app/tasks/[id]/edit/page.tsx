'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/app/store/taskStore';

export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const {
        tasks,
        categories,
        fetchCategories,
        updateTask,
    } = useTaskStore();

    const task = tasks.find((t) => t.id === Number(id));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {
        fetchCategories();
        if (task) {
            setTitle(task.title);
            setDescription(task.description ?? '');
            setSelectedCategories(task.categories.map((c: any) => c.id));
        }
    }, [task]);

    if (!task) return <p className='p-4'>Loading...</p>;

    const toggleCategory = (id: number) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((c) => c !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await updateTask(task.id, {
            title,
            description,
            is_completed: task.is_completed,
            categories: selectedCategories,
        });

        router.push('/')
    };

    return (
        <div className='p-4 max-w-xl mx-auto'>
            <h1 className='text-2xl font-bold mb-4'>Edit Task</h1>

            <form onSubmit={handleSubmit} className='space-y-3'>
                <label>
                    <input
                        className='border p-2 w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className='border p-2 w-full'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <div className='flex flex-wrap gap-2'>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type='button'
                            onClick={() => toggleCategory(cat.id)}
                            className={`px-2 py-1 rounded ${
                                selectedCategories.includes(cat.id)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}>
                                {cat.name}
                        </button>
                    ))}
                </div>

                <button className='bg-blue-600 text-white px-4 py-2 rounded'>
                    Save
                </button>
            </form>
        </div>
    )
}