import { FeedSection } from '@/components/FeedSection'


export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q?.trim() ?? ''

  return (
    <div className="w-full p-10 md:mx-auto">
      <div className="mb-12 flex min-h-screen flex-col gap-0 md:gap-8">
  
        <FeedSection businessFunction="sell" filterQuery={q} />
        <FeedSection businessFunction="buy" filterQuery={q} />
        <FeedSection businessFunction="swap" filterQuery={q} />
        <footer className="px-2 pt-6 pb-8 text-center text-xs text-zinc-600 md:px-0">데모 UI · 실제 거래·로그인은 원본 서비스와 연결되지 않습니다.</footer>
      </div>
    </div>
  )
}
