"use client";

import { type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteContentTransition({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;

  return (
    <div key={routeKey} className={className}>
      {children}
    </div>
  );
}
