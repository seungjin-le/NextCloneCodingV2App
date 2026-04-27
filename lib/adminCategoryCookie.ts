import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME,
  parseCustomSidebarCategories,
  type CustomSidebarCategory,
} from './adminCategories'

export const CUSTOM_SIDEBAR_CATEGORIES_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
export const CUSTOM_SIDEBAR_CATEGORIES_COOKIE_MAX_BYTES = 3800

type AdminCategoryCookieEnv = {
  [key: string]: string | undefined
  ADMIN_CATEGORY_COOKIE_SECRET?: string
}

export function getAdminCategoryCookieSecret(env: AdminCategoryCookieEnv) {
  return env.ADMIN_CATEGORY_COOKIE_SECRET || null
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function signaturesMatch(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return timingSafeEqual(aBuffer, bBuffer)
}

export function createSignedCustomSidebarCategoriesCookie(
  categories: CustomSidebarCategory[],
  secret: string
) {
  const payload = Buffer.from(JSON.stringify(categories), 'utf8').toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function parseSignedCustomSidebarCategoriesCookie(
  value: string | null | undefined,
  secret: string
) {
  if (!value) return []

  const [payload, signature, extra] = value.split('.')
  if (!payload || !signature || extra) return []

  if (!signaturesMatch(signature, sign(payload, secret))) {
    return []
  }

  try {
    return parseCustomSidebarCategories(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return []
  }
}

export function isSignedCustomSidebarCategoriesCookieWithinLimit(value: string) {
  return Buffer.byteLength(`${CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME}=${value}`, 'utf8')
    <= CUSTOM_SIDEBAR_CATEGORIES_COOKIE_MAX_BYTES
}
