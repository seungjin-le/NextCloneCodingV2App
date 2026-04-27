import { describe, expect, it } from 'vitest'
import { isAllowedAdminMutationOrigin } from '../lib/adminApiSecurity'

describe('admin API mutation security', () => {
  it('allows same-origin mutation requests', () => {
    expect(isAllowedAdminMutationOrigin('https://guheyo.test', 'https://guheyo.test/api/admin/sidebar-categories')).toBe(true)
  })

  it('rejects missing, malformed, and cross-origin mutation requests', () => {
    expect(isAllowedAdminMutationOrigin(null, 'https://guheyo.test/api/admin/sidebar-categories')).toBe(false)
    expect(isAllowedAdminMutationOrigin('not-a-url', 'https://guheyo.test/api/admin/sidebar-categories')).toBe(false)
    expect(isAllowedAdminMutationOrigin('https://evil.test', 'https://guheyo.test/api/admin/sidebar-categories')).toBe(false)
  })
})
