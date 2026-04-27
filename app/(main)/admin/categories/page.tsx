import { AdminCategoryManager } from '@/components/admin/AdminCategoryManager'
import { PageLayout } from '@/components/container'

export const metadata = {
  title: '카테고리 관리 | 구해요',
  description: '사이드바 카테고리를 등록하고 미리보는 어드민 페이지',
}

export default function AdminCategoriesPage() {
  return (
    <PageLayout>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold tracking-wide text-zinc-500">ADMIN</p>
        <h1 className="text-2xl font-bold text-zinc-100">카테고리 관리</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          사이드바에 노출할 하위 카테고리를 등록하고 현재 메뉴 구성을 확인합니다.
        </p>
      </div>

      <AdminCategoryManager />
    </PageLayout>
  )
}
