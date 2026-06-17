"use server";

import { getPortfolioData, savePortfolioData, PortfolioData } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

export async function updatePortfolioData(newData: PortfolioData, password?: string) {
  if (password !== "20112004") {
    return { success: false, error: "Unauthorized. Incorrect password." };
  }

  try {
    await savePortfolioData(newData);
    // Revalidate the home page so it immediately shows the new data
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update portfolio data:", error);
    return { success: false, error: "Failed to update" };
  }
}

export async function uploadResume(formData: FormData, password?: string) {
  if (password !== "20112004") {
    return { success: false, error: "Unauthorized. Incorrect password." };
  }

  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Supabase Storage using Admin Client
    const { error } = await supabaseAdmin.storage
      .from('portfolio_assets')
      .upload('resume.pdf', buffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }
    
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function createOrUpdateBlogPost(post: { id?: string, title: string, slug: string, content: string, published: boolean }, password?: string) {
  if (password !== "20112004") {
    return { success: false, error: "Unauthorized. Incorrect password." };
  }

  try {
    if (post.id) {
      const { error } = await supabaseAdmin.from('blog_posts').update({
        title: post.title,
        slug: post.slug,
        content: post.content,
        published: post.published
      }).eq('id', post.id);
      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin.from('blog_posts').insert({
        title: post.title,
        slug: post.slug,
        content: post.content,
        published: post.published
      });
      if (error) throw error;
    }
    
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save blog post:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBlogPost(id: string, password?: string) {
  if (password !== "20112004") {
    return { success: false, error: "Unauthorized. Incorrect password." };
  }

  try {
    const { error } = await supabaseAdmin.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
    
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete blog post:", error);
    return { success: false, error: error.message };
  }
}
