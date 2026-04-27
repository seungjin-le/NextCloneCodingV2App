export type AdminBasicAuthConfig = {
  username: string
  password: string
}

type AdminAuthEnv = {
  [key: string]: string | undefined
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
}

function timingSafeEqualString(a: string, b: string) {
  const maxLength = Math.max(a.length, b.length)
  let diff = a.length ^ b.length

  for (let index = 0; index < maxLength; index += 1) {
    diff |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0)
  }

  return diff === 0
}

export function getAdminBasicAuthConfig(env: AdminAuthEnv): AdminBasicAuthConfig | null {
  const username = env.ADMIN_USERNAME?.trim()
  const password = env.ADMIN_PASSWORD

  if (!username || !password) {
    return null
  }

  return { username, password }
}

export function isAdminBasicAuthAuthorized(
  authorization: string | null,
  config: AdminBasicAuthConfig
) {
  if (!authorization?.startsWith('Basic ')) {
    return false
  }

  try {
    const decoded = globalThis.atob(authorization.slice('Basic '.length))
    const separatorIndex = decoded.indexOf(':')

    if (separatorIndex < 0) {
      return false
    }

    const username = decoded.slice(0, separatorIndex)
    const password = decoded.slice(separatorIndex + 1)

    return (
      timingSafeEqualString(username, config.username) &&
      timingSafeEqualString(password, config.password)
    )
  } catch {
    return false
  }
}
