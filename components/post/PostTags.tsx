import { cn } from '@/lib/utils/utils'

const TAG_CLASS = {
  compact: 'rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400',
  pill: 'rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400',
} as const

type PostTagsProps = {
  className?: string
  limit?: number
  tags: string[]
  variant?: keyof typeof TAG_CLASS
}

export function PostTags({
  className,
  limit,
  tags,
  variant = 'compact',
}: PostTagsProps) {
  const visibleTags = typeof limit === 'number' ? tags.slice(0, limit) : tags
  if (visibleTags.length === 0) return null

  return (
    <div className={cn(variant === 'pill' ? 'flex flex-wrap gap-1.5' : 'flex flex-wrap gap-1', className)}>
      {visibleTags.map((tag) => (
        <span key={tag} className={TAG_CLASS[variant]}>
          #{tag}
        </span>
      ))}
    </div>
  )
}
