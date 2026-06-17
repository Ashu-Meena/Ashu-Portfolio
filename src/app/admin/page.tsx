import { getPortfolioData } from "@/lib/data";
import { AdminDashboard } from "@/components/admin-dashboard";

export default async function AdminPage() {
  const data = await getPortfolioData();
  
  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <AdminDashboard initialData={data} />
    </main>
  );
}
