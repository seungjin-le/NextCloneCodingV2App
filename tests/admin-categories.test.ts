import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  buildSidebarSections,
  parseCustomSidebarCategories,
  registerSidebarCategory,
} from '../lib/adminCategories'
import { getNavPageLabel } from '../lib/nav'
import { categoryRegistrationSchema, normalizeCategorySlug } from '../lib/validations'

const sidebarSource = readFileSync(join(process.cwd(), 'components/Sidebar.tsx'), 'utf8')
const adminManagerSource = readFileSync(
  join(process.cwd(), 'components/admin/AdminCategoryManager.tsx'),
  'utf8'
)
const mainLayoutSource = readFileSync(join(process.cwd(), 'app/(main)/layout.tsx'), 'utf8')

describe('admin sidebar category registration', () => {
  it('normalizes category slugs before validation', () => {
    expect(normalizeCategorySlug('  Custom_Keyboards  ')).toBe('custom-keyboards')
    expect(categoryRegistrationSchema.parse({
      section: 'group',
      label: '커스텀 키보드',
      slug: '  Custom Keyboards  ',
    }).slug).toBe('custom-keyboards')
  })

  it('rejects invalid labels and slugs', () => {
    expect(categoryRegistrationSchema.safeParse({
      section: 'group',
      label: 'A',
      slug: 'valid-slug',
    }).success).toBe(false)

    expect(categoryRegistrationSchema.safeParse({
      section: 'group',
      label: '커스텀',
      slug: 'bad/slug',
    }).success).toBe(false)
  })

  it('prevents duplicate slugs within the same sidebar section', () => {
    const result = registerSidebarCategory([], {
      section: 'group',
      label: '또 다른 키보드',
      slug: 'keyboard',
    })

    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.errors.slug).toContain('이미 등록된 슬러그입니다.')
  })

  it('adds a valid custom category after the default sidebar items', () => {
    const result = registerSidebarCategory([], {
      section: 'group',
      label: '커스텀 키보드',
      slug: 'custom-keyboards',
    }, '2026-04-27T00:00:00.000Z')

    expect(result.ok).toBe(true)
    if (!result.ok) return

    const groupSection = buildSidebarSections(result.categories).find((section) => section.category === 'group')

    expect(groupSection?.items.map((item) => item.slug)).toEqual([
      'keyboard',
      'mouse',
      'audio',
      'custom-keyboards',
    ])
    expect(groupSection?.items.at(-1)).toMatchObject({
      label: '커스텀 키보드',
      custom: true,
    })
  })

  it('ignores corrupted local storage payloads', () => {
    expect(parseCustomSidebarCategories('not-json')).toEqual([])
    expect(parseCustomSidebarCategories(JSON.stringify([{ section: 'group', slug: 'bad/slug', label: '커스텀' }]))).toEqual([])
  })

  it('drops stored categories that duplicate default or previously stored slugs', () => {
    const categories = parseCustomSidebarCategories(JSON.stringify([
      { section: 'group', label: '기본 중복', slug: 'keyboard', createdAt: '2026-04-27T00:00:00.000Z' },
      { section: 'group', label: '키캡', slug: 'keycaps', createdAt: '2026-04-27T00:00:00.000Z' },
      { section: 'group', label: '키캡 중복', slug: 'keycaps', createdAt: '2026-04-27T00:01:00.000Z' },
      { section: 'market', label: '키캡', slug: 'keycaps', createdAt: '2026-04-27T00:02:00.000Z' },
    ]))

    expect(categories).toEqual([
      { section: 'group', label: '키캡', slug: 'keycaps', createdAt: '2026-04-27T00:00:00.000Z' },
      { section: 'market', label: '키캡', slug: 'keycaps', createdAt: '2026-04-27T00:02:00.000Z' },
    ])
  })

  it('uses the signed server cookie as the initial sidebar category source', () => {
    expect(mainLayoutSource).toContain('getCustomSidebarCategoriesFromCookie')
    expect(mainLayoutSource).toContain('initialCustomSidebarCategories')
    expect(sidebarSource).toContain('initialCustomCategories')
    expect(sidebarSource).not.toContain('localStorage')
    expect(sidebarSource).not.toContain("addEventListener('storage'")
  })

  it('updates same-tab category UI through explicit category event payloads', () => {
    expect(adminManagerSource).not.toContain('localStorage')
    expect(adminManagerSource).toContain('new CustomEvent')
    expect(adminManagerSource).toContain('detail: { categories }')
    expect(sidebarSource).toContain('CustomEvent')
    expect(sidebarSource).toContain('customEvent.detail.categories')
  })

  it('resolves custom route labels only from registered categories', () => {
    const categories = [
      { section: 'group' as const, label: '키캡', slug: 'keycaps', createdAt: '2026-04-27T00:00:00.000Z' },
    ]

    expect(getNavPageLabel('group', 'keyboard', categories)).toEqual({
      primary: '그룹',
      secondary: '키보드',
    })
    expect(getNavPageLabel('group', 'keycaps', categories)).toEqual({
      primary: '그룹',
      secondary: '키캡',
    })
    expect(getNavPageLabel('group', 'not-registered', categories)).toBeNull()
  })
})
