type BusinessFunction = "sell" | "buy" | "swap";

const LABELS: Record<BusinessFunction, { title: string; accent: string }> = {
  sell: { title: "판매", accent: "from-emerald-500/20 to-emerald-500/5" },
  buy: { title: "구매", accent: "from-sky-500/20 to-sky-500/5" },
  swap: { title: "교환", accent: "from-violet-500/20 to-violet-500/5" },
};

type MockPost = {
  id: string;
  author: string;
  title: string;
  price: string;
  time: string;
};

const MOCK: Record<BusinessFunction, MockPost[]> = {
  sell: [
    {
      id: "1",
      author: "TraderA",
      title: "레어 아이템 판매합니다",
      price: "₩12,000",
      time: "방금 전",
    },
    {
      id: "2",
      author: "PixelShop",
      title: "한정 스킨 일괄 정리",
      price: "협의",
      time: "12분 전",
    },
  ],
  buy: [
    {
      id: "1",
      author: "Collector99",
      title: "특정 시리즈 구매 희망",
      price: "₩8,000 이하",
      time: "32분 전",
    },
    {
      id: "2",
      author: "Nova",
      title: "교환 가능한 카드 찾습니다",
      price: "제안",
      time: "1시간 전",
    },
  ],
  swap: [
    {
      id: "1",
      author: "SwapKing",
      title: "동급 아이템 교환만",
      price: "1:1",
      time: "3시간 전",
    },
    {
      id: "2",
      author: "Mint",
      title: "희귀 ↔ 희귀 교환",
      price: "DM",
      time: "어제",
    },
  ],
};

export function FeedSection({ businessFunction }: { businessFunction: BusinessFunction }) {
  const { title, accent } = LABELS[businessFunction];
  const posts = MOCK[businessFunction];

  return (
    <section className="w-full" aria-labelledby={`section-${businessFunction}`}>
      <div
        className={`mb-3 flex items-center justify-between border-b border-zinc-700/60 bg-gradient-to-r ${accent} px-2 py-3 md:rounded-t-lg md:px-4`}
      >
        <h2
          id={`section-${businessFunction}`}
          className="text-base font-bold tracking-tight text-dark-200 md:text-lg"
        >
          {title}
        </h2>
        <span className="text-xs text-zinc-500">더보기</span>
      </div>
      <ul className="flex flex-col gap-2 px-2 md:px-0">
        {posts.map((post) => (
          <li key={post.id}>
            <article className="flex gap-3 rounded-lg border border-zinc-700/50 bg-dark-600/80 p-3 transition hover:border-zinc-600">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-sm font-semibold text-zinc-400">
                {post.author.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="truncate text-sm font-semibold text-zinc-200">
                    {post.title}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span>{post.author}</span>
                  <span className="font-medium text-emerald-400/90">{post.price}</span>
                  <span>{post.time}</span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
