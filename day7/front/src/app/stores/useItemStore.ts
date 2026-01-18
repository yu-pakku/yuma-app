import { create } from 'zustand'

type Item = {
    id: number
    title: string
    status: 'pending' | 'doing' | 'done'
}

type State = {
    items: Item[]
    fetchItems: () => Promise<void>
    updateStatus: (id: number, status: Item['status']) => Promise<void>
}

export const useItemStore = create<State>((set, get) => ({
    items: [],

    fetchItems: async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/items`
        )
        const data = await res.json()
        set({ items: data })
    },

    updateStatus: async (id, status) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            }
        )

        await get().fetchItems()
    },
}))