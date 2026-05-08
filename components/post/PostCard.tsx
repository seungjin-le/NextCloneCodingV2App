import Link from 'next/link'
import { type MockPost } from '@/lib/data'
import { PostAvatar } from './PostAvatar'
import { PostStats } from './PostStats'
import { PostTags } from './PostTags'

export function PostCard({ post }: { post: MockPost }) {
  return (
    <li>
      <Link href={`/posts/${post.id}`}>
        <article className="flex gap-3 rounded-lg border border-zinc-700/50 bg-dark-600/80 p-3 transition hover:border-zinc-500 hover:bg-dark-600">
          <PostAvatar
            author={post.author}
            colorClassName={post.thumbnailColor}
            shape="square"
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-200">{post.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
              <span>{post.author}</span>
              <span className="font-medium text-emerald-400/90">{post.price}</span>
              <span>{post.time}</span>
            </div>
            <PostTags tags={post.tags} limit={3} className="mt-1.5" />
          </div>
          <PostStats
            layout="column"
            viewCount={post.viewCount}
            likeCount={post.likeCount}
          />
        </article>
      </Link>
    </li>
  )
}
