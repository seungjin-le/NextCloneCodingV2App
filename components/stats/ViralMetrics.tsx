const ShareIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
    />
  </svg>
)

export function ViralMetrics() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-zinc-500">3.3 바이럴 & 확산</h3>
      <div className="flex-row-center-start w-fit gap-4 rounded-xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
        <span className="text-zinc-400">
          <ShareIcon />
        </span>
        <div className="flex-col-start-start">
          <span className="text-xs text-zinc-500">공유율</span>
          <span className="text-2xl font-bold text-zinc-900">14.5%</span>
          <span className="text-xs text-zinc-400">공유 클릭 / 결과 노출</span>
        </div>
      </div>
    </div>
  )
}
