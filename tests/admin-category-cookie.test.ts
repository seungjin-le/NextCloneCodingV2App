import { describe, expect, it } from 'vitest'
import {
  createSignedCustomSidebarCategoriesCookie,
  getAdminCategoryCookieSecret,
  isSignedCustomSidebarCategoriesCookieWithinLimit,
  parseSignedCustomSidebarCategoriesCookie,
} from '../lib/adminCategoryCookie'

const categories = [
  { section: 'group' as const, label: '키캡', slug: 'keycaps', createdAt: '2026-04-27T00:00:00.000Z' },
]

describe('signed admin category cookies', () => {
  it('round-trips categories with a server-side signature', () => {
    const cookie = createSignedCustomSidebarCategoriesCookie(categories, 'secret')

    expect(cookie).toContain('.')
    expect(parseSignedCustomSidebarCategoriesCookie(cookie, 'secret')).toEqual(categories)
  })

  it('rejects tampered category payloads and wrong secrets', () => {
    const cookie = createSignedCustomSidebarCategoriesCookie(categories, 'secret')
    const [payload, signature] = cookie.split('.')
    const tamperedPayload = Buffer.from(JSON.stringify([
      { ...categories[0], label: '조작됨' },
    ]), 'utf8').toString('base64url')

    expect(parseSignedCustomSidebarCategoriesCookie(`${tamperedPayload}.${signature}`, 'secret')).toEqual([])
    expect(parseSignedCustomSidebarCategoriesCookie(cookie, 'other-secret')).toEqual([])
    expect(parseSignedCustomSidebarCategoriesCookie(`${payload}.bad-signature`, 'secret')).toEqual([])
  })

  it('requires an explicit cookie secret separate from the admin password', () => {
    expect(getAdminCategoryCookieSecret({})).toBeNull()
    expect(getAdminCategoryCookieSecret({ ADMIN_PASSWORD: 'admin-password' })).toBeNull()
    expect(getAdminCategoryCookieSecret({
      ADMIN_CATEGORY_COOKIE_SECRET: 'cookie-secret',
      ADMIN_PASSWORD: 'admin-password',
    })).toBe('cookie-secret')
  })

  it('detects signed cookie values that exceed the browser-safe size budget', () => {
    const cookie = createSignedCustomSidebarCategoriesCookie(categories, 'secret')
    const oversizedCookie = createSignedCustomSidebarCategoriesCookie(
      Array.from({ length: 80 }, (_, index) => ({
        section: 'group' as const,
        label: `키캡 ${index}`,
        slug: `keycaps-${index}`,
        createdAt: '2026-04-27T00:00:00.000Z',
      })),
      'secret'
    )

    expect(isSignedCustomSidebarCategoriesCookieWithinLimit(cookie)).toBe(true)
    expect(isSignedCustomSidebarCategoriesCookieWithinLimit(oversizedCookie)).toBe(false)
  })
})
