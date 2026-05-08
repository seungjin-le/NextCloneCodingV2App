import { type BusinessFunction } from '@/lib/data'

const BADGE_META: Record<BusinessFunction, { className: string; text: string }> = {
  sell: { text: '판매', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  buy: { text: '구매', className: 'bg-sky-500/20 text-sky-400 border-sky-500/40' },
  swap: { text: '교환', className: 'bg-violet-500/20 text-violet-400 border-violet-500/40' },
}

export function BusinessFunctionBadge({ value }: { value: BusinessFunction }) {
  const badge = BADGE_META[value]

  return (
    <span className={`rounded border px-2 py-0.5 text-xs font-semibold ${badge.className}`}>
      {badge.text}
    </span>
  )
}
