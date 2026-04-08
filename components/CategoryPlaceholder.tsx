import Link from 'next/link'

type CategoryPlaceholderProps = {
  primaryLabel: string
  secondaryLabel: string
}

export function CategoryPlaceholder({ primaryLabel, secondaryLabel }: CategoryPlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-full px-4 py-10 md:px-0">
      <nav className="mb-6 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          홈
        </Link>
        <span className="mx-2">/</span>
        <span>{primaryLabel}</span>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{secondaryLabel}</span>
      </nav>
      <h1 className="text-2xl font-bold text-zinc-100">{secondaryLabel}</h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-500">해당 메뉴는 데모용 플레이스홀더입니다. 목록·필터·게시글 연동은 추후 붙일 수 있습니다.</p>
    </div>
  )
}
