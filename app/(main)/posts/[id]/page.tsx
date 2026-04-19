import Image from 'next/image'
import Link from 'next/link'
import { PageLayout, ContentContainer } from '@/components/container'
import { notFound } from 'next/navigation'
import { FeedSection } from '@/components/FeedSection'
import { ImageGallery } from '@/components/ImageGallery'
import { getNavPageLabel } from '@/lib/nav'
import { getPostById, getSimilarPosts } from '@/lib/data'

const BF_LABELS = {
  sell: { text: '판매', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  buy: { text: '구매', className: 'bg-sky-500/20 text-sky-400 border-sky-500/40' },
  swap: { text: '교환', className: 'bg-violet-500/20 text-violet-400 border-violet-500/40' },
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  const labels = getNavPageLabel(post.category, post.slug)
  const bf = BF_LABELS[post.businessFunction]
  const similar = getSimilarPosts(post)

  return (
    <PageLayout>
      {/* 브레드크럼 */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="transition hover:text-zinc-300">홈</Link>
        {labels && (
          <>
            <span>/</span>
            <Link href={`/${post.category}/${post.slug}`} className="transition hover:text-zinc-300">
              {labels.secondary}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="max-w-[160px] truncate text-zinc-400">{post.title}</span>
      </nav>

      <ContentContainer>
      {/* 게시글 카드 */}
      <article className="rounded-xl border border-zinc-700/60 bg-dark-600 p-5 shadow-lg">
        {/* 배지 + 제목 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded border px-2 py-0.5 text-xs font-semibold ${bf.className}`}>
            {bf.text}
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="mb-3 text-xl font-bold text-zinc-100 leading-snug">{post.title}</h1>

        {/* 메타 정보 */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-zinc-300 ${post.thumbnailColor}`}
            >
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <span className="font-medium text-zinc-300">{post.author}</span>
          </div>
          <span>{post.time}</span>
          <span>👁 {post.viewCount}</span>
          <span>♡ {post.likeCount}</span>
        </div>

        {/* 가격 강조 */}
        <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
          <span className="text-xs text-zinc-500">가격 / 조건</span>
          <p className="mt-0.5 text-lg font-bold text-emerald-400">{post.price}</p>
        </div>

        {/* 본문 */}
        <div className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
          {post.body}
        </div>

        {/* 첨부 이미지 */}
        {post.images && post.images.length > 0 && (
          <div className="mb-6">
            <ImageGallery images={post.images} />
          </div>
        )}

        {/* 전체 태그 */}
        {post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <hr className="mb-5 border-zinc-700/60" />

        {/* 작성자 카드 */}
        <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-zinc-300 ${post.thumbnailColor}`}
            >
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-200">{post.author}</p>
              <p className="text-xs text-zinc-500">Discord 멤버</p>
            </div>
          </div>
          <button
            type="button"
            className="bg-blurple-500 hover:bg-blurple-600 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition"
          >
            <Image src="/socials/discord/discord-mark-white.svg" alt="" width={16} height={16} className="size-4" />
            Discord DM
          </button>
        </div>
      </article>

      {/* 유사 게시글 */}
      {similar.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-base font-bold text-zinc-300">비슷한 게시글</h2>
          <FeedSection
            businessFunction={post.businessFunction}
            categoryFilter={{ category: post.category, slug: post.slug }}
            limit={3}
            hideHeader
          />
        </div>
      )}


        {/* 뒤로 가기 */}
        <div className="mt-8">
          <Link
            href={labels ? `/${post.category}/${post.slug}` : '/'}
            className="text-sm text-zinc-500 transition hover:text-zinc-300"
          >
            ← {labels ? `${labels.secondary} 목록으로` : '홈으로'}
          </Link>
        </div>
      </ContentContainer>
    </PageLayout>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) return {}
  return {
    title: `${post.title} | 구해요`,
    description: post.body.slice(0, 120),
  }
}
