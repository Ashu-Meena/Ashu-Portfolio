import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PenTool, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Ashu Meena",
  description: "Read my latest articles, tutorials, and thoughts on Android Development, AI, and Software Engineering.",
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] font-mono p-8 pt-32 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--magenta)] to-[color:var(--accent)] mb-4 flex items-center gap-4">
            <PenTool className="w-10 h-10 text-[color:var(--magenta)]" />
            System Logs
          </h1>
          <p className="text-[color:var(--muted-foreground)] text-lg border-l-4 border-[color:var(--accent)] pl-4">
            [ACCESS_GRANTED] &gt; Decoding latest knowledge bases, development logs, and technical insights.
          </p>
        </div>

        <div className="grid gap-8">
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group relative border border-[color:var(--border)] p-6 md:p-8 bg-black hover:border-[color:var(--accent)] transition-all duration-300 flex flex-col"
                style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[color:var(--accent)]/10 group-hover:bg-[color:var(--accent)]/20 transition-colors" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
                
                <div className="flex items-center gap-4 text-[color:var(--muted-foreground)] text-xs uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.created_at).toLocaleDateString()}</span>
                  <span>//</span>
                  <span className="text-[color:var(--magenta)]">SYS.LOG</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[color:var(--accent)] transition-colors">{post.title}</h2>
                
                <p className="text-[color:var(--muted-foreground)] line-clamp-3 mb-6">
                  {post.content.replace(/[#*`_\[\]()]/g, '').substring(0, 200)}...
                </p>

                <div className="mt-auto flex items-center text-[color:var(--accent)] font-bold text-sm uppercase tracking-widest gap-2">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))
          ) : (
            <div className="border border-[color:var(--border)] p-12 text-center text-[color:var(--muted-foreground)] uppercase tracking-widest bg-black" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}>
              No transmission logs found in the database. Check back later.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
