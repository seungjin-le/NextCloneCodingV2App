import { type ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 lg:px-8">
      {children}
    </div>
  )
}

export function PageLayout({ children }: { children: ReactNode }) {
  return <div className="px-4 py-6 lg:px-8">{children}</div>
}

export function ContentContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {children}
    </div>
  )
}
