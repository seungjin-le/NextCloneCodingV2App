'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SearchForm } from '@/components/SearchForm'
import { WritePostDialog } from '@/components/WritePostDialog'
import { DiscordButton, IconButton } from '@/components/ui'

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )
}

function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
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
  const searchTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const desktopSearchInputRef = useRef<HTMLInputElement>(null)

  const openSearch = () => {
    if (searchExpanded) return
    setSearchExpanded(true)
    setTimeout(() => {
      const target = window.matchMedia('(min-width: 1024px)').matches
        ? desktopSearchInputRef.current
        : mobileSearchInputRef.current
      target?.focus()
    }, 50)
  }

  const closeSearch = () => {
    setSearchExpanded(false)
    searchTriggerRef.current?.focus()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchExpanded) closeSearch()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchExpanded])

  return (
    <>
      <header className="bg-dark-500 sticky top-0 z-40 w-full border-b border-zinc-700/50">
        {/* 모바일 헤더 (lg 미만) */}
        <div className="flex h-14 items-center justify-between px-4 lg:hidden">
          <div className="flex items-center gap-3">
            <IconButton label="메뉴 열기" onClick={() => onMenuClick?.()}>
              <IconMenu className="size-5" />
            </IconButton>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/guheyo/guheyo-logo.svg" alt="구해요 로고" width={28} height={28} className="size-7 object-cover" priority />
              <span className="text-base font-bold tracking-tight text-zinc-100">구해요</span>
            </Link>
          </div>

          <div className="flex items-center gap-0.5">
            {/* 검색 input: 돋보기 왼쪽에서 펼쳐짐 */}
            <div
              className={[
                'overflow-hidden transition-all duration-200 ease-in-out',
                searchExpanded ? 'w-40 opacity-100' : 'w-0 opacity-0 pointer-events-none',
              ].join(' ')}
            >
              <SearchForm compact inputId="mobile-header-search-q" inputRef={mobileSearchInputRef} />
            </div>

            <IconButton
              ref={searchTriggerRef}
              label={searchExpanded ? '검색 닫기' : '검색 열기'}
              aria-expanded={searchExpanded}
              onClick={searchExpanded ? closeSearch : openSearch}
            >
              {searchExpanded ? <IconClose className="size-5" /> : <IconSearch className="size-5" />}
            </IconButton>

            {!searchExpanded && (
              <>
                <IconButton label="글쓰기" onClick={() => setWriteOpen(true)}>
                  <IconAdd className="size-6" />
                </IconButton>
                <DiscordButton label="로그인" size="sm" className="ml-1 font-bold text-zinc-100" />
              </>
            )}
          </div>
        </div>

        {/* 데스크탑 헤더 (lg 이상) */}
        <div className="hidden h-14 items-center justify-end gap-1.5 px-6 lg:flex">
          {/* 검색 input: 돋보기 왼쪽에서 펼쳐짐 */}
          <div
            className={[
              'overflow-hidden transition-all duration-200 ease-in-out',
              searchExpanded ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none',
            ].join(' ')}
          >
            <SearchForm compact inputId="desktop-header-search-q" inputRef={desktopSearchInputRef} />
          </div>

          <IconButton
            ref={searchTriggerRef}
            label={searchExpanded ? '검색 닫기' : '검색 열기'}
            aria-expanded={searchExpanded}
            onClick={searchExpanded ? closeSearch : openSearch}
          >
            {searchExpanded ? <IconClose className="size-5" /> : <IconSearch className="size-5" />}
          </IconButton>

          <IconButton label="글쓰기" onClick={() => setWriteOpen(true)}>
            <IconAdd className="size-6" />
          </IconButton>
          <DiscordButton label="로그인" className="font-bold text-zinc-100" />
        </div>
      </header>

      <WritePostDialog open={writeOpen} onOpenChange={setWriteOpen} />
    </>
  )
}
