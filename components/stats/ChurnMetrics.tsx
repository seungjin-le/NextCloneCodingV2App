'use client'

interface ChurnItem {
  label: string
  value: number
  color: 'green' | 'orange' | 'red'
}

const funnelChurnData: ChurnItem[] = [
  { label: '온보딩 이탈율', value: 17.9, color: 'orange' },
  { label: '업로드 이탈율', value: 13.7, color: 'green' },
  { label: '결과 이탈율', value: 9.9, color: 'green' },
  { label: '로그인 이탈율', value: 14.7, color: 'green' },
  { label: '시뮬 미전환율', value: 63.6, color: 'red' },
]

const contentChurnData: ChurnItem[] = [
  { label: '콘텐츠 미클릭율', value: 42.5, color: 'red' },
  { label: '콘텐츠 이탈율', value: 26.9, color: 'red' },
]

const colorMap = {
  green: '#22c55e',
  orange: '#f97316',
  red: '#ef4444',
}

function ChurnBar({ label, value, color }: ChurnItem) {
  const barColor = colorMap[color]
  const maxWidth = 70

  return (
    <div className="flex-row-center-between gap-4">
      <span className="w-28 shrink-0 text-sm text-zinc-600">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(value / 100) * maxWidth + 30}%`, backgroundColor: barColor }}
        />
      </div>
      <span className="w-14 text-right text-sm font-medium text-zinc-700">{value.toFixed(1)}%</span>
    </div>
  )
}

function ChurnSection({ title, data }: { title: string; data: ChurnItem[] }) {
  return (
    <div className="flex-1">
      <h4 className="mb-4 text-sm font-medium text-zinc-500">{title}</h4>
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <ChurnBar key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}

export function ChurnMetrics() {
  return (
    <div className="flex-row-start gap-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <ChurnSection title="퍼널 이탈" data={funnelChurnData} />
      <ChurnSection title="콘텐츠 이탈" data={contentChurnData} />
    </div>
  )
}
