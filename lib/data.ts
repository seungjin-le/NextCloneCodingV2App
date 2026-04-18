export type BusinessFunction = 'sell' | 'buy' | 'swap'

export type MockPost = {
  id: string
  category: string
  slug: string
  businessFunction: BusinessFunction
  author: string
  title: string
  price: string
  time: string
  body: string
  tags: string[]
  thumbnailColor: string
  viewCount: number
  likeCount: number
}

const THUMBNAIL_COLORS = [
  'bg-violet-800',
  'bg-indigo-800',
  'bg-sky-800',
  'bg-teal-800',
  'bg-emerald-800',
  'bg-amber-800',
  'bg-rose-800',
  'bg-slate-700',
]

function color(i: number) {
  return THUMBNAIL_COLORS[i % THUMBNAIL_COLORS.length]
}

export const MOCK_POSTS: MockPost[] = [
  // ── 키보드 / 판매 ──────────────────────────────────────────
  {
    id: 'kb-s-1',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'sell',
    author: 'keeb_lover',
    title: 'Leopold FC750R PD 적축 풀배열 판매합니다',
    price: '₩95,000',
    time: '5분 전',
    body: '2023년 9월 구매, 사용 기간 약 8개월입니다. 직접 사용하다 텐키리스로 변경하여 판매합니다. 키캡 포함이며 상태 매우 양호합니다. 택배비 구매자 부담.',
    tags: ['leopold', 'fc750r', '적축', '풀배열'],
    thumbnailColor: color(0),
    viewCount: 142,
    likeCount: 8,
  },
  {
    id: 'kb-s-2',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'sell',
    author: 'MechFan99',
    title: 'HHKB Professional Hybrid Type-S 무각 판매',
    price: '₩320,000',
    time: '23분 전',
    body: '정품 박스 포함, 사용감 거의 없습니다. 정전용량 무접점 방식 특유의 타감 원하시는 분께 추천합니다.',
    tags: ['hhkb', '무접점', '정전용량', '무각'],
    thumbnailColor: color(1),
    viewCount: 287,
    likeCount: 21,
  },
  {
    id: 'kb-s-3',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'sell',
    author: 'SwitchLab',
    title: 'GMK Darling 키캡 세트 GB 배송본',
    price: '₩180,000',
    time: '1시간 전',
    body: 'GB로 구매 후 개봉만 했습니다. 박스·보증서 완비. 보라 계열 배색 예쁩니다.',
    tags: ['gmk', 'darling', '키캡', 'gb'],
    thumbnailColor: color(2),
    viewCount: 94,
    likeCount: 14,
  },
  {
    id: 'kb-s-4',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'sell',
    author: 'clickclack',
    title: 'Keychron Q1 Pro QMK/VIA 지원 알루미늄 TKL',
    price: '₩130,000',
    time: '2시간 전',
    body: '가스킷 마운트 알루미늄 텐키리스. 빨간 스위치 장착 상태이며 교체 가능. 마감 흠집 없음.',
    tags: ['keychron', 'q1pro', 'qmk', 'gasket'],
    thumbnailColor: color(3),
    viewCount: 201,
    likeCount: 17,
  },
  {
    id: 'kb-s-5',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'sell',
    author: 'TypeWriter',
    title: 'Varmilo VA87M 벚꽃 에디션 클리어축',
    price: '₩110,000',
    time: '4시간 전',
    body: '벚꽃 다이 서브 한정판. 클리어축 가볍고 조용합니다. 박스 포함, 개봉 사용품.',
    tags: ['varmilo', '벚꽃', '클리어축', '텐키리스'],
    thumbnailColor: color(4),
    viewCount: 76,
    likeCount: 6,
  },

  // ── 키보드 / 구매 ──────────────────────────────────────────
  {
    id: 'kb-b-1',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'buy',
    author: 'WantKeeb',
    title: 'Topre RealForce R2 구매 원합니다',
    price: '₩200,000 이하',
    time: '10분 전',
    body: '리얼포스 R2 45g 또는 55g 구합니다. 상태 좋은 것 우선, 박스 없어도 무방합니다.',
    tags: ['realforce', 'topre', 'r2', '무접점'],
    thumbnailColor: color(5),
    viewCount: 55,
    likeCount: 3,
  },
  {
    id: 'kb-b-2',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'buy',
    author: 'PinkKeycap',
    title: 'KAT Milkshake 키캡 핑크 모디 구합니다',
    price: '제안',
    time: '45분 전',
    body: 'KAT Milkshake 핑크 모디파이어 세트 또는 키캡 전체 구매 원합니다. 합리적 가격에 양도 부탁드립니다.',
    tags: ['kat', 'milkshake', '핑크', '키캡'],
    thumbnailColor: color(6),
    viewCount: 41,
    likeCount: 2,
  },
  {
    id: 'kb-b-3',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'buy',
    author: 'SilentTyper',
    title: 'Boba U4 스위치 90개 이상 구합니다',
    price: '₩40,000 이하',
    time: '2시간 전',
    body: '무소음 택타일 Boba U4 구합니다. 개봉 미사용 우선, 핀 휨 없는 것.',
    tags: ['boba', 'u4', '무소음', '택타일'],
    thumbnailColor: color(7),
    viewCount: 33,
    likeCount: 1,
  },

  // ── 키보드 / 교환 ──────────────────────────────────────────
  {
    id: 'kb-sw-1',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'swap',
    author: 'TradeKing',
    title: 'FC660M 적축 ↔ FC660M 청축 교환',
    price: '1:1',
    time: '30분 전',
    body: 'FC660M 적축 보유 중. 청축으로 교환 희망합니다. 둘 다 박스 포함 미개봉 수준.',
    tags: ['leopold', 'fc660m', '적축', '청축'],
    thumbnailColor: color(0),
    viewCount: 29,
    likeCount: 4,
  },
  {
    id: 'kb-sw-2',
    category: 'group',
    slug: 'keyboard',
    businessFunction: 'swap',
    author: 'SwapMaster',
    title: 'GMK Carbon ↔ GMK Laser 교환합니다',
    price: 'DM',
    time: '3시간 전',
    body: 'GMK Carbon 보유, GMK Laser 원합니다. 동일 구성 기준 교환. 차액 협의 가능.',
    tags: ['gmk', 'carbon', 'laser', '키캡교환'],
    thumbnailColor: color(1),
    viewCount: 47,
    likeCount: 7,
  },

  // ── 마우스 / 판매 ──────────────────────────────────────────
  {
    id: 'ms-s-1',
    category: 'group',
    slug: 'mouse',
    businessFunction: 'sell',
    author: 'ClickPro',
    title: 'Logitech G Pro X Superlight 2 화이트 판매',
    price: '₩130,000',
    time: '15분 전',
    body: '2개월 사용. 추가 피트, 그립테이프 포함. 센서 완벽 작동. 박스 있음.',
    tags: ['logitech', 'superlight2', '무선', '게이밍'],
    thumbnailColor: color(2),
    viewCount: 315,
    likeCount: 28,
  },
  {
    id: 'ms-s-2',
    category: 'group',
    slug: 'mouse',
    businessFunction: 'sell',
    author: 'MouseHunter',
    title: 'Razer Viper V2 Pro 블랙 거의 새것',
    price: '₩110,000',
    time: '1시간 전',
    body: '한 달 미만 사용. 광 케이블 미포함이나 동봉 USB-C 케이블 있음. 흠집 없음.',
    tags: ['razer', 'viper', 'v2pro', '무선'],
    thumbnailColor: color(3),
    viewCount: 198,
    likeCount: 15,
  },
  {
    id: 'ms-s-3',
    category: 'group',
    slug: 'mouse',
    businessFunction: 'sell',
    author: 'FPS_Ace',
    title: 'Pulsar Xlite V2 Mini 54g 경량 마우스',
    price: '₩55,000',
    time: '5시간 전',
    body: '초경량 유선 마우스. 에임 랩 연습용으로 구매했다 손이 커서 판매합니다.',
    tags: ['pulsar', 'xlite', '경량', '유선'],
    thumbnailColor: color(4),
    viewCount: 87,
    likeCount: 5,
  },

  // ── 마우스 / 구매 ──────────────────────────────────────────
  {
    id: 'ms-b-1',
    category: 'group',
    slug: 'mouse',
    businessFunction: 'buy',
    author: 'GripGuru',
    title: 'Finalmouse Starlight-12 구매 원합니다',
    price: '협의',
    time: '8분 전',
    body: '파이널마우스 스타라이트 12 Small/Medium 구합니다. 상태 양호한 것 DM 주세요.',
    tags: ['finalmouse', 'starlight12', '마그네슘', '경량'],
    thumbnailColor: color(5),
    viewCount: 124,
    likeCount: 9,
  },

  // ── 마우스 / 교환 ──────────────────────────────────────────
  {
    id: 'ms-sw-1',
    category: 'group',
    slug: 'mouse',
    businessFunction: 'swap',
    author: 'SensorSwap',
    title: 'G Pro X Superlight ↔ Viper V2 Pro 교환',
    price: '차액협의',
    time: '2시간 전',
    body: 'Superlight 블랙 보유, Viper V2 Pro 화이트로 교환 희망. 상태 동급이면 1:1.',
    tags: ['logitech', 'razer', '마우스교환'],
    thumbnailColor: color(6),
    viewCount: 63,
    likeCount: 5,
  },

  // ── 음향기기 / 판매 ──────────────────────────────────────────
  {
    id: 'au-s-1',
    category: 'group',
    slug: 'audio',
    businessFunction: 'sell',
    author: 'AudioPhile',
    title: 'Sennheiser HD 600 6개월 사용 판매',
    price: '₩260,000',
    time: '20분 전',
    body: '클래식한 오픈형 헤드폰. 임피던스 300Ω, 앰프 필요합니다. 패드 새것으로 교체 완료. 박스 있음.',
    tags: ['sennheiser', 'hd600', '오픈형', '헤드폰'],
    thumbnailColor: color(7),
    viewCount: 176,
    likeCount: 22,
  },
  {
    id: 'au-s-2',
    category: 'group',
    slug: 'audio',
    businessFunction: 'sell',
    author: 'DACman',
    title: 'Topping DX3 Pro+ DAC/AMP 일체형 판매',
    price: '₩110,000',
    time: '3시간 전',
    body: '블랙 색상. ES9038Q2M DAC 칩 탑재. PC 직결 USB로 사용하다 업그레이드하여 판매. 흠집 없음.',
    tags: ['topping', 'dx3pro', 'dac', 'amp'],
    thumbnailColor: color(0),
    viewCount: 98,
    likeCount: 11,
  },

  // ── 음향기기 / 구매 ──────────────────────────────────────────
  {
    id: 'au-b-1',
    category: 'group',
    slug: 'audio',
    businessFunction: 'buy',
    author: 'IEMseeker',
    title: '7Hz Timeless AE IEM 구합니다',
    price: '₩120,000 이하',
    time: '35분 전',
    body: '평판형 IEM 구합니다. 상태 양호하면 박스 없어도 무방. 케이블 포함 희망.',
    tags: ['7hz', 'timeless', '평판형', 'iem'],
    thumbnailColor: color(1),
    viewCount: 67,
    likeCount: 4,
  },

  // ── 음향기기 / 교환 ──────────────────────────────────────────
  {
    id: 'au-sw-1',
    category: 'group',
    slug: 'audio',
    businessFunction: 'swap',
    author: 'IEMtrader',
    title: 'Moondrop Blessing 3 ↔ Truthear Hexa 교환',
    price: 'DM',
    time: '6시간 전',
    body: 'Blessing 3 보유 중. Hexa 또는 비슷한 가격대 IEM 교환 희망합니다.',
    tags: ['moondrop', 'blessing3', 'truthear', 'hexa'],
    thumbnailColor: color(2),
    viewCount: 54,
    likeCount: 6,
  },

  // ── 장터/거래 / 판매 ──────────────────────────────────────────
  {
    id: 'tr-s-1',
    category: 'market',
    slug: 'trade',
    businessFunction: 'sell',
    author: 'GearSeller',
    title: '키보드 + 마우스 패드 일괄 판매 (급처)',
    price: '₩150,000',
    time: '7분 전',
    body: 'FC750R + Artisan Ninja FX 패드 세트. 각각 따로 팔기 귀찮아서 일괄 판매합니다. 면피 없음.',
    tags: ['일괄', '키보드', '마우스패드', '급처'],
    thumbnailColor: color(3),
    viewCount: 221,
    likeCount: 18,
  },
  {
    id: 'tr-s-2',
    category: 'market',
    slug: 'trade',
    businessFunction: 'sell',
    author: 'DeskSetup',
    title: 'IKEA ALEX 서랍장 + 모니터 암 세트 판매',
    price: '₩80,000',
    time: '40분 전',
    body: '사무실 이전으로 처분합니다. 직거래 서울 강남구. 무게 때문에 택배 불가.',
    tags: ['ikea', 'alex', '모니터암', '직거래'],
    thumbnailColor: color(4),
    viewCount: 133,
    likeCount: 7,
  },

  // ── 장터/거래 / 구매 ──────────────────────────────────────────
  {
    id: 'tr-b-1',
    category: 'market',
    slug: 'trade',
    businessFunction: 'buy',
    author: 'SetupBuilder',
    title: '고급 마우스 패드 L사이즈 구합니다',
    price: '₩30,000 이하',
    time: '18분 전',
    body: 'Artisan, Pulsar, Xtrfy 등 브랜드 L사이즈 마우스 패드 구합니다. 상태 좋으면 연락주세요.',
    tags: ['마우스패드', 'artisan', 'pulsar', 'l사이즈'],
    thumbnailColor: color(5),
    viewCount: 45,
    likeCount: 2,
  },

  // ── 장터/경매 ──────────────────────────────────────────
  {
    id: 'au-a-1',
    category: 'market',
    slug: 'auction',
    businessFunction: 'sell',
    author: 'AuctionPro',
    title: '[경매] Topclack Tukey 커스텀 키보드',
    price: '시작가 ₩500,000',
    time: '1시간 전',
    body: '희귀 커스텀 키보드 경매 진행합니다. 48시간 진행, 최고가 낙찰. Lubed Boba U4T 장착.',
    tags: ['경매', '커스텀', 'tukey', '희귀'],
    thumbnailColor: color(6),
    viewCount: 489,
    likeCount: 42,
  },

  // ── 장터/공동구매 ──────────────────────────────────────────
  {
    id: 'gb-1',
    category: 'market',
    slug: 'group-buy',
    businessFunction: 'buy',
    author: 'GBmaster',
    title: '[공구] GMK Metaverse R2 - 마감 D-3',
    price: '₩110,000~',
    time: '2시간 전',
    body: '국내 공구 진행 중. 기본 키트 110,000원, 노블 / 스페이스바 추가 선택. 해외 GB와 동일 물량.',
    tags: ['gmk', 'metaverse', '공동구매', 'gb'],
    thumbnailColor: color(7),
    viewCount: 602,
    likeCount: 57,
  },

  // ── 커뮤니티/거래후기 ──────────────────────────────────────────
  {
    id: 'rv-1',
    category: 'community',
    slug: 'reviews',
    businessFunction: 'sell',
    author: 'HappyBuyer',
    title: 'keeb_lover님과 HHKB 거래 후기',
    price: '완료',
    time: '어제',
    body: '포장도 꼼꼼하게 해주시고 상태도 설명 그대로였습니다. 흠잡을 데가 없는 거래였습니다. 적극 추천!',
    tags: ['거래후기', 'hhkb', '좋은거래'],
    thumbnailColor: color(0),
    viewCount: 38,
    likeCount: 12,
  },

  // ── 커뮤니티/게시판 ──────────────────────────────────────────
  {
    id: 'bd-1',
    category: 'community',
    slug: 'board',
    businessFunction: 'sell',
    author: 'KeyboardNerd',
    title: '입문자를 위한 스위치 종류 총정리',
    price: '정보글',
    time: '3일 전',
    body: '리니어, 택타일, 클리키의 차이와 대표 스위치 비교표를 정리했습니다. 처음 키보드 구입하시는 분들께 도움이 되길 바랍니다.',
    tags: ['정보', '스위치', '입문', '가이드'],
    thumbnailColor: color(1),
    viewCount: 1240,
    likeCount: 98,
  },
]

export function getPostById(id: string): MockPost | undefined {
  return MOCK_POSTS.find((p) => p.id === id)
}

export function getPostsByCategory(category: string, slug: string): MockPost[] {
  return MOCK_POSTS.filter((p) => p.category === category && p.slug === slug)
}

export function getPostsByBusinessFunction(businessFunction: BusinessFunction): MockPost[] {
  return MOCK_POSTS.filter((p) => p.businessFunction === businessFunction)
}

export function getLatestPosts(businessFunction: BusinessFunction, limit = 4): MockPost[] {
  return MOCK_POSTS.filter((p) => p.businessFunction === businessFunction).slice(0, limit)
}

export function getSimilarPosts(post: MockPost, limit = 3): MockPost[] {
  return MOCK_POSTS.filter((p) => p.id !== post.id && p.slug === post.slug && p.businessFunction === post.businessFunction).slice(0, limit)
}
