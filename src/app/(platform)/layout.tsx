import MainLayout from "@/components/layouts/main-layout";

export default function PlatformPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
    {children}
    </MainLayout>
  )
}