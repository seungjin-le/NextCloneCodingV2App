import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { PageContainer } from '@/components/container'

const meta = {
  title: 'Components/PageContainer',
  component: PageContainer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p className="text-zinc-300">페이지 콘텐츠</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const content = canvas.getByText('페이지 콘텐츠')
    expect(content).toBeInTheDocument()

    // The wrapping div should carry the page-enter animation class
    const container = content.closest('[class*="animate-page-enter"]')
    expect(container).not.toBeNull()
  },
}

export const WithMultipleChildren: Story = {
  args: {
    children: (
      <>
        <h1 className="text-zinc-100">제목</h1>
        <p className="text-zinc-400">본문 내용</p>
      </>
    ),
  },
}
