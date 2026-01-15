'use client'

import { useEffect } from 'react'
import { useStudyLogStore } from '@/app/stores/useStudyLogStore'
import StudyLogForm from './components/StudyLogForm'
import SubjectBarChart from './components/SubjectBarChart'

export default function StudyLogPage() {
    const { logs, summary, fetchLogs, setRange, range } = useStudyLogStore()

    useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                {/* Header */}
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        📘 Study Logs
                    </h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setRange('today')}
                            className={`px-3 py-1 rounded text-sm ${
                                range === 'today'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border'
                            }`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setRange('week')}
                            className={`px-3 py-1 rounded text-sm ${
                                range === 'week'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border'
                            }`}
                        >
                            This Week
                        </button>
                    </div>
                </header>

                <StudyLogForm />

                {/* Summary */}
                {summary && (
                    <section className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-500 text-sm">Total Study Time</p>
                        <p className="text-3xl font-bold text-blue-600">
                            {summary.totalMinutes} min
                        </p>

                        <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-600 mb-2">
                                By Subject
                            </p>
                            <ul className="space-y-1">
                                {Object.entries(summary.bySubject).map(([name, min]) => (
                                    <li
                                        key={name}
                                        className="flex justify-between text-sm text-gray-700"
                                    >
                                        <span>{name}</span>
                                        <span>{min} min</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* Logs */}
                <section className="space-y-3">
                    {logs.map(log => (
                        <div
                            key={log.id}
                            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm text-gray-500">{log.date}</p>
                                <p className="font-medium text-gray-800">
                                    {log.subjects.map(s => s.name).join(', ')}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-700">
                                    {log.minutes} min
                                </p>
                            </div>
                        </div>
                    ))}

                    {logs.length === 0 && (
                        <p className="text-center text-gray-400 text-sm">
                            No study logs yet
                        </p>
                    )}

                    {summary && (
                        <div className='mt-8 rounded-lg border p-4'>
                            <h2 className='text-lg font-semibold mb-4'>
                                科目別 学習時間
                            </h2>

                            <SubjectBarChart bySubject={summary.bySubject} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
