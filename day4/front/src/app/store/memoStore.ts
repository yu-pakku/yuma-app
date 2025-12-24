import { create } from 'zustand';

export interface Tag {
    id: number;
    name: string;
}

export interface Memo {
    id: number;
    title: string;
    content: string;
    tags: Tag[];
}

interface MemoState {
    memos: Memo[];
    tags: Tag[];
    fetchMemos: () => Promise<void>;
    fetchTags: () => Promise<void>;
    createMemo: (data: { title: string; content?: string; tags?: number[] }) =>Promise<void>;
    updateMemo: (id: number, data: { title: string; content?: string; tags?: number[] }) => Promise<void>;
    deleteMemo: (id: number) => Promise<void>;
    createTag: (name: string) => Promise<void>;
    fetchMemo: (id: number) => Promise<Memo>;
}

export const useMemoStore = create<MemoState>((set, get) => ({
    memos: [],
    tags: [],

    fetchMemos: async () => {
        const res = await fetch('http://localhost:8004/api/memos', {
            headers: { 'x-demo-token': 'demo123' },
        });
        const data = await res.json();
        set({ memos: data });
    },

    fetchTags: async () => {
        const res = await fetch('http://localhost:8004/api/tags', {
            headers: { 'x-demo-token': 'demo123' },
        });
        const data = await res.json();
        set({ tags: data });
    },

    createMemo: async (data) => {
        const res = await fetch('http://localhost:8004/api/memos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-demo-token': 'demo123',
            },
            body: JSON.stringify(data),
        });
        const memo = await res.json();
        set({ memos: [...get().memos, memo] });
    },

    updateMemo: async (id, data) => {
        const res = await fetch(`http://localhost:8004/api/memos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-demo-token': 'demo123',
            },
            body: JSON.stringify(data),
        });
        const updatedMemo = await res.json();
        set({
            memos: get().memos.map((m) => (m.id === id ? updatedMemo : m)),
        });
    },

    deleteMemo: async (id) => {
        await fetch(`http://localhost:8004/api/memos/${id}`, {
            method: 'DELETE',
            headers: { 'x-demo-token': 'demo123' },
        });
        set({ memos: get().memos.filter((m) => m.id !== id) });
    },

    createTag: async (name) => {
        const res = await fetch('http://localhost:8004/api/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-demo-token': 'demo123',
            },
            body: JSON.stringify({ name }),
        });
        const tag = await res.json();
        set({ tags: [...get().tags, tag] });
    },

    fetchMemo: async (id) => {
        const res = await fetch(`http://localhost:8004/api/memos/${id}`, {
            headers: { 'x-demo-token': 'demo123'},
        });
        return await res.json();
    }
}));