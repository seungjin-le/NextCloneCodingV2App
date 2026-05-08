'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fieldControlClassName, FormField } from '@/components/forms'
import {
  buildSidebarSections,
  CUSTOM_SIDEBAR_CATEGORIES_CHANGED_EVENT,
  type CustomSidebarCategory,
  registerSidebarCategory,
} from '@/lib/adminCategories'
import { PRIMARY_LABELS, type NavCategory } from '@/lib/nav'
import {
  categoryRegistrationSchema,
  type CategoryRegistrationFormValues,
} from '@/lib/validations'

const SECTION_OPTIONS = [
  { value: 'group', label: PRIMARY_LABELS.group },
  { value: 'market', label: PRIMARY_LABELS.market },
  { value: 'community', label: PRIMARY_LABELS.community },
] satisfies Array<{ value: NavCategory; label: string }>

async function signCategoriesForRoutes(categories: CustomSidebarCategory[]) {
  const response = await fetch('/api/admin/sidebar-categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categories }),
  })

  return response.ok
}

async function persistCategories(categories: CustomSidebarCategory[]) {
  const signed = await signCategoriesForRoutes(categories)
  if (!signed) return false

  window.dispatchEvent(new CustomEvent(CUSTOM_SIDEBAR_CATEGORIES_CHANGED_EVENT, {
    detail: { categories },
  }))

  return true
}

export function AdminCategoryManager({
  initialCategories,
}: {
  initialCategories: CustomSidebarCategory[]
}) {
  const [status, setStatus] = useState('')
  const [categories, setCategories] = useState<CustomSidebarCategory[]>(initialCategories)

  const sidebarSections = useMemo(() => buildSidebarSections(categories), [categories])
  const customCount = categories.length

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CategoryRegistrationFormValues>({
    resolver: zodResolver(categoryRegistrationSchema),
    defaultValues: {
      section: 'group',
      label: '',
      slug: '',
    },
  })

  const onSubmit = async (values: CategoryRegistrationFormValues) => {
    setStatus('')
    const result = registerSidebarCategory(categories, values)

    if (!result.ok) {
      for (const [field, messages] of Object.entries(result.errors)) {
        if (messages?.[0]) {
          setError(field as keyof CategoryRegistrationFormValues, { message: messages[0] })
        }
      }
      return
    }

    const persisted = await persistCategories(result.categories)
    if (!persisted) {
      setStatus('카테고리 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.')
      return
    }

    setCategories(result.categories)
    reset({ section: result.category.section, label: '', slug: '' })
    setStatus(`${result.category.label} 카테고리를 등록했습니다.`)
  }

  const removeCategory = async (category: CustomSidebarCategory) => {
    const nextCategories = categories.filter(
      (item) => !(item.section === category.section && item.slug === category.slug)
    )
    const persisted = await persistCategories(nextCategories)
    if (!persisted) {
      setStatus('카테고리 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.')
      return
    }

    setCategories(nextCategories)
    setStatus(`${category.label} 카테고리를 삭제했습니다.`)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,440px)_1fr]">
      <section className="rounded-lg border border-zinc-700/70 bg-zinc-900/45 p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-zinc-100">카테고리 등록</h2>
          <p className="mt-1 text-sm text-zinc-500">등록한 항목은 이 브라우저의 사이드바에 바로 반영됩니다.</p>
        </div>

        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormField id="category-section" label="상위 메뉴" error={errors.section?.message}>
            <select
              id="category-section"
              className={fieldControlClassName}
              {...register('section')}
            >
              {SECTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="category-label" label="카테고리명" error={errors.label?.message}>
            <input
              id="category-label"
              type="text"
              placeholder="예: 키캡"
              className={`${fieldControlClassName} placeholder:text-zinc-500`}
              {...register('label')}
            />
          </FormField>

          <FormField
            id="category-slug"
            label="URL 슬러그"
            error={errors.slug?.message}
            helperText="영문, 숫자, 하이픈만 사용합니다."
          >
            <input
              id="category-slug"
              type="text"
              placeholder="예: keycaps"
              className={`${fieldControlClassName} placeholder:text-zinc-500`}
              {...register('slug')}
            />
          </FormField>

          {status ? (
            <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300" role="status">
              {status}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blurple-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blurple-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            등록
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-zinc-700/70 bg-zinc-900/45 p-5">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">사이드바 미리보기</h2>
            <p className="mt-1 text-sm text-zinc-500">기본 카테고리 뒤에 사용자 등록 항목이 표시됩니다.</p>
          </div>
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-400">
            사용자 등록 {customCount}개
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sidebarSections.map((section) => (
            <div key={section.category} className="rounded-lg border border-zinc-700/60 bg-zinc-950/30 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-300">{section.label}</h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => {
                  const customCategory = categories.find(
                    (category) => category.section === section.category && category.slug === item.slug
                  )

                  return (
                    <li key={`${section.category}-${item.slug}`} className="flex min-h-9 items-center justify-between gap-2 rounded-lg bg-zinc-800/70 px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-100">{item.label}</p>
                        <p className="truncate text-xs text-zinc-500">{item.href}</p>
                      </div>
                      {customCategory ? (
                        <button
                          type="button"
                          onClick={() => removeCategory(customCategory)}
                          className="shrink-0 rounded-md border border-zinc-600 px-2 py-1 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-zinc-100"
                        >
                          삭제
                        </button>
                      ) : (
                        <span className="shrink-0 text-xs text-zinc-600">기본</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
