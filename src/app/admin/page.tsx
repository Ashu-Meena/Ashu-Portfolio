import { getPortfolioData } from "@/lib/data";
import { AdminDashboard } from "@/components/admin-dashboard";
import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const data = await getPortfolioData();
  const { data: blogPosts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  
  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <AdminDashboard initialData={data} initialBlogs={blogPosts || []} />
    </main>
  );
}
