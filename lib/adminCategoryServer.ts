import { cookies } from 'next/headers'
import { CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME } from './adminCategories'
import {
  getAdminCategoryCookieSecret,
  parseSignedCustomSidebarCategoriesCookie,
} from './adminCategoryCookie'

export async function getCustomSidebarCategoriesFromCookie() {
  const cookieStore = await cookies()
  const secret = getAdminCategoryCookieSecret(process.env)
  if (!secret) return []

  return parseSignedCustomSidebarCategoriesCookie(
    cookieStore.get(CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME)?.value,
    secret
  )
}
