'use client'

import { useCallback, useMemo } from 'react'

type TrendDirection = 'up' | 'down' | 'neutral'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  changePercent?: number
  description?: string
  trendData?: number[]
}

function MiniChart({ data, trend }: { data: number[]; trend: TrendDirection }) {
  const strokeColor = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#a1a1aa'

  const normalizedData = useMemo(() => {
    if (data.length === 0) return []
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    return data.map((v) => ((v - min) / range) * 20)
  }, [data])

  const pathD = useMemo(() => {
    if (normalizedData.length === 0) return ''
    const step = 60 / (normalizedData.length - 1)
    return normalizedData.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * step},${24 - y - 2}`).join(' ')
  }, [normalizedData])

  if (data.length === 0) return null

  return (
    <svg className="h-6 w-15" viewBox="0 0 60 24" fill="none">
      <path d={pathD} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function TrendBadge({ percent }: { percent: number }) {
  const isPositive = percent > 0
  const isNeutral = percent === 0

  const bgColor = isNeutral ? 'bg-zinc-100' : isPositive ? 'bg-green-50' : 'bg-red-50'
  const textColor = isNeutral ? 'text-zinc-600' : isPositive ? 'text-green-600' : 'text-red-600'

  const displayText = isNeutral ? '0%' : `${isPositive ? '▲' : '▼'}${Math.abs(percent).toFixed(1)}%`

  return <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>{displayText}</span>
}

export function StatCard({ icon, label, value, changePercent, description, trendData = [] }: StatCardProps) {
  const trend: TrendDirection = useMemo(() => {
    if (changePercent === undefined || changePercent === 0) return 'neutral'
    return changePercent > 0 ? 'up' : 'down'
  }, [changePercent])

  const formattedValue = useMemo(() => {
    if (typeof value === 'number') {
      return value.toLocaleString('ko-KR')
    }
    return value
  }, [value])

  return (
    <div className="flex-row-center-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex-col-start-start gap-2">
        <div className="flex-row-center-start gap-2">
          <span className="text-zinc-500">{icon}</span>
          <span className="text-sm font-medium text-zinc-500">{label}</span>
        </div>
        <div className="flex-row-center-start gap-2">
          <span className="text-2xl font-bold text-zinc-900">{formattedValue}</span>
          {changePercent !== undefined && <TrendBadge percent={changePercent} />}
        </div>
        {description && <span className="text-xs text-zinc-400">{description}</span>}
      </div>
      {trendData.length > 0 && <MiniChart data={trendData} trend={trend} />}
    </div>
  )
}
