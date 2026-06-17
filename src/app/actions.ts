"use server";

import { getPortfolioData, savePortfolioData, PortfolioData } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function updatePortfolioData(newData: PortfolioData) {
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

export async function uploadResume(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const fs = require("fs");
    const path = require("path");
    const publicPath = path.join(process.cwd(), "public");
    
    // Ensure public dir exists
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }
    
    fs.writeFileSync(path.join(publicPath, "resume.pdf"), buffer);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
