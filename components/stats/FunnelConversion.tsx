interface FunnelStep {
  label: string
  value: number
  color: string
}

const funnelSteps: FunnelStep[] = [
  { label: '분석 시작률', value: 57.1, color: '#f472b6' },
  { label: '업로드 완료율', value: 85.0, color: '#f472b6' },
  { label: '결과 도달률', value: 59.6, color: '#f472b6' },
  { label: '시뮬레이터 전환율', value: 17.3, color: '#8b5cf6' },
]

function FunnelStep({ label, value, color }: FunnelStep) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <div className="flex-row-center-between">
        <span className="text-sm text-zinc-600">{label}</span>
        <span className="text-sm font-semibold text-zinc-700">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export function FunnelConversion() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-zinc-500">3.2 퍼널 전환</h3>
      <div className="flex gap-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {funnelSteps.map((step) => (
          <FunnelStep key={step.label} {...step} />
        ))}
      </div>
    </div>
  )
}
