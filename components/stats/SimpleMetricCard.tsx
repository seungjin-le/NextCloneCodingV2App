interface SimpleMetricCardProps {
  icon: React.ReactNode
  value: string
  label: string
  valueColor?: string
}

export function SimpleMetricCard({ icon, value, label, valueColor = '#18181b' }: SimpleMetricCardProps) {
  return (
    <div className="flex-col-center gap-1 rounded-xl border border-zinc-200 bg-white px-8 py-5 shadow-sm">
      <span className="mb-1 text-zinc-400">{icon}</span>
      <span className="text-2xl font-bold" style={{ color: valueColor }}>
        {value}
      </span>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  )
}

const CursorIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
  </svg>
)

export function EngagementMetrics() {
  return (
    <div className="flex gap-4">
      <SimpleMetricCard icon={<CursorIcon />} value="8.1%" label="오픈율 (CTR)" />
      <SimpleMetricCard icon={<ArrowRightIcon />} value="66.1%" label="앱 진입율" valueColor="#10b981" />
    </div>
  )
}
