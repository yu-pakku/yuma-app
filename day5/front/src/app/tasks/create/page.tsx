'use client';

import { useEffect, useState } from 'react';
import { useTaskStore } from '@/app/store/taskStore';
import { useRouter } from 'next/navigation';

export default function CreateTaskPage() {
    const router = useRouter();
    const {
        createTask,
        fetchCategories,
        categories,
    } = useTaskStore();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleCategory = (id: number) => {
        setSelectedCategories((prev) =>
        prev.includes(id)
            ? prev.filter((c) => c !== id)
            : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createTask({
            title,
            description,
            due_date: dueDate || null,
            is_completed: false,
            categories: selectedCategories,
        });

        router.push('/');
    };

    return (
        <div className='p-4 max-w-xl mx-auto'>
            <h1 className='text-2xl font-bold mb-4'>Create Task</h1>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <label>
                    <input
                        className='border p-2 w-full'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className='border p-2 w-full'
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        className='border p-2 w-full'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>

                <div className='flex flex-wrap gap-2'>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type='button'
                            onClick={() => toggleCategory(category.id)}
                            className={`px-3 py-1 rounded ${
                                selectedCategories.includes(category.id)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <button className='bg-blue-600 text-white px-4 py-2 rounded'>
                    Create
                </button>
            </form>
        </div>
    )
}