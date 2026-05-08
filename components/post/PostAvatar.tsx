import { cn } from '@/lib/utils/utils'

const SIZE_CLASS = {
  sm: 'size-7 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-sm',
} as const

const SHAPE_CLASS = {
  circle: 'rounded-full',
  square: 'rounded-md',
} as const

type PostAvatarProps = {
  author: string
  className?: string
  colorClassName: string
  shape?: keyof typeof SHAPE_CLASS
  size?: keyof typeof SIZE_CLASS
}

export function PostAvatar({
  author,
  className,
  colorClassName,
  shape = 'circle',
  size = 'md',
}: PostAvatarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center font-bold text-zinc-300',
        SIZE_CLASS[size],
        SHAPE_CLASS[shape],
        colorClassName,
        className
      )}
    >
      {author.slice(0, 2).toUpperCase()}
    </div>
  )
}
