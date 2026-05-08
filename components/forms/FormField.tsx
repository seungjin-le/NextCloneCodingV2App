import { type ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

export const fieldControlClassName =
  'w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-blurple-500 focus:outline-none focus:ring-1 focus:ring-blurple-500'

type FormFieldProps = {
  children: ReactNode
  error?: string
  helperText?: string
  id: string
  label: string
  labelClassName?: string
}

export function FormField({
  children,
  error,
  helperText,
  id,
  label,
  labelClassName,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn('mb-1.5 block text-sm font-medium text-zinc-300', labelClassName)}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  )
}
