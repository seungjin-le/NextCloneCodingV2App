import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ImageGallery } from '@/components/ImageGallery'

const SAMPLE_IMAGES = [
  'https://picsum.photos/seed/guheyo1/800/600',
  'https://picsum.photos/seed/guheyo2/800/600',
  'https://picsum.photos/seed/guheyo3/800/600',
]

const meta = {
  title: 'Components/ImageGallery',
  component: ImageGallery,
  parameters: { layout: 'padded' },
  args: { images: SAMPLE_IMAGES },
} satisfies Meta<typeof ImageGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleImage: Story = {
  args: { images: [SAMPLE_IMAGES[0]] },
}

export const Empty: Story = {
  args: { images: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.queryByRole('img')).toBeNull()
  },
}

export const OpensLightboxOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const thumbnails = canvas.getAllByRole('img')
    expect(thumbnails.length).toBeGreaterThan(0)

    await userEvent.click(thumbnails[0])

    const lightbox = canvas.getByRole('dialog')
    expect(lightbox).toBeInTheDocument()

    const expandedImg = within(lightbox).getByRole('img')
    expect(expandedImg).toBeInTheDocument()
  },
}

export const ClosesLightboxOnBackdropClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const thumbnails = canvas.getAllByRole('img')
    await userEvent.click(thumbnails[0])

    const lightbox = canvas.getByRole('dialog')
    expect(lightbox).toBeInTheDocument()

    await userEvent.click(lightbox)

    expect(canvas.queryByRole('dialog')).toBeNull()
  },
}

export const ClosesLightboxOnEscape: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const thumbnails = canvas.getAllByRole('img')
    await userEvent.click(thumbnails[0])

    expect(canvas.getByRole('dialog')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    expect(canvas.queryByRole('dialog')).toBeNull()
  },
}

export const NavigatesWithArrows: Story = {
  args: { images: SAMPLE_IMAGES },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const thumbnails = canvas.getAllByRole('img')
    await userEvent.click(thumbnails[0])

    const lightbox = canvas.getByRole('dialog')
    const prevBtn = within(lightbox).getByLabelText('이전 이미지')
    const nextBtn = within(lightbox).getByLabelText('다음 이미지')

    expect(prevBtn).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()

    await userEvent.click(nextBtn)
    await userEvent.click(prevBtn)

    expect(canvas.getByRole('dialog')).toBeInTheDocument()
  },
}
