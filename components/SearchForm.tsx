'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { type SearchFormValues, searchSchema } from '@/lib/validations'

function SearchFormFields() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { q: searchParams.get('q') ?? '' }
  })

  useEffect(() => {
    reset({ q: searchParams.get('q') ?? '' })
  }, [searchParams, reset])

  const onSubmit = (data: SearchFormValues) => {
    router.push(`/?q=${encodeURIComponent(data.q)}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-1 sm:flex-row sm:items-start sm:gap-2">
      <div className="min-w-0 flex-1">
        <label htmlFor="header-search-q" className="sr-only">
          검색어
        </label>
        <input
          id="header-search-q"
          type="search"
          autoComplete="off"
          placeholder="게시글 검색"
          className="focus:border-blurple-500 focus:ring-blurple-500 w-full rounded-lg border border-zinc-600 bg-zinc-800/90 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:outline-none"
          {...register('q')}
        />
        {errors.q ? (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {errors.q.message}
          </p>
        ) : null}
      </div>
      <button type="submit" className="shrink-0 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-600">
        검색
      </button>
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

export function SearchForm() {
  return (
    <Suspense fallback={<SearchFormFallback />}>
      <SearchFormFields />
    </Suspense>
  )
}
