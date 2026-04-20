type Comment = {
  id: string
  author: string
  date: string
  body: string
  initial: string
  avatarColor: string
  replies?: Comment[]
}

const COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'BHXMZGj',
    date: '2025.06.25',
    initial: 'B',
    avatarColor: 'bg-amber-200 text-amber-800',
    body: '이런 걸 거의 구매해야 된다는 것도 있으시다요.',
  },
  {
    id: 'c2',
    author: 'dstdtower_b',
    date: '2025.06.25',
    initial: 'd',
    avatarColor: 'bg-emerald-200 text-emerald-800',
    body: '한번 사용해봐요. 저도 사용했는데 초진 괜찮던지?',
  },
  {
    id: 'c3',
    author: 'master1',
    date: '2025.06.25',
    initial: 'm',
    avatarColor: 'bg-sky-200 text-sky-800',
    body: '감사합니다 :) 저도 이런 선물이 내리 지와서 1주 써보시라고 꿈꿔봐요 😊',
  },
]

const MORE_COMMENTS: Comment[] = [
  {
    id: 'c5',
    author: 'daily_glow',
    date: '2025.06.24',
    initial: 'd',
    avatarColor: 'bg-rose-200 text-rose-800',
    body: '정말 감사해요. 다음주 회사가입이라 부부관용자 이오시네ㅠㅠㅠ 참여하시겠네요.',
    replies: [
      {
        id: 'c5-r1',
        author: '비디개통',
        date: '2025.06.24',
        initial: 'ㅂ',
        avatarColor: 'bg-purple-200 text-purple-800',
        body: '밀하다 확도, 그 위 합쳐요!',
      },
    ],
  },
  {
    id: 'c6',
    author: 'yeppu_user92',
    date: '2025.06.25',
    initial: 'y',
    avatarColor: 'bg-yellow-200 text-yellow-800',
    body: '오늘도 좋은 하루 되세요 :)',
  },
]

const REPORT_REASONS = [
  { label: '가입이/하기 미임 정보', count: 2 },
  { label: '광고/도배성', count: 2 },
  { label: '혐오/자격/특혜성 내용', count: null },
  { label: '부적절한 내용', count: null },
  { label: '기타 사유', count: null },
]

function FlagIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

function EyeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function HeartIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function MessageIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CheckCircleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function TrashIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function MonitorIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function ClipboardIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}

function SettingsIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.14.31.22.65.22 1s-.08.69-.22 1z" />
    </svg>
  )
}

function Avatar({ initial, color, size = 'size-8' }: { initial: string; color: string; size?: string }) {
  return (
    <div className={`${size} ${color} flex shrink-0 items-center justify-center rounded-full text-xs font-bold`}>
      {initial}
    </div>
  )
}

function CommentItem({ comment, indent = false }: { comment: Comment; indent?: boolean }) {
  return (
    <div className={indent ? 'ml-10' : ''}>
      <div className="flex gap-3 py-3">
        <Avatar initial={comment.initial} color={comment.avatarColor} />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-zinc-800">{comment.author}</span>
            <span className="text-[11px] text-zinc-400">{comment.date}</span>
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-700">{comment.body}</p>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-zinc-500">
            <button type="button" className="hover:text-zinc-700">↳ 답글 달기</button>
            <button type="button" className="hover:text-zinc-700">♡ 공감</button>
          </div>
        </div>
        <span className="shrink-0 text-[11px] text-zinc-400">답글 0 · 공감 0</span>
      </div>
      {comment.replies?.map((r) => <CommentItem key={r.id} comment={r} indent />)}
    </div>
  )
}

function ReportedCommentItem() {
  return (
    <div className="-mx-5 my-2 border-y border-rose-200 bg-rose-50/80 px-5 py-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-1 font-semibold text-white">
          <FlagIcon className="size-3" />
          신고 7회
        </span>
        <span className="rounded-full bg-white px-2 py-1 text-rose-600 ring-1 ring-rose-200">가입이/하기 미임 정보</span>
        <span className="rounded-full bg-white px-2 py-1 text-rose-600 ring-1 ring-rose-200">광고/도배성</span>
        <span className="rounded-full bg-white px-2 py-1 text-rose-600 ring-1 ring-rose-200">혐오/자격/특혜성 내용</span>
      </div>
      <div className="flex gap-3">
        <Avatar initial="u" color="bg-rose-200 text-rose-800" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-rose-600">user_kimhyun</span>
            <span className="text-[11px] text-zinc-400">2025.06.25</span>
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-700">
            이런 내용은 이제 많이 쓰지 말자 이런 기점부터 이야기가 나오고 글이 내는 거 아닌가요?
          </p>

          <div className="mt-3 rounded-md border border-rose-200 bg-white/70 p-3">
            <p className="mb-2 text-[11px] font-semibold text-rose-600">🚨 신고된 내용</p>
            <ol className="space-y-1 text-[12px] text-zinc-700">
              <li className="flex items-center justify-between">
                <span><span className="mr-2 font-semibold text-rose-500">1.</span>&ldquo;이런 기점 같은 이야기&rdquo; 관련</span>
                <span className="text-[11px] text-zinc-500">× 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span><span className="mr-2 font-semibold text-rose-500">2.</span>&ldquo;배민대학&rdquo; 관련</span>
                <span className="text-[11px] text-zinc-500">× 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span><span className="mr-2 font-semibold text-rose-500">3.</span>&ldquo;거래뉴가 아이니티&rdquo; 관련</span>
                <span className="text-[11px] text-zinc-500">× 2</span>
              </li>
              <li className="flex items-center justify-between">
                <span><span className="mr-2 font-semibold text-rose-500">4.</span>&ldquo;노골이다 글로&rdquo; 관련</span>
                <span className="text-[11px] text-zinc-500">× 1</span>
              </li>
              <li className="flex items-center justify-between">
                <span><span className="mr-2 font-semibold text-rose-500">5.</span>&ldquo;그마기이다&rdquo; 관련</span>
                <span className="text-[11px] text-zinc-500">× 1</span>
              </li>
            </ol>
          </div>

          <div className="mt-2 flex items-center gap-3 text-[11px] text-zinc-500">
            <button type="button" className="hover:text-zinc-700">↳ 답글 달기</button>
            <button type="button" className="hover:text-zinc-700">♡ 공감</button>
          </div>
        </div>
        <span className="shrink-0 text-[11px] text-zinc-400">답글 0 · 공감 0</span>
      </div>
    </div>
  )
}

function PostCard() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white">
      <div className="border-b border-zinc-100 px-5 py-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h1 className="text-[15px] font-semibold text-zinc-800">[에이키] 이번 주 추천 팀 베이커리를 확인 5가지</h1>
          <div className="flex shrink-0 items-center gap-3 text-[11px] text-zinc-400">
            <span className="inline-flex items-center gap-1"><EyeIcon className="size-3" /> 1,204</span>
            <span className="inline-flex items-center gap-1"><MessageIcon className="size-3" /> 5</span>
            <span className="inline-flex items-center gap-1 text-rose-500"><FlagIcon className="size-3" /> 15</span>
          </div>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <Avatar initial="m" color="bg-sky-200 text-sky-800" size="size-6" />
          <span className="text-[12px] font-semibold text-zinc-700">master1</span>
          <span className="text-[11px] text-zinc-400">2025.06.25</span>
        </div>
        <p className="text-[13px] leading-relaxed text-zinc-600">
          제가하가 직접 선정한 이번 주 팀 베이커리를 리스트 소개합니다. 각 제품은 실제 시식 후 기준에 맞춰지로 선정되었으며, 마음 돌릴 수지 못한 상태를 함께 안내드릴게요.
        </p>
      </div>
    </section>
  )
}

function CommentsCard() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3">
        <MessageIcon className="size-4 text-zinc-500" />
        <span className="text-[13px] font-semibold text-zinc-700">댓글 관리</span>
        <span className="text-[12px] text-zinc-400">5</span>
      </header>
      <div className="px-5 py-2">
        {COMMENTS.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
        <ReportedCommentItem />
        {MORE_COMMENTS.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </section>
  )
}

function ReportInfoCard() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
        <FlagIcon className="size-4 text-rose-500" />
        <span className="text-[13px] font-semibold text-zinc-800">신고 정보</span>
      </header>
      <dl className="divide-y divide-zinc-100 px-4 text-[12px]">
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-zinc-500">유형</dt>
          <dd className="font-medium text-zinc-700">댓글</dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-zinc-500">작성자</dt>
          <dd className="font-medium text-rose-600">user_kimhyun</dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-zinc-500">신고 횟수</dt>
          <dd className="font-semibold text-rose-600">7회</dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-zinc-500">처음 신고</dt>
          <dd className="font-medium text-zinc-700">2025.06.24 14:00</dd>
        </div>
      </dl>
      <div className="border-t border-zinc-100 px-4 py-3">
        <p className="mb-2 text-[11px] font-medium text-zinc-500">신고 사유 (중복)</p>
        <div className="flex flex-wrap gap-1.5">
          {REPORT_REASONS.map((r) => (
            <span
              key={r.label}
              className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-600 ring-1 ring-rose-100"
            >
              {r.label}
              {r.count !== null && <span className="text-rose-500">× {r.count}</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatusOption({
  icon,
  label,
  desc,
  checked = false,
  accent,
}: {
  icon: React.ReactNode
  label: string
  desc: string
  checked?: boolean
  accent: string
}) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 transition ${checked ? 'border-emerald-200 bg-emerald-50/50' : 'border-zinc-200 bg-white hover:bg-zinc-50'}`}>
      <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${accent}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-semibold text-zinc-800">{label}</span>
        <span className="block text-[11px] text-zinc-500">{desc}</span>
      </span>
      <span
        className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${checked ? 'border-emerald-500' : 'border-zinc-300'}`}
      >
        {checked && <span className="size-1.5 rounded-full bg-emerald-500" />}
      </span>
    </label>
  )
}

function StatusChangeCard() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
        <SettingsIcon className="size-4 text-zinc-500" />
        <span className="text-[13px] font-semibold text-zinc-800">상태 변경</span>
      </header>
      <div className="px-4 py-3">
        <p className="mb-2 text-[11px] font-medium text-zinc-500">현재 상태</p>
        <div className="mb-3 flex items-center gap-2 rounded-md border border-rose-100 bg-rose-50 px-3 py-2">
          <FlagIcon className="size-3.5 text-rose-500" />
          <span className="text-[12px] font-semibold text-rose-600">현재 상태: 승인</span>
        </div>
        <div className="flex flex-col gap-2">
          <StatusOption
            icon={<CheckCircleIcon className="size-4 text-emerald-600" />}
            label="승인"
            desc="검토 후 노출 처리"
            accent="bg-emerald-100"
          />
          <StatusOption
            icon={<TrashIcon className="size-4 text-rose-600" />}
            label="삭제"
            desc="영구 삭제 (복구 불가)"
            accent="bg-rose-100"
          />
          <StatusOption
            icon={<MonitorIcon className="size-4 text-amber-600" />}
            label="모니터링"
            desc="노출 유지 / 지속 관찰"
            accent="bg-amber-100"
          />
          <StatusOption
            icon={<CheckCircleIcon className="size-4 text-emerald-600" />}
            label="상태없음"
            desc="정상 댓글로 복귀"
            checked
            accent="bg-emerald-100"
          />
        </div>
        <p className="mt-3 mb-2 text-[11px] font-medium text-zinc-500">처리 메모</p>
        <textarea
          rows={3}
          placeholder="처리 사유를 입력하세요. (히스토리에 기록됩니다)"
          className="w-full resize-none rounded-md border border-zinc-200 bg-white px-3 py-2 text-[12px] text-zinc-700 placeholder:text-zinc-400 focus:border-blurple-500 focus:outline-none"
        />
        <button
          type="button"
          className="mt-3 w-full rounded-md bg-blurple-500 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blurple-600"
        >
          상태 적용
        </button>
      </div>
    </section>
  )
}

const HISTORY = [
  {
    id: 'h1',
    title: '자동 승인 처리',
    desc: '신고 5회 초과 자동 처리',
    meta: '2025.06.24 14:00 · 시스템',
    dot: 'bg-rose-500',
  },
  {
    id: 'h2',
    title: '추가 신고 접수',
    desc: '총 7회 누적',
    meta: '2025.06.24 14:23 · 시스템',
    dot: 'bg-sky-500',
  },
]

function HistoryCard() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
        <ClipboardIcon className="size-4 text-zinc-500" />
        <span className="text-[13px] font-semibold text-zinc-800">처리 히스토리</span>
      </header>
      <ul className="space-y-3 px-4 py-3">
        {HISTORY.map((h) => (
          <li key={h.id} className="flex gap-2">
            <span className={`mt-1 size-2 shrink-0 rounded-full ${h.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-zinc-800">{h.title}</p>
              <p className="text-[11px] text-zinc-500">{h.desc}</p>
              <p className="text-[11px] text-zinc-400">{h.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ReportReview() {
  return (
    <div className="bg-zinc-100 px-4 py-6 text-zinc-800 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-w-0 flex-col gap-4">
          <PostCard />
          <CommentsCard />
        </div>
        <aside className="flex flex-col gap-4">
          <ReportInfoCard />
          <StatusChangeCard />
          <HistoryCard />
        </aside>
      </div>
    </div>
  )
}
