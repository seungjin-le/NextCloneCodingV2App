"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_TREE, PRIMARY_LABELS, SIDEBAR_SECTIONS } from "@/lib/nav";

function homeLinkClass(active: boolean) {
  return [
    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition",
    active
      ? "bg-white/10 text-zinc-100"
      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
  ].join(" ");
}

function subLinkClass(active: boolean) {
  return [
    "flex items-center rounded-lg py-1.5 pl-4 pr-3 text-sm font-medium transition",
    active
      ? "bg-white/10 text-zinc-100"
      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
  ].join(" ");
}

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="메뉴 닫기"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-700/50 bg-dark-600 transition-transform duration-200 ease-out",
          "lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:overflow-y-auto lg:self-start lg:flex-shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
        aria-label="사이드 메뉴"
      >
        <div className="flex items-center gap-3 border-b border-zinc-700/50 px-4 py-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-lg outline-none ring-blurple-500 focus-visible:ring-2"
            onClick={() => onMobileClose()}
          >
            <Image
              src="/guheyo/guheyo-logo.svg"
              alt=""
              width={36}
              height={36}
              className="size-9 object-cover"
            />
            <span className="text-lg font-bold tracking-tight text-zinc-100">구해요</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-4 p-3">
          <Link
            href="/"
            className={homeLinkClass(pathname === "/")}
            onClick={() => onMobileClose()}
          >
            홈
          </Link>

          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.category}>
              <div
                className="mb-1.5 px-3 text-xs font-semibold tracking-wide text-zinc-500"
                aria-hidden
              >
                {PRIMARY_LABELS[section.category]}
              </div>
              <ul className="flex flex-col gap-0.5">
                {section.slugs.map((slug) => {
                  const label = NAV_TREE[section.category][slug];
                  const href = `/${section.category}/${slug}`;
                  const active = pathname === href;

                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={subLinkClass(active)}
                        onClick={() => onMobileClose()}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-zinc-700/50 p-3">
          <p className="px-3 text-xs leading-relaxed text-zinc-500">
            거래 게시판 데모 UI입니다. 실제 서비스와 무관합니다.
          </p>
        </div>
      </aside>
    </>
  );
}
