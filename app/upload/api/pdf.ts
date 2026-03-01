import { extractText, getDocumentProxy } from "unpdf";

export async function extractTextFromBuffer(buffer: ArrayBuffer){
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    return text; 
}

export async function extractTextFromURL(url: string) {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return text 
}