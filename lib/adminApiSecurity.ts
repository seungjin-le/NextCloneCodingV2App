export function isAllowedAdminMutationOrigin(origin: string | null, requestUrl: string) {
  if (!origin) return false

  try {
    return new URL(origin).origin === new URL(requestUrl).origin
  } catch {
    return false
  }
}
