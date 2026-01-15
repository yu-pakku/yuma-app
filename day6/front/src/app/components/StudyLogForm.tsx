'use client'

import { useEffect, useState } from 'react'
import { useStudyLogStore } from '../stores/useStudyLogStore'

export default function StudyLogForm() {
  const {
    subjects,
    fetchSubjects,
    createLog,
  } = useStudyLogStore()

  const [date, setDate] = useState('')
  const [minutes, setMinutes] = useState('')
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    fetchSubjects()
  }, [])

  const toggleSubject = (id: number) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const submit = async () => {
    if (!date || !minutes || selected.length === 0) return

    await createLog({
      date,
      minutes: Number(minutes),
      subject_ids: selected,
    })

    setDate('')
    setMinutes('')
    setSelected([])
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h2 className="font-semibold text-gray-700">
        Add Study Log
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />

        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={e => setMinutes(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-2">
        {subjects.map(subject => (
          <button
            key={subject.id}
            type="button"
            onClick={() => toggleSubject(subject.id)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selected.includes(subject.id)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700'
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  )
}
