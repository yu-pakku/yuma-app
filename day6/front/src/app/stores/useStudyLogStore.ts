import { create } from 'zustand'

type Subject = {
    id: number
    name: string
}

type StudyLog = {
    id: number
    date: string
    minutes: number
    subjects: Subject[]
}

type Summary = {
    totalMinutes: number
    bySubject: Record<string, number>
}

type State = {
    logs: StudyLog[]
    summary: Summary | null
    subjects: Subject[]
    range: 'today' | 'week'

    fetchLogs: () => Promise<void>
    fetchSubjects: () => Promise<void>
    createLog: (data: {
        date: string
        minutes: number
        subject_ids: number[]
    }) => Promise<void>

    setRange: (range: 'today' | 'week') => void
}

export const useStudyLogStore = create<State>((set, get) => ({
    logs: [],
    summary: null,
    subjects: [],
    range: 'today',

    fetchLogs: async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/study-logs?range=${get().range}`
        )
        const data = await res.json()

        set({
            logs: data.logs,
            summary: data.summary,
        })
    },

    setRange: (range) => {
        set({ range })
        get().fetchLogs()
    },

    fetchSubjects: async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/subjects`
        )
        const data = await res.json()
        set({ subjects: data })
    },

    createLog: async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/study-logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        await get().fetchLogs()
    },
}))
