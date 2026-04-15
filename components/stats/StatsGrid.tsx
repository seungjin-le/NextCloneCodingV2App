import { StatCard } from './StatCard'

const UserIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
)

const ChartIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
)

const ExitIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
  </svg>
)

const statsData = [
  {
    icon: <UserIcon />,
    label: 'DAU',
    value: 15514,
    changePercent: -4.8,
    description: '일간 활성 사용자',
    trendData: [10, 12, 11, 14, 13, 12, 11],
  },
  {
    icon: <UserIcon />,
    label: 'WAU',
    value: 66468,
    changePercent: 6.6,
    description: '주간 활성 사용자',
    trendData: [8, 9, 7, 10, 12, 14, 13],
  },
  {
    icon: <UserIcon />,
    label: 'MAU',
    value: 139738,
    changePercent: 9.4,
    description: '월간 활성 사용자',
    trendData: [5, 6, 8, 9, 10, 11, 12],
  },
  {
    icon: <TrendingUpIcon />,
    label: '신규 유저',
    value: 329,
    changePercent: 16.4,
    description: '오늘 가입',
    trendData: [3, 5, 4, 6, 7, 6, 8],
  },
  {
    icon: <ChartIcon />,
    label: '활성 유저 비율',
    value: '2.7%',
    description: 'DAU / 총 회원 (566,076)',
    trendData: [2.1, 2.3, 2.5, 2.4, 2.6, 2.7, 2.7],
  },
  {
    icon: <ExitIcon />,
    label: '탈퇴율',
    value: '0.02%',
    changePercent: -3.1,
    description: '오늘 탈퇴 121명',
    trendData: [0.03, 0.025, 0.022, 0.024, 0.021, 0.02, 0.02],
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsData.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          changePercent={stat.changePercent}
          description={stat.description}
          trendData={stat.trendData}
        />
      ))}
    </div>
  )
}
