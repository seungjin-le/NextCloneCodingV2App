import { cn } from '@/lib/utils/utils'

type PostStatsProps = {
  className?: string
  layout?: 'column' | 'row'
  likeCount: number
  viewCount: number
}

export function PostStats({
  className,
  layout = 'row',
  likeCount,
  viewCount,
}: PostStatsProps) {
  return (
    <div
      className={cn(
        layout === 'column'
          ? 'flex shrink-0 flex-col items-end justify-between gap-1 text-xs text-zinc-600'
          : 'flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-500',
        className
      )}
    >
      <span>👁 {viewCount}</span>
      <span>♡ {likeCount}</span>
    </div>
  )
}
