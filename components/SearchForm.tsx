'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useId, type Ref } from 'react'
import { useForm } from 'react-hook-form'
import { type SearchFormValues, searchSchema } from '@/lib/validations'

type SearchFormFieldsProps = {
  autoFocus?: boolean
  compact?: boolean
  inputId?: string
  inputRef?: Ref<HTMLInputElement>
}

function assignInputRef(
  node: HTMLInputElement | null,
  formRef: Ref<HTMLInputElement>,
  inputRef?: Ref<HTMLInputElement>
) {
  if (typeof formRef === 'function') {
    formRef(node)
  } else if (formRef) {
    formRef.current = node
  }

  if (typeof inputRef === 'function') {
    inputRef(node)
  } else if (inputRef) {
    inputRef.current = node
  }
}

function SearchFormFields({ autoFocus, compact, inputId, inputRef }: SearchFormFieldsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const generatedInputId = useId()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { q: searchParams.get('q') ?? '' }
  })
  const qField = register('q')
  const searchInputId = inputId ?? generatedInputId

  useEffect(() => {
    reset({ q: searchParams.get('q') ?? '' })
  }, [searchParams, reset])

  const onSubmit = (data: SearchFormValues) => {
    router.push(`/?q=${encodeURIComponent(data.q)}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2">
      <div className="min-w-0 flex-1">
        <label htmlFor={searchInputId} className="sr-only">
          검색어
        </label>
        <input
          id={searchInputId}
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="게시글 검색..."
          className="focus:border-blurple-500 focus:ring-blurple-500 w-full rounded-lg border border-zinc-600 bg-zinc-800/90 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:outline-none"
          {...qField}
          ref={(node) => assignInputRef(node, qField.ref, inputRef)}
        />
        {errors.q ? (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {errors.q.message}
          </p>
        ) : null}
      </div>
      {!compact && (
        <button type="submit" className="shrink-0 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-600">
          검색
        </button>
      )}
    </form>
  )
}

function SearchFormFallback() {
  return (
    <div className="flex w-full max-w-md gap-2">
      <div className="h-10 flex-1 animate-pulse rounded-lg bg-zinc-800" />
      <div className="h-10 w-16 shrink-0 animate-pulse rounded-lg bg-zinc-700" />
    </div>
  )
}

type SearchFormProps = {
  autoFocus?: boolean
  compact?: boolean
  inputId?: string
  inputRef?: Ref<HTMLInputElement>
}

export function SearchForm({ autoFocus, compact, inputId, inputRef }: SearchFormProps) {
  return (
    <Suspense fallback={<SearchFormFallback />}>
      <SearchFormFields
        autoFocus={autoFocus}
        compact={compact}
        inputId={inputId}
        inputRef={inputRef}
      />
    </Suspense>
  )
}
