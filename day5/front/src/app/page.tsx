'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTaskStore } from './store/taskStore';

export default function TaskListPage() {
  const {
    tasks,
    categories,
    fetchTasks,
    fetchCategories,
    deleteTask,
    updateTask,
    createCategory,
    selectedCategory,
    setSelectedCategory,
  } = useTaskStore();

  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  // カテゴリフィルタ
  const filteredTasks = selectedCategory
    ? tasks.filter((task) =>
        task.categories.some((cat) => cat.id === selectedCategory)
      )
    : tasks;

  // 未完了 → 完了 の順で並び替え
  const sortedTasks = [...filteredTasks].sort(
    (a, b) => Number(a.is_completed) - Number(b.is_completed)
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link
          href="/tasks/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          New Task
        </Link>
      </div>

      {/* カテゴリ作成 */}
      <div className="mb-6 border p-3 rounded">
        <h2 className="font-semibold mb-2">Add Category</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newCategory.trim()) return;

            await createCategory(newCategory);
            setNewCategory('');
          }}
          className="flex gap-2"
        >
          <input
            className="border p-2 flex-1"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </form>
      </div>

      {/* カテゴリフィルタ */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-2 py-1 rounded ${
            selectedCategory === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
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

      {/* 空状態 */}
      {sortedTasks.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No tasks found
        </p>
      )}

      {/* タスク一覧 */}
      <ul className="space-y-3">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded flex justify-between items-start"
          >
            <div className="flex-1">
              <h2
                className={`font-semibold text-lg ${
                  task.is_completed
                    ? 'line-through text-gray-500'
                    : ''
                }`}
              >
                {task.title}
              </h2>

              <p className="text-sm text-gray-700">
                {task.description}
              </p>

              <p className="text-sm text-gray-500">
                Due: {task.due_date || 'N/A'} |{' '}
                {task.is_completed ? 'Completed' : 'Incomplete'}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {task.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 操作 */}
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() =>
                  updateTask(task.id, {
                    title: task.title,
                    description: task.description,
                    due_date: task.due_date,
                    is_completed: !task.is_completed,
                    categories: task.categories.map((c) => c.id),
                  })
                }
                className={`px-3 py-1 rounded text-white ${
                  task.is_completed
                    ? 'bg-gray-500'
                    : 'bg-green-600'
                }`}
              >
                {task.is_completed ? 'Undo' : 'Done'}
              </button>

              <Link
                href={`/tasks/${task.id}/edit`}
                className="bg-blue-500 text-white px-3 py-1 rounded text-center"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteTask(task.id)}
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
