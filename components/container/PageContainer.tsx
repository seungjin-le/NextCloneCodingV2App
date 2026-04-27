import { Suspense, type ReactNode } from 'react'
import { RouteContentTransition } from './RouteContentTransition'

export function PageContainer({ children }: { children: ReactNode }) {
  const className = 'animate-content-enter mx-auto w-full max-w-3xl px-4 py-6 lg:px-8'

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <RouteContentTransition className={className}>{children}</RouteContentTransition>
    </Suspense>
  )
}

export function PageLayout({ children }: { children: ReactNode }) {
  return <div className="px-4 py-6 lg:px-8">{children}</div>
}

export function ContentContainer({ children }: { children: ReactNode }) {
  const className = 'animate-content-enter mx-auto w-full max-w-3xl'

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <RouteContentTransition className={className}>{children}</RouteContentTransition>
    </Suspense>
  )
}
