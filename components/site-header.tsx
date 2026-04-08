import Image from "next/image";
import Link from "next/link";

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function IconAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-40 w-full">
      <header className="w-full bg-dark-500">
        <div className="relative hidden h-14 items-center justify-between lg:flex">
          <div className="flex h-full w-64 items-center bg-dark-600 pl-7">
            <Link href="/" className="flex shrink-0 items-center justify-center overflow-hidden rounded">
              <Image
                src="/guheyo/guheyo-logo.svg"
                alt="guheyo logo"
                width={32}
                height={32}
                className="size-8 object-cover"
                priority
              />
            </Link>
          </div>
          <div className="absolute left-1/2 flex -translate-x-1/2 transform">
            <button
              type="button"
              aria-label="검색"
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
            >
              <IconSearch className="size-6" />
            </button>
          </div>
          <div className="flex items-center justify-end space-x-2 pr-7">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/5"
              aria-label="글쓰기"
            >
              <IconAdd className="size-7" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-blurple-500 px-2 py-2 text-xs font-bold text-zinc-100 transition hover:bg-blurple-600 md:text-sm"
            >
              <Image
                src="/socials/discord/discord-mark-white.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
              로그인
            </button>
          </div>
        </div>

        <div className="flex h-12 items-center justify-between pl-5 pr-2 lg:hidden">
          <div className="flex flex-row items-center space-x-4">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="text-zinc-200 lg:hidden"
            >
              <IconMenu className="size-6" />
            </button>
            <Link href="/" className="flex shrink-0 items-center justify-center overflow-hidden rounded">
              <Image
                src="/guheyo/guheyo-logo.svg"
                alt="guheyo logo"
                width={32}
                height={32}
                className="size-8 object-cover"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center space-x-0">
            <button
              type="button"
              aria-label="검색"
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-300"
            >
              <IconSearch className="size-6" />
            </button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-300"
              aria-label="글쓰기"
            >
              <IconAdd className="size-7" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-blurple-500 px-2 py-2 text-xs font-bold text-zinc-100 hover:bg-blurple-600"
            >
              <Image
                src="/socials/discord/discord-mark-white.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
              로그인
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
