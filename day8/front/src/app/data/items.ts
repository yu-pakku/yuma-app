export type Status = 'pending' | 'doing' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export type Item = {
    id: number
    name: string
    status: Status
    priority: Priority
    category: string
}

export const items: Item[] = [
    { id: 1, name: 'Task A', status: 'pending', priority: 'high', category: 'work' },
    { id: 2, name: 'Task B', status: 'doing', priority: 'medium', category: 'study' },
    { id: 3, name: 'Task C', status: 'done', priority: 'low', category: 'work' },
    { id: 4, name: 'Task D', status: 'pending', priority: 'medium', category: 'personal' },
    { id: 5, name: 'Task E', status: 'doing', priority: 'high', category: 'study' },
    { id: 6, name: 'Task F', status: 'done', priority: 'medium', category: 'personal' },
]