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
