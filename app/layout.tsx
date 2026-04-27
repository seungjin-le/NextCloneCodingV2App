import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '구해요',
  description: '로블록스 거래 플랫폼, 구해요 (클론 UI 데모)'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="text-dark-200 bg-background flex min-h-full flex-col break-keep">{children}</body>
    </html>
  )
}
