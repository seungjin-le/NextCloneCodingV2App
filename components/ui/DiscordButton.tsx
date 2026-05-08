import Image from 'next/image'
import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/utils'

const SIZE_CLASS = {
  sm: {
    button: 'gap-1.5 px-2.5 py-1.5 text-xs',
    icon: 'size-4',
    iconSize: 16,
  },
  md: {
    button: 'gap-2 px-3 py-2 text-sm',
    icon: 'size-[18px]',
    iconSize: 18,
  },
} as const

type DiscordButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  label: string
  size?: keyof typeof SIZE_CLASS
  type?: 'button' | 'submit' | 'reset'
}

export function DiscordButton({
  className,
  label,
  size = 'md',
  type = 'button',
  ...props
}: DiscordButtonProps) {
  const styles = SIZE_CLASS[size]

  return (
    <button
      type={type}
      className={cn(
        'bg-blurple-500 hover:bg-blurple-600 inline-flex items-center rounded-lg font-semibold text-white transition',
        styles.button,
        className
      )}
      {...props}
    >
      <Image
        src="/socials/discord/discord-mark-white.svg"
        alt=""
        width={styles.iconSize}
        height={styles.iconSize}
        className={styles.icon}
      />
      {label}
    </button>
  )
}
