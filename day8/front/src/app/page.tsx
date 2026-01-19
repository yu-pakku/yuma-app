'use client'

import { useEffect } from "react"
import { useItemStore } from "./stores/useItemStore"

export default function Page() {
  const { items, fetchItems, filters, setFilter, updateStatus } = useItemStore()

  useEffect(() => { fetchItems() }, [])

  const filteredItems = items.filter(item => {
    const { status, category, priority } = filters
    return (status === 'all' || item.status === status)
      && (category === 'all' || item.category === category)
      && (priority === 'all' || item.priority === priority)
  })

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">タスク管理</h1>

      {/* フィルタ */}
      <div className="flex gap-2">
        <select
          value={filters.status}
          onChange={e => setFilter('status', e.target.value)}
          className="border p-1 rounded"
        >
          <option value="all">すべての状態</option>
          <option value="pending">未着手</option>
          <option value="doing">進行中</option>
          <option value="done">完了</option>
        </select>

        <select
          value={filters.category}
          onChange={e => setFilter('category', e.target.value)}
          className="border p-1 rounded"
        >
          <option value="all">すべてのカテゴリ</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="personal">Personal</option>
        </select>

        <select
          value={filters.priority}
          onChange={e => setFilter('priority', e.target.value)}
          className="border p-1 rounded"
        >
          <option value="all">すべての優先度</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>

      {/* 一覧 */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">
                状態: {item.status} / 優先度: {item.priority} / カテゴリ: {item.category}
              </div>
            </div>
            <button
              onClick={() => updateStatus(item.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              次の状態へ
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}