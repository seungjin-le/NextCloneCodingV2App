import { NAV_TREE, PRIMARY_LABELS, SIDEBAR_SECTIONS, type NavCategory } from './nav'
import { categoryRegistrationSchema, type CategoryRegistrationFormValues } from './validations'
import { z } from 'zod'

export const CUSTOM_SIDEBAR_CATEGORIES_COOKIE_NAME = 'guheyo_sidebar_categories'
export const CUSTOM_SIDEBAR_CATEGORIES_CHANGED_EVENT = 'guheyo:sidebar-categories-changed'

export type CustomSidebarCategory = {
  section: NavCategory
  label: string
  slug: string
  createdAt: string
}

export type SidebarItem = {
  href: string
  label: string
  slug: string
  custom: boolean
}

export type SidebarSection = {
  category: NavCategory
  label: string
  items: SidebarItem[]
}

type RegistrationResult =
  | { ok: true; categories: CustomSidebarCategory[]; category: CustomSidebarCategory }
  | { ok: false; errors: Partial<Record<keyof CategoryRegistrationFormValues, string[]>> }

const storedCategorySchema = categoryRegistrationSchema.extend({
  createdAt: z.string().min(1),
})

function isDuplicate(section: NavCategory, slug: string, categories: CustomSidebarCategory[]) {
  return Boolean(NAV_TREE[section]?.[slug]) || categories.some((category) => category.section === section && category.slug === slug)
}

export function buildSidebarSections(customCategories: CustomSidebarCategory[] = []): SidebarSection[] {
  return SIDEBAR_SECTIONS.map((section) => {
    const staticItems = section.slugs.map((slug) => ({
      href: `/${section.category}/${slug}`,
      label: NAV_TREE[section.category][slug],
      slug,
      custom: false,
    }))

    const customItems = customCategories
      .filter((category) => category.section === section.category)
      .map((category) => ({
        href: `/${category.section}/${category.slug}`,
        label: category.label,
        slug: category.slug,
        custom: true,
      }))

    return {
      category: section.category,
      label: PRIMARY_LABELS[section.category],
      items: [...staticItems, ...customItems],
    }
  })
}

export function registerSidebarCategory(
  currentCategories: CustomSidebarCategory[],
  input: CategoryRegistrationFormValues,
  createdAt = new Date().toISOString()
): RegistrationResult {
  const parsed = categoryRegistrationSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  if (isDuplicate(parsed.data.section, parsed.data.slug, currentCategories)) {
    return { ok: false, errors: { slug: ['이미 등록된 슬러그입니다.'] } }
  }

  const category: CustomSidebarCategory = { ...parsed.data, createdAt }

  return {
    ok: true,
    category,
    categories: [...currentCategories, category],
  }
}

export function parseCustomSidebarCategories(value: string | null): CustomSidebarCategory[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []

    return parsed.reduce<CustomSidebarCategory[]>((categories, item) => {
      const result = storedCategorySchema.safeParse(item)
      if (!result.success || isDuplicate(result.data.section, result.data.slug, categories)) {
        return categories
      }

      categories.push(result.data)
      return categories
    }, [])
  } catch {
    return []
  }
}
