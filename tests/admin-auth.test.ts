import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getAdminBasicAuthConfig, isAdminBasicAuthAuthorized } from '../lib/adminAuth'

const proxySource = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8')
const sidebarSource = readFileSync(join(process.cwd(), 'components', 'Sidebar.tsx'), 'utf8')

function basic(username: string, password: string) {
  return `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`
}

describe('admin basic auth guard', () => {
  it('requires both admin username and password to enable admin access', () => {
    expect(getAdminBasicAuthConfig({})).toBeNull()
    expect(getAdminBasicAuthConfig({ ADMIN_USERNAME: 'admin' })).toBeNull()
    expect(getAdminBasicAuthConfig({ ADMIN_PASSWORD: 'secret' })).toBeNull()
    expect(getAdminBasicAuthConfig({ ADMIN_USERNAME: 'admin', ADMIN_PASSWORD: 'secret' })).toEqual({
      username: 'admin',
      password: 'secret',
    })
  })

  it('accepts only matching Basic auth credentials', () => {
    const config = { username: 'admin', password: 'secret' }

    expect(isAdminBasicAuthAuthorized(basic('admin', 'secret'), config)).toBe(true)
    expect(isAdminBasicAuthAuthorized(basic('admin', 'wrong'), config)).toBe(false)
    expect(isAdminBasicAuthAuthorized(basic('other', 'secret'), config)).toBe(false)
  })

  it('rejects missing or malformed authorization headers', () => {
    const config = { username: 'admin', password: 'secret' }

    expect(isAdminBasicAuthAuthorized(null, config)).toBe(false)
    expect(isAdminBasicAuthAuthorized('', config)).toBe(false)
    expect(isAdminBasicAuthAuthorized('Bearer token', config)).toBe(false)
    expect(isAdminBasicAuthAuthorized('Basic not-base64', config)).toBe(false)
    expect(isAdminBasicAuthAuthorized(`Basic ${Buffer.from('missing-colon').toString('base64')}`, config)).toBe(false)
  })

  it('protects both the admin page and admin API routes', () => {
    expect(proxySource).toContain("'/admin/:path*'")
    expect(proxySource).toContain("'/api/admin/:path*'")
  })

  it('does not expose the admin route in the public sidebar', () => {
    expect(sidebarSource).not.toContain('href="/admin/categories"')
  })
})
