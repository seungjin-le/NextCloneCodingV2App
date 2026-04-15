const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
)

const EyeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

interface AcquisitionCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  changePercent?: number
  description: string
}

function AcquisitionCard({ icon, label, value, changePercent, description }: AcquisitionCardProps) {
  const formattedValue = typeof value === 'number' ? value.toLocaleString('ko-KR') : value

  return (
    <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex-row-center-start mb-2 gap-2">
        <span className="text-zinc-400">{icon}</span>
        <span className="text-sm text-zinc-500">{label}</span>
      </div>
      <div className="flex-row-center-start gap-2">
        <span className="text-2xl font-bold text-zinc-900">{formattedValue}</span>
        {changePercent !== undefined && (
          <span className="rounded bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600">▲{changePercent}%</span>
        )}
      </div>
      <span className="text-xs text-zinc-400">{description}</span>
    </div>
  )
}

export function AcquisitionMetrics() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-zinc-500">3.1 유입 & 획득</h3>
      <div className="flex gap-4">
        <AcquisitionCard icon={<DownloadIcon />} label="설치 수" value={1444} changePercent={8.2} description="앱 설치" />
        <AcquisitionCard icon={<EyeIcon />} label="방문자 수" value={14650} changePercent={12.3} description="랜딩 페이지" />
        <AcquisitionCard icon={<CheckCircleIcon />} label="가입 전환율" value="22.2%" description="방문 → 가입" />
      </div>
    </div>
  )
}
