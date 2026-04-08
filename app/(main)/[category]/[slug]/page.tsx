import { notFound } from 'next/navigation'
import { CategoryPlaceholder } from '@/components/CategoryPlaceholder'
import { getNavPageLabel, isValidNavPath } from '@/lib/nav'

type PageProps = {
  params: Promise<{ category: string; slug: string }>
}

export default async function NavCategoryPage({ params }: PageProps) {
  const { category, slug } = await params

  if (!isValidNavPath(category, slug)) {
    notFound()
  }

  const labels = getNavPageLabel(category, slug)
  if (!labels) {
    notFound()
  }

  return (
    <div className="w-full md:mx-auto md:px-10">
      <CategoryPlaceholder primaryLabel={labels.primary} secondaryLabel={labels.secondary} />
    </div>
  )
}
