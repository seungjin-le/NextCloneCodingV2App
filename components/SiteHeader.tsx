'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SearchForm } from '@/components/SearchForm'
import { WritePostDialog } from '@/components/WritePostDialog'

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )
}

function IconAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  )
}

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  )
}

type SiteHeaderProps = {
  onMenuClick?: () => void
}

export function SiteHeader({ onMenuClick }: SiteHeaderProps) {
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [writeOpen, setWriteOpen] = useState(false)

  return (
    <>
      <header className="bg-dark-500 sticky top-0 z-40 w-full border-b border-zinc-700/50">
        {/* 모바일 헤더 (lg 미만) */}
        <div className="flex h-14 items-center justify-between px-4 lg:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="inline-flex size-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
              onClick={() => onMenuClick?.()}
            >
              <IconMenu className="size-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/guheyo/guheyo-logo.svg" alt="구해요 로고" width={28} height={28} className="size-7 object-cover" priority />
              <span className="text-base font-bold tracking-tight text-zinc-100">구해요</span>
            </Link>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label="검색 열기"
              aria-expanded={searchExpanded}
              onClick={() => setSearchExpanded((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
            >
              <IconSearch className="size-5" />
            </button>
            <button
              type="button"
              aria-label="글쓰기"
              onClick={() => setWriteOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
            >
              <IconAdd className="size-6" />
            </button>
            <button
              type="button"
              className="bg-blurple-500 hover:bg-blurple-600 ml-1 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-zinc-100 transition"
            >
              <Image src="/socials/discord/discord-mark-white.svg" alt="" width={16} height={16} className="size-4" />
              로그인
            </button>
          </div>
        </div>

        {/* 데스크탑 헤더 (lg 이상) */}
        <div className="hidden h-14 items-center justify-end gap-1.5 px-6 lg:flex">
          <button
            type="button"
            aria-label="검색 열기"
            aria-expanded={searchExpanded}
            onClick={() => setSearchExpanded((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
          >
            <IconSearch className="size-5" />
          </button>
          <button
            type="button"
            aria-label="글쓰기"
            onClick={() => setWriteOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
          >
            <IconAdd className="size-6" />
          </button>
          <button
            type="button"
            className="bg-blurple-500 hover:bg-blurple-600 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-zinc-100 transition"
          >
            <Image src="/socials/discord/discord-mark-white.svg" alt="" width={18} height={18} className="size-[18px]" />
            로그인
          </button>
        </div>

        {/* 검색 확장 영역 */}
        {searchExpanded && (
          <div className="border-t border-zinc-700/80 bg-dark-600 px-4 py-3">
            <div className="mx-auto max-w-xl">
              <SearchForm />
            </div>
          </div>
        )}
      </header>

      <WritePostDialog open={writeOpen} onOpenChange={setWriteOpen} />
    </>
  )
}
