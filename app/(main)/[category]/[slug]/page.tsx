import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FeedSection } from '@/components/FeedSection'
import { type BusinessFunction } from '@/lib/data'
import { getNavPageLabel, isValidNavPath } from '@/lib/nav'

type Params = { category: string; slug: string }
type SearchParams = { type?: string; q?: string }

const TABS = [
  { value: 'sell', label: '판매', accent: 'border-emerald-500 text-emerald-400' },
  { value: 'buy', label: '구매', accent: 'border-sky-500 text-sky-400' },
  { value: 'swap', label: '교환', accent: 'border-violet-500 text-violet-400' },
] as const

function isBusinessFunction(v: string | undefined): v is BusinessFunction {
  return v === 'sell' || v === 'buy' || v === 'swap'
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const { category, slug } = await params
  const { type, q = '' } = await searchParams

  const labels = getNavPageLabel(category, slug)
  if (!labels) notFound()
  const activeTab: BusinessFunction = isBusinessFunction(type) ? type : 'sell'

  return (
    <div className="w-full max-w-3xl px-4 py-6 lg:px-8">
      {/* 브레드크럼 */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="transition hover:text-zinc-300">
          홈
        </Link>
        <span>/</span>
        <span>{labels.primary}</span>
        <span>/</span>
        <span className="text-zinc-300">{labels.secondary}</span>
      </nav>

      {/* 페이지 타이틀 */}
      <h1 className="mb-1 text-2xl font-bold text-zinc-100">{labels.secondary}</h1>
      <p className="mb-6 text-sm text-zinc-500">
        {labels.primary} &gt; {labels.secondary} 카테고리의 거래 게시글입니다.
      </p>

      {/* 탭 네비게이션 */}
      <div className="mb-6 flex gap-0 border-b border-zinc-700/60">
        {TABS.map(({ value, label, accent }) => {
          const isActive = activeTab === value
          return (
            <Link
              key={value}
              href={`/${category}/${slug}?type=${value}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? `${accent} border-current`
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* 피드 */}
      <FeedSection
        businessFunction={activeTab}
        filterQuery={q}
        categoryFilter={{ category, slug }}
        limit={20}
      />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params
  const labels = getNavPageLabel(category, slug)
  if (!labels) return {}
  return {
    title: `${labels.secondary} | 구해요`,
    description: `${labels.primary} > ${labels.secondary} 중고 거래 게시글 목록`,
  }
}
