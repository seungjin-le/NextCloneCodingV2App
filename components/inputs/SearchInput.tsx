import { cn } from '@/lib/utils/utils'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(({ label, error, helperText, leftIcon, rightIcon, className, disabled, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-body-sm text-neutral-70 font-medium">{label}</label>}
      <div className="relative">
        {leftIcon && <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-50">{leftIcon}</div>}
        <input
          ref={ref}
          className={cn(
            'text-body-md text-neutral-90 w-full rounded-md border px-3 py-2 outline-0',
            'transition-all focus:ring-2 focus:outline-none',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error ? 'focus:border-red-60 focus:ring-red-20 border-red-50' : 'border-neutral-30 focus:border-primary-80 focus:ring-primary-20',
            disabled ? 'bg-neutral-10 cursor-not-allowed' : 'bg-white',
            className
          )}
          disabled={disabled}
          {...props}
        />
        {rightIcon && <div className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-50">{rightIcon}</div>}
      </div>
      {error && <span className="text-caption-s text-red-60">{error}</span>}
      {helperText && !error && <span className="text-caption-s text-neutral-60">{helperText}</span>}
    </div>
  )
})
