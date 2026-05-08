import AdminLayout from "@/components/layouts/admin-layout";

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
        {children}
    </AdminLayout>
  );
}