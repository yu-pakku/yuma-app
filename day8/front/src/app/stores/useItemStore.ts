import { create } from 'zustand'
import { Item, items as initialItems, Status } from '../data/items'

type State = {
    items: Item[]
    filters: {
        status: Status | 'all'
        category: string | 'all'
        priority: 'low' | 'medium' | 'high' | 'all'
    }
    fetchItems: () => void
    setFilter: (key: keyof State['filters'], value: any) => void
    updateStatus: (id: number) => void
}

export const useItemStore = create<State>((set, get) => ({
    items: [],
    filters: {
        status: 'all',
        category: 'all',
        priority: 'all',
    },

    fetchItems: () => {
        set({ items: initialItems })
    },

    setFilter: (key, value) => {
        set(state => ({
            filters: { ...state.filters, [key]: value}
        }))
    },

    updateStatus: (id) => {
        set(state => ({
            items: state.items.map(item => {
                if (item.id !== id) return item
                let next: Status
                if (item.status === 'pending') next = 'doing'
                else if (item.status === 'doing') next = 'done'
                else next = 'pending'
                return { ...item, status: next }
            })
        }))
    }
}))