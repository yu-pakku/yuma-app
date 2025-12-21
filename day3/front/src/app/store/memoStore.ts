import { create } from "zustand";

export type Memo = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type MemoState = {
  memos: Memo[];
  loading: boolean;
  fetchMemos: () => Promise<void>;
  addMemo: (title: string, content: string) => Promise<void>;
  updateMemo: (id: number, title: string, content: string) => Promise<void>;
  deleteMemo: (id: number) => Promise<void>;
};

export const useMemoStore = create<MemoState>((set) => ({
  memos: [],
  loading: true,

  fetchMemos: async () => {
    const res = await fetch("/api/memos", {
      headers: { "x-demo-token": "demo" },
    });
    const data = await res.json();

    set({
      memos: Array.isArray(data) ? data : [],
      loading: false,
    });
  },

  addMemo: async (title, content) => {
    await fetch("/api/memos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-token": "demo",
      },
      body: JSON.stringify({ title, content }),
    });

    const res = await fetch("/api/memos", {
      headers: { "x-demo-token": "demo" },
    });
    const data = await res.json();
    if (Array.isArray(data)) set({ memos: data });
  },

  updateMemo: async (id, title, content) => {
    await fetch(`/api/memos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-demo-token": "demo",
      },
      body: JSON.stringify({ title, content }),
    });

    set((state) => ({
      memos: state.memos.map((m) =>
        m.id === id ? { ...m, title, content } : m
      ),
    }));
  },

  deleteMemo: async (id) => {
    await fetch(`/api/memos/${id}`, {
      method: "DELETE",
      headers: {
        "x-demo-token": "demo",
      },
    });

    set((state) => ({
      memos: state.memos.filter((m) => m.id !== id),
    }));
  },
}));
