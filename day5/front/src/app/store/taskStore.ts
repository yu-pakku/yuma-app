'use client';

import { create } from 'zustand';

const API_BASE = 'http://localhost:8005/api';

interface Category {
    id: number;
    name: string;
}

interface Task {
    id: number;
    title: string;
    description?: string;
    due_date?: string;
    is_completed: boolean;
    categories: Category[];
}

interface TaskStore {
    tasks: Task[];
    categories: Category[];
    selectedCategory: number | null;

    fetchTasks: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    createTask: (data: Partial<Task>) => Promise<void>;
    updateTask: (id: number, data: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    createCategory: (name: string) => Promise<void>;
    setSelectedCategory: (id: number | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    categories: [],
    selectedCategory: null,

    fetchTasks: async () => {
        const res = await fetch('${API_BASE}/tasks');
        const data = await res.json();
        set({ tasks: data });
    },

    fetchCategories: async () => {
        const res = await fetch(`${API_BASE}/categories`);
        const data = await res.json();
        set({ categories: data });
    },

    createTask: async (data) => {
        await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        await get().fetchTasks();
    },

    updateTask: async (id,data) => {
        await fetch(`{API_BASE}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        await get().fetchTasks();
    },

    deleteTask: async (id) => {
        await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'DELETE',
        });
        await get().fetchTasks();
    },

    createCategory: async (name) => {
        await fetch(`${API_BASE}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        await get().fetchCategories();
    },

    setSelectedCategory: (id) => set({ selectedCategory: id }),
}));