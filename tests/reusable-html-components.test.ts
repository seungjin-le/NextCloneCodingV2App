import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function source(path: string) {
  return readFileSync(join(process.cwd(), path), 'utf8')
}

function count(sourceText: string, token: string) {
  return sourceText.split(token).length - 1
}

describe('reusable HTML component extraction', () => {
  it('promotes repeated header actions into shared components', () => {
    const siteHeader = source('components/SiteHeader.tsx')

    expect(existsSync(join(process.cwd(), 'components/ui/IconButton.tsx'))).toBe(true)
    expect(existsSync(join(process.cwd(), 'components/ui/DiscordButton.tsx'))).toBe(true)
    expect(count(siteHeader, '<IconButton')).toBeGreaterThanOrEqual(3)
    expect(count(siteHeader, '<DiscordButton')).toBe(2)
    expect(siteHeader).not.toContain('inline-flex size-9 items-center justify-center rounded-full')
  })

  it('promotes repeated form field HTML into shared field components', () => {
    const writeDialog = source('components/WritePostDialog.tsx')
    const adminManager = source('components/admin/AdminCategoryManager.tsx')
    const combinedSource = `${writeDialog}\n${adminManager}`

    expect(existsSync(join(process.cwd(), 'components/forms/FormField.tsx'))).toBe(true)
    expect(count(combinedSource, '<FormField')).toBeGreaterThanOrEqual(6)
    expect(combinedSource).not.toContain('focus:border-blurple-500 focus:outline-none focus:ring-1 focus:ring-blurple-500')
  })

  it('promotes repeated post UI HTML into post-scoped components', () => {
    const feedSection = source('components/FeedSection.tsx')
    const postCard = source('components/post/PostCard.tsx')
    const postDetailPage = source('app/(main)/posts/[id]/page.tsx')

    for (const componentPath of [
      'components/post/BusinessFunctionBadge.tsx',
      'components/post/PostAvatar.tsx',
      'components/post/PostCard.tsx',
      'components/post/PostStats.tsx',
      'components/post/PostTags.tsx',
    ]) {
      expect(existsSync(join(process.cwd(), componentPath))).toBe(true)
    }

    expect(feedSection).not.toContain('function PostCard')
    expect(feedSection).toContain('<PostCard')
    expect(postDetailPage).toContain('<BusinessFunctionBadge')
    expect(count(postDetailPage, '<PostAvatar')).toBeGreaterThanOrEqual(2)
    expect(count(`${postCard}\n${postDetailPage}`, '<PostTags')).toBeGreaterThanOrEqual(3)
  })
})
