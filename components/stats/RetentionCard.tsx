'use client'

import { useMemo } from 'react'

interface RetentionData {
  label: string
  value: number
}

const retentionData: RetentionData[] = [
  { label: 'D1 Retention', value: 48.2 },
  { label: 'D3 Retention', value: 27.0 },
  { label: 'D7 Retention', value: 29.0 },
  { label: 'D30 Retention', value: 10.5 },
]

const barColors = ['#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1']

function HorizontalBar({ label, value, maxValue, color }: { label: string; value: number; maxValue: number; color: string }) {
  const width = (value / maxValue) * 100

  return (
    <div className="flex-row-center-between gap-4">
      <span className="w-24 shrink-0 text-sm text-zinc-600">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full transition-all" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
      <span className="w-12 text-right text-sm font-medium text-zinc-700">{value.toFixed(1)}%</span>
    </div>
  )
}

function VerticalBarChart({ data }: { data: RetentionData[] }) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex-row-center-end mt-6 gap-6">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100
        const shortLabel = item.label.replace(' Retention', '')

        return (
          <div key={item.label} className="flex-col-center gap-2">
            <span className="text-xs font-medium text-zinc-600">{item.value.toFixed(1)}%</span>
            <div className="flex h-24 w-10 items-end">
              <div className="w-full rounded-t-md transition-all" style={{ height: `${height}%`, backgroundColor: barColors[index] }} />
            </div>
            <span className="text-xs text-zinc-500">{shortLabel}</span>
          </div>
        )
      })}
    </div>
  )
}

export function RetentionCard() {
  const maxValue = useMemo(() => Math.max(...retentionData.map((d) => d.value)), [])

  return (
    <div className="flex-col-start-start rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-zinc-900">리텐션 커브</h3>
      <div className="flex w-full flex-col gap-3">
        {retentionData.map((item, index) => (
          <HorizontalBar key={item.label} label={item.label} value={item.value} maxValue={maxValue} color={barColors[index]} />
        ))}
      </div>
      <VerticalBarChart data={retentionData} />
    </div>
  )
}
