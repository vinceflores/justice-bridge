import { processText } from "@/app/upload/api/ai";
import { extractTextFromURL } from "@/app/upload/api/pdf";
import { NextRequest, NextResponse } from "next/server";

// import { extractText, getDocumentProxy } from "unpdf";

export async function POST(req: NextRequest) {
  const url =
    "https://viamipnnuasasgleehiv.supabase.co/storage/v1/object/public/sample/220398.pdf";
  const text = await extractTextFromURL(url);
  const output = await processText(text)
  
  return NextResponse.json({ output });
}
