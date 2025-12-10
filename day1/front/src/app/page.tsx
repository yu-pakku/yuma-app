"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

//*　一覧取得
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:8001/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

//*　追加処理
  const addTodo = async () => {
    if (!title.trim()) return;

    await fetch("http://localhost:8001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Todo を入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            追加
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo: any) => (
            <li
              key={todo.id}
              className="bg-gray-50 border border-gray-200 p-3 rounded-md"
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
