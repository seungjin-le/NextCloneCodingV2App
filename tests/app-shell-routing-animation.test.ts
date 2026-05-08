import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const appShellSource = readFileSync(join(process.cwd(), 'components/AppShell.tsx'), 'utf8')
const containerSource = readFileSync(join(process.cwd(), 'components/container/PageContainer.tsx'), 'utf8')
const routeTransitionSource = readFileSync(
  join(process.cwd(), 'components/container/RouteContentTransition.tsx'),
  'utf8'
)
const categoryPageSource = readFileSync(join(process.cwd(), 'app/(main)/[category]/[slug]/page.tsx'), 'utf8')
const postDetailPageSource = readFileSync(join(process.cwd(), 'app/(main)/posts/[id]/page.tsx'), 'utf8')

describe('AppShell route transitions', () => {
  it('does not remount or animate the whole page when the pathname changes', () => {
    expect(appShellSource).not.toContain('animate-page-enter')
    expect(appShellSource).not.toContain('key={pathname}')
    expect(appShellSource).not.toContain('usePathname')
  })

  it('keys the content animation to route changes', () => {
    expect(routeTransitionSource).toContain('"use client"')
    expect(routeTransitionSource).toContain('usePathname')
    expect(routeTransitionSource).toContain('useSearchParams')
    expect(routeTransitionSource).toContain('const routeKey =')
    expect(routeTransitionSource).toContain('key={routeKey}')
  })

  it('animates only content containers', () => {
    expect(containerSource).toContain('RouteContentTransition')
    expect(containerSource).toContain('animate-content-enter')
    expect(containerSource).not.toContain('animate-page-enter')
  })

  it('keeps route labels and page titles outside the animated content', () => {
    expect(categoryPageSource.indexOf('<nav')).toBeLessThan(categoryPageSource.indexOf('<ContentContainer>'))
    expect(categoryPageSource.indexOf('<h1')).toBeLessThan(categoryPageSource.indexOf('<ContentContainer>'))

    expect(postDetailPageSource.indexOf('<nav')).toBeLessThan(postDetailPageSource.indexOf('<ContentContainer>'))
    expect(postDetailPageSource.indexOf('<h1')).toBeLessThan(postDetailPageSource.indexOf('<ContentContainer>'))
    expect(postDetailPageSource.indexOf('<PostTags')).toBeGreaterThan(postDetailPageSource.indexOf('<ContentContainer>'))
  })
})
