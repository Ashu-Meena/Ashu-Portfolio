import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Ashu Meena Blog`,
    description: post.content.replace(/[#*`_\[\]()]/g, '').substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] font-mono p-8 pt-32 pb-32">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[color:var(--accent)] hover:text-white uppercase tracking-widest text-sm font-bold mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Logs
        </Link>

        <article>
          <header className="mb-12 border-b border-[color:var(--border)] pb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[color:var(--muted-foreground)] text-sm uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[color:var(--magenta)]" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[color:var(--magenta)]" />
                Ashu Meena
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-p:text-[color:var(--muted-foreground)] prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-a:text-[color:var(--accent)] hover:prose-a:text-white prose-strong:text-white max-w-none">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
