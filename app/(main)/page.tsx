import Link from 'next/link'
import { FeedSection } from '@/components/FeedSection'

const QUICK_LINKS = [
  { href: '/group/keyboard', label: '⌨️ 키보드' },
  { href: '/group/mouse', label: '🖱️ 마우스' },
  { href: '/group/audio', label: '🎧 음향기기' },
  { href: '/market/trade', label: '🏪 거래' },
  { href: '/market/auction', label: '🔨 경매' },
  { href: '/market/group-buy', label: '🛒 공동구매' },
]

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q?.trim() ?? ''

  return (
    <div className="w-full max-w-3xl px-4 py-6 lg:px-8">
      {/* 카테고리 빠른 링크 */}
      {!q && (
        <div className="mb-8">
          <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500">카테고리</h2>
          <div className="flex flex-wrap gap-2">
            {QUICK_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-700/60"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 피드 섹션 */}
      <div className="flex flex-col gap-8">
        <FeedSection businessFunction="sell" filterQuery={q} />
        <FeedSection businessFunction="buy" filterQuery={q} />
        <FeedSection businessFunction="swap" filterQuery={q} />
      </div>

      <footer className="mt-12 pb-8 text-center text-xs text-zinc-700">
        데모 UI · 실제 거래·로그인은 원본 서비스와 연결되지 않습니다.
      </footer>
    </div>
  )
}
