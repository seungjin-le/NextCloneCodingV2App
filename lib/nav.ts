/** 사이드바 표시 순서 (1차 → 2차 슬러그 목록) */
export const SIDEBAR_SECTIONS = [
  { category: 'group' as const, slugs: ['keyboard', 'mouse', 'audio'] as const },
  { category: 'market' as const, slugs: ['auction', 'trade', 'group-buy'] as const },
  { category: 'community' as const, slugs: ['reviews', 'members', 'report', 'board'] as const }
]

/** 1차 카테고리 → 2차 슬러그 → 화면 제목 */
export const NAV_TREE: Record<string, Record<string, string>> = {
  group: {
    keyboard: '키보드',
    mouse: '마우스',
    audio: '음향기기'
  },
  market: {
    auction: '경매',
    trade: '거래',
    'group-buy': '공동구매'
  },
  community: {
    reviews: '거래 후기',
    members: '멤버',
    report: '신고',
    board: '게시판'
  }
} as const

export const PRIMARY_LABELS: Record<string, string> = {
  group: '그룹',
  market: '장터',
  community: '커뮤니티'
}

export type NavCategory = keyof typeof NAV_TREE

export function getNavPageLabel(category: string, slug: string): { primary: string; secondary: string } | null {
  const primary = PRIMARY_LABELS[category]
  const secondary = NAV_TREE[category]?.[slug]
  if (!primary || !secondary) {
    return null
  }
  return { primary, secondary }
}

export function isValidNavPath(category: string, slug: string): boolean {
  return Boolean(NAV_TREE[category]?.[slug])
}
