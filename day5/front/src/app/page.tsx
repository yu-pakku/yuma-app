'use client';

import { useEffect } from 'react';
import { useTaskStore } from './store/taskStore';
import Link from 'next/link';

export default function TaskListPage() {
    const {
        tasks,
        categories,
        fetchTasks,
        fetchCategories,
        deleteTask,
        selectedCategory,
        setSelectedCategory,
    } = useTaskStore();

    useEffect(() => {
        fetchTasks();
        fetchCategories();
    }, []);

    const filteredTasks = selectedCategory
        ? tasks.filter((task) =>
            task.categories.some((cat) => cat.id === selectedCategory)
        )
        : tasks;

    return (
        <div className='p-4 max-w-3xl mx-auto'>
            <h1 className='text-2xl font-bold mb-4'>Tasks</h1>

            {/* カテゴリフィルタ */}
            <div className='flex flex-wrap gap-2 mb-4'>
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-2 py-1 rounded ${
                        selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2 py-1 rounded ${
                            selectedCategory === cat.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* タスク一覧 */}
            <ul className='space-y-3'>
                {filteredTasks.map((task) => (
                    <li
                        key={task.id}
                        className='border p-3 rounded flex justify-between items-start'
                    >
                        <div className='flex-1'>
                            <h2 className='font-semibold text-lg'>{task.title}</h2>
                            <p className='text-sm text-gray-700'>{task.description}</p>
                            <p className='text-sm text-gray-500'>
                                Due: {task.due_date || 'N/A'} |{' '}
                                {task.is_completed ? 'Completed' : 'Incomplete'}
                            </p>

                            {/* タスクに付いたカテゴリ */}
                            <div className='flex flex-wrap gap mt-2'>
                                {task.categories.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className='bg-gray-200 px-2 py-1 rounded text-sm'
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 操作 */}
                        <div className='flex flex-col gap-2 ml-4'>
                            <Link
                                href={`/tasks/${task.id}/edit`}
                                className='bg-blue-500 text white px-3 py-1 rounded text-center'
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => deleteTask(task.id)}
                                className='bg-red-500 text-white px-3 py-1 rounded'
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Link
                href="/create"
                className='mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded'
            >
                New Task
            </Link>
        </div>
    );
}