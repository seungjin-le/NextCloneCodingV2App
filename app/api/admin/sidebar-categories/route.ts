import { NextResponse } from 'next/server'
import {
  CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME,
  parseCustomSidebarCategories,
} from '@/lib/adminCategories'
import {
  createSignedCustomSidebarCategoriesCookie,
  CUSTOM_SIDEBAR_CATEGORIES_COOKIE_MAX_AGE,
  getAdminCategoryCookieSecret,
  isSignedCustomSidebarCategoriesCookieWithinLimit,
} from '@/lib/adminCategoryCookie'
import { isAllowedAdminMutationOrigin } from '@/lib/adminApiSecurity'

export async function POST(request: Request) {
  if (!isAllowedAdminMutationOrigin(request.headers.get('origin'), request.url)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
  }

  const secret = getAdminCategoryCookieSecret(process.env)
  if (!secret) {
    return NextResponse.json({ error: 'Admin category cookie secret is not configured.' }, { status: 500 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const categories = parseCustomSidebarCategories(JSON.stringify(
    typeof body === 'object' && body !== null && 'categories' in body
      ? (body as { categories: unknown }).categories
      : null
  ))
  const cookieValue = createSignedCustomSidebarCategoriesCookie(categories, secret)

  if (!isSignedCustomSidebarCategoriesCookieWithinLimit(cookieValue)) {
    return NextResponse.json({ error: 'Too many custom categories.' }, { status: 413 })
  }

  const response = NextResponse.json({ categories })
  response.cookies.set(CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    maxAge: CUSTOM_SIDEBAR_CATEGORIES_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
