import { NextResponse, type NextRequest } from 'next/server'
import {
  getAdminBasicAuthConfig,
  isAdminBasicAuthAuthorized,
} from '@/lib/adminAuth'

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Guheyo Admin", charset="UTF-8"',
    },
  })
}

export function proxy(request: NextRequest) {
  const config = getAdminBasicAuthConfig(process.env)

  if (!config || !isAdminBasicAuthAuthorized(request.headers.get('authorization'), config)) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
