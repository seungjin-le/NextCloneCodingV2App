import Link from 'next/link'
import { PageLayout, ContentContainer } from '@/components/container'
import { notFound } from 'next/navigation'
import { FeedSection } from '@/components/FeedSection'
import { ImageGallery } from '@/components/ImageGallery'
import { BusinessFunctionBadge, PostAvatar, PostStats, PostTags } from '@/components/post'
import { DiscordButton } from '@/components/ui'
import { getNavPageLabel } from '@/lib/nav'
import { getPostById, getSimilarPosts } from '@/lib/data'

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  const labels = getNavPageLabel(post.category, post.slug)
  const similar = getSimilarPosts(post)

  return (
    <PageLayout>
      <nav className="mb-4 flex min-w-0 items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="shrink-0 transition hover:text-zinc-300">
          홈
        </Link>
        {labels && (
          <>
            <span className="shrink-0">/</span>
            <Link href={`/${post.category}/${post.slug}`} className="shrink-0 transition hover:text-zinc-300">
              {labels.secondary}
            </Link>
          </>
        )}
        <span className="shrink-0">/</span>
        <span className="min-w-0 truncate text-zinc-400">{post.title}</span>
      </nav>

      <div className="mx-auto mb-4 w-full max-w-3xl">
        <h1 className="text-xl leading-snug font-bold text-zinc-100">{post.title}</h1>
      </div>

      <ContentContainer>
        {/* 게시글 카드 */}
        <article className="bg-dark-600 rounded-xl border border-zinc-700/60 p-5 shadow-lg">
          {/* 배지 */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <BusinessFunctionBadge value={post.businessFunction} />
            <PostTags tags={post.tags} limit={2} />
          </div>

          {/* 메타 정보 */}
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <PostAvatar author={post.author} colorClassName={post.thumbnailColor} size="sm" />
              <span className="font-medium text-zinc-300">{post.author}</span>
            </div>
            <span>{post.time}</span>
            <PostStats viewCount={post.viewCount} likeCount={post.likeCount} />
          </div>

          {/* 가격 강조 */}
          <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
            <span className="text-xs text-zinc-500">가격 / 조건</span>
            <p className="mt-0.5 text-lg font-bold text-emerald-400">{post.price}</p>
          </div>

          {/* 본문 */}
          <div className="mb-6 text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">{post.body}</div>

          {/* 첨부 이미지 */}
          {post.images && post.images.length > 0 && (
            <div className="mb-6">
              <ImageGallery images={post.images} />
            </div>
          )}

          {/* 전체 태그 */}
          <PostTags tags={post.tags} variant="pill" className="mb-6" />

          <hr className="mb-5 border-zinc-700/60" />

          {/* 작성자 카드 */}
          <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
            <div className="flex items-center gap-3">
              <PostAvatar author={post.author} colorClassName={post.thumbnailColor} />
              <div>
                <p className="text-sm font-semibold text-zinc-200">{post.author}</p>
                <p className="text-xs text-zinc-500">Discord 멤버</p>
              </div>
            </div>
            <DiscordButton label="Discord DM" size="sm" />
          </div>
        </article>

        {/* 유사 게시글 */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-base font-bold text-zinc-300">비슷한 게시글</h2>
            <FeedSection businessFunction={post.businessFunction} categoryFilter={{ category: post.category, slug: post.slug }} limit={3} hideHeader />
          </div>
        )}

        {/* 뒤로 가기 */}
        <div className="mt-8">
          <Link href={labels ? `/${post.category}/${post.slug}` : '/'} className="text-sm text-zinc-500 transition hover:text-zinc-300">
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
    description: post.body.slice(0, 120)
  }
}
