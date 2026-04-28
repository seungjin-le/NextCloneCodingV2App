import { AppShell } from "@/components/AppShell";
import { getCustomSidebarCategoriesFromCookie } from "@/lib/adminCategoryServer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCustomSidebarCategories = await getCustomSidebarCategoriesFromCookie();

  return (
    <AppShell initialCustomSidebarCategories={initialCustomSidebarCategories}>
      {children}
    </AppShell>
  );
}
