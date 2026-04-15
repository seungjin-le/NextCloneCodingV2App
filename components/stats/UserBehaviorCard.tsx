'use client'

interface FeatureUsage {
  label: string
  value: number
  color: string
}

const featureUsageData: FeatureUsage[] = [
  { label: '분석', value: 51.6, color: '#3b82f6' },
  { label: '시뮬레이터', value: 29.8, color: '#14b8a6' },
  { label: '공유', value: 22.7, color: '#f97316' },
  { label: '콘텐츠', value: 30.0, color: '#60a5fa' },
]

function MetricBox({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex-col-center flex-1 gap-1 rounded-xl border border-zinc-100 bg-zinc-50 py-4">
      <span className="text-2xl font-bold" style={{ color }}>
        {value}
      </span>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  )
}

function FeatureBar({ label, value, color }: FeatureUsage) {
  return (
    <div className="flex-row-center-between gap-3">
      <span className="w-16 shrink-0 text-sm text-zinc-600">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="w-12 text-right text-sm font-medium text-zinc-700">{value.toFixed(1)}%</span>
    </div>
  )
}

export function UserBehaviorCard() {
  return (
    <div className="flex-col-start-start rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-zinc-900">유저 행동 지표</h3>

      <div className="mb-6 flex w-full gap-4">
        <MetricBox value="4.0" label="평균 세션 수 (일)" color="#14b8a6" />
        <MetricBox value="8분 9초" label="평균 체류 시간" color="#0891b2" />
      </div>

      <div className="w-full">
        <h4 className="mb-3 text-sm font-medium text-zinc-700">기능 사용률</h4>
        <div className="flex flex-col gap-3">
          {featureUsageData.map((item) => (
            <FeatureBar key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
