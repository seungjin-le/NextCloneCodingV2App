import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { expect as storyExpect, within } from 'storybook/test'
import { type MockPost } from '@/lib/data'
import { PostCard } from './PostCard'

const samplePost: MockPost = {
  id: 'story-post-1',
  category: 'group',
  slug: 'keyboard',
  businessFunction: 'sell',
  author: 'StoryUser',
  title: 'Storybook 테스트용 키보드 판매',
  price: '₩90,000',
  time: '방금 전',
  body: '재사용 게시글 카드의 브라우저 렌더링을 확인합니다.',
  tags: ['storybook', 'keyboard', 'reuse'],
  thumbnailColor: 'bg-violet-800',
  viewCount: 12,
  likeCount: 3,
}

const meta = {
  title: 'Post/PostCard',
  component: PostCard,
  tags: ['test'],
  parameters: { layout: 'padded' },
  args: { post: samplePost },
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    storyExpect(canvas.getByText('Storybook 테스트용 키보드 판매')).toBeInTheDocument()
    storyExpect(canvas.getByText('StoryUser')).toBeInTheDocument()
    storyExpect(canvas.getByText('₩90,000')).toBeInTheDocument()
    storyExpect(canvas.getByText('#storybook')).toBeInTheDocument()
    storyExpect(canvas.getByText('👁 12')).toBeInTheDocument()
    storyExpect(canvas.getByText('♡ 3')).toBeInTheDocument()
  },
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('PostCard browser rendering', () => {
  it('renders the reusable post card fields in a browser', async () => {
    const host = document.createElement('ul')
    document.body.append(host)

    const root = createRoot(host)
    root.render(<PostCard post={samplePost} />)
    await expect.poll(() => document.body.textContent).toContain('Storybook 테스트용 키보드 판매')

    expect(document.body.textContent).toContain('Storybook 테스트용 키보드 판매')
    expect(document.body.textContent).toContain('StoryUser')
    expect(document.body.textContent).toContain('₩90,000')
    expect(document.body.textContent).toContain('#storybook')
    expect(document.body.textContent).toContain('👁 12')
    expect(document.body.textContent).toContain('♡ 3')

    root.unmount()
  })
})
