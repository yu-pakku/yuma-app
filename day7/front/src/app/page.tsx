'use client'

import { useEffect } from 'react'
import { useItemStore } from './stores/useItemStore'

export default function Page() {
  const { items, fetchItems, updateStatus } = useItemStore()

  useEffect(() => {
    fetchItems()
  }, [])

  const nextStatus = (status: string) => {
    if (status === 'pending') return 'doing'
    if (status === 'doing') return 'done'
    return 'pending'
  }

  return (
    <div className='max-w-xl mx-auto p-6 space-y-4'>
      <h1 className='text-xl font-bold'>
        ステータス管理
      </h1>

      {items.map(item => (
        <div
          key={item.id}
          className='flex items-center justify-between border rounded p-3'
        >
          <div>
            <div className='font-medium'>{item.title}</div>
            <div className='text-sm text-gray-500'>
              {item.status}
            </div>
          </div>

          <button
            onClick={() =>
              updateStatus(item.id, nextStatus(item.status))
            }
            className='px-3 py-1 text-sm rounded bg-blue-500 text-white'
          >
            次へ
          </button>
        </div>
      ))}
    </div>
  )
}