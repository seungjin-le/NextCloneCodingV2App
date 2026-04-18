import Link from 'next/link'
import { type BusinessFunction, type MockPost, getLatestPosts, getPostsByCategory } from '@/lib/data'

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

function PostCard({ post }: { post: MockPost }) {
  return (
    <li>
      <Link href={`/posts/${post.id}`}>
        <article className="flex gap-3 rounded-lg border border-zinc-700/50 bg-dark-600/80 p-3 transition hover:border-zinc-500 hover:bg-dark-600">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-md text-sm font-bold text-zinc-300 ${post.thumbnailColor}`}
          >
            {post.author.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-200">{post.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
              <span>{post.author}</span>
              <span className="font-medium text-emerald-400/90">{post.price}</span>
              <span>{post.time}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end justify-between gap-1 text-xs text-zinc-600">
            <span>👁 {post.viewCount}</span>
            <span>♡ {post.likeCount}</span>
          </div>
        </article>
      </Link>
    </li>
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
          className={`mb-3 flex items-center justify-between border-b border-zinc-700/60 bg-gradient-to-r ${accent} px-2 py-3 md:rounded-t-lg md:px-4`}
        >
          <h2
            id={`heading-${businessFunction}`}
            className="text-base font-bold tracking-tight text-dark-200 md:text-lg"
          >
            {title}
          </h2>
          <Link href={moreHref} className="text-xs text-zinc-500 transition hover:text-zinc-300">
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
