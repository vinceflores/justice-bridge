"use server";

import { processText } from "@/app/upload/api/ai";
import { extractTextFromBuffer } from "@/app/upload/api/pdf";

export async function submitPDF(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (file === null) {
    return null;
  }
  const buffer = await file.arrayBuffer();
  const text = await extractTextFromBuffer(buffer);
  return await processText(text);
}
