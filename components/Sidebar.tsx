'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  buildSidebarSections,
  CUSTOM_SIDEBAR_CATEGORIES_CHANGED_EVENT,
  type CustomSidebarCategory,
  parseCustomSidebarCategories,
} from '@/lib/adminCategories'

function homeLinkClass(active: boolean) {
  return [
    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition',
    active ? 'bg-white/10 text-zinc-100' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
  ].join(' ')
}

function subLinkClass(active: boolean) {
  return [
    'flex items-center rounded-lg py-1.5 pl-4 pr-3 text-sm font-medium transition',
    active ? 'bg-white/10 text-zinc-100' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
  ].join(' ')
}

type SidebarProps = {
  initialCustomCategories: CustomSidebarCategory[]
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ initialCustomCategories, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const [eventCategories, setEventCategories] = useState<CustomSidebarCategory[] | null>(null)
  const customCategories = eventCategories ?? initialCustomCategories
  const sidebarSections = useMemo(() => buildSidebarSections(customCategories), [customCategories])

  useEffect(() => {
    const syncCategories = (event: Event) => {
      const customEvent = event as CustomEvent<{ categories?: CustomSidebarCategory[] }>
      if (!customEvent.detail?.categories) return

      setEventCategories(parseCustomSidebarCategories(JSON.stringify(customEvent.detail.categories)))
    }

    window.addEventListener(CUSTOM_SIDEBAR_CATEGORIES_CHANGED_EVENT, syncCategories)

    return () => {
      window.removeEventListener(CUSTOM_SIDEBAR_CATEGORIES_CHANGED_EVENT, syncCategories)
    }
  }, [])

  return (
    <>
      {mobileOpen ? <button type="button" aria-label="메뉴 닫기" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onMobileClose} /> : null}

      <aside
        className={[
          'bg-dark-600 fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-700/50 transition-transform duration-200 ease-out',
          'lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:shrink-0 lg:translate-x-0 lg:self-start lg:overflow-y-auto',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ].join(' ')}
        aria-label="사이드 메뉴"
      >
        <div className="flex items-center gap-3 border-b border-zinc-700/50 px-4 py-4">
          <Link href="/" className="ring-blurple-500 flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2" onClick={() => onMobileClose()}>
            <Image src="/guheyo/guheyo-logo.svg" alt="" width={36} height={36} className="size-9 object-cover" />
            <span className="text-lg font-bold tracking-tight text-zinc-100">구해요</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-4 p-3">
          <Link href="/" className={homeLinkClass(pathname === '/')} onClick={() => onMobileClose()}>
            홈
          </Link>

          {sidebarSections.map((section) => (
            <div key={section.category}>
              <div className="mb-1.5 px-3 text-xs font-semibold tracking-wide text-zinc-500" aria-hidden>
                {section.label}
              </div>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href

                  return (
                    <li key={item.href}>
                      <Link href={item.href} className={subLinkClass(active)} onClick={() => onMobileClose()}>
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
