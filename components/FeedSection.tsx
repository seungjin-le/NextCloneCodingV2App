import Link from 'next/link'
import { type BusinessFunction, type MockPost, getLatestPosts, getPostsByCategory } from '@/lib/data'
import { PostCard } from '@/components/post'

const LABELS: Record<BusinessFunction, { title: string; accent: string; moreHref: string }> = {
  sell: { title: '판매', accent: 'from-emerald-500/20 to-emerald-500/5', moreHref: '/group/keyboard?type=sell' },
  buy: { title: '구매', accent: 'from-sky-500/20 to-sky-500/5', moreHref: '/group/keyboard?type=buy' },
  swap: { title: '교환', accent: 'from-violet-500/20 to-violet-500/5', moreHref: '/group/keyboard?type=swap' },
}

function filterByQuery(posts: MockPost[], query: string): MockPost[] {
  const q = query.trim().toLowerCase()
  if (!q) return posts
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.price.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  )
}

type FeedSectionProps = {
  businessFunction: BusinessFunction
  filterQuery?: string
  categoryFilter?: { category: string; slug: string }
  limit?: number
  hideHeader?: boolean
}

export function FeedSection({
  businessFunction,
  filterQuery = '',
  categoryFilter,
  limit = 4,
  hideHeader = false,
}: FeedSectionProps) {
  const { title, accent, moreHref } = LABELS[businessFunction]

  const rawPosts = categoryFilter
    ? getPostsByCategory(categoryFilter.category, categoryFilter.slug)
        .filter((p) => p.businessFunction === businessFunction)
        .slice(0, limit)
    : getLatestPosts(businessFunction, limit)

  const posts = filterByQuery(rawPosts, filterQuery)

  return (
    <section
      className="w-full scroll-mt-24"
      id={`section-${businessFunction}`}
      aria-labelledby={`heading-${businessFunction}`}
    >
      {!hideHeader && (
        <div
          className={`relative mb-3 flex items-center justify-center border-b border-zinc-700/60 bg-gradient-to-r ${accent} px-2 py-3 md:rounded-t-lg md:px-4`}
        >
          <h2
            id={`heading-${businessFunction}`}
            className="text-base font-bold tracking-tight text-dark-200 md:text-lg"
          >
            {title}
          </h2>
          <Link href={moreHref} className="absolute right-4 text-xs text-zinc-500 transition hover:text-zinc-300">
            더보기 →
          </Link>
        </div>
      )}

      <ul className="flex flex-col gap-2 px-2 md:px-0">
        {posts.length === 0 ? (
          <li className="rounded-lg border border-dashed border-zinc-700 px-3 py-6 text-center text-sm text-zinc-500">
            검색 결과가 없습니다.
          </li>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </ul>
    </section>
  )
}
