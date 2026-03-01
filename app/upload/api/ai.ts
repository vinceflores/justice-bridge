"use server";
import { SummarySchema } from "@/app/types";
import { generateText, Output } from "ai";

export async function processText(text: string) {
  const prompt = `
    Analyze the following U.S. criminal legal document.

Extract and explain only what is clearly stated in the text.

Return JSON with this exact structure:

{
  "summary": string,
  "document_type": string | null,
  "charges": string[] | null,
  "obligations": [
    {
      "obligation": string,
      "consequence_if_violated": string | null
    }
  ] | null,
  "violation_risks": [
    {
      "clause": string,
      "explanation": string,
      "severity": "low" | "moderate" | "high"
    }
  ] | null,
  "deadlines": [
    {
      "description": string,
      "date": string | null
    }
  ] | null,
  "financial_penalties": [
    {
      "type": string,
      "amount": string | null
    }
  ] | null,
  "lawyer_questions": string[]
}

Instructions:

1. SUMMARY:
Write a clear 3–5 paragraph explanation in plain English describing what this document does and what it means.

2. DOCUMENT TYPE:
Identify whether this appears to be:
- Plea Agreement
- Sentencing Order
- Probation Terms
- Parole Conditions
- Bail Order
- Unknown

3. CHARGES:
List any criminal charges explicitly mentioned.

4. OBLIGATIONS:
List clear required actions such as:
- Reporting requirements
- Travel restrictions
- Payment obligations
- Court appearances
- Supervision terms

Only include obligations clearly written in the document.

5. VIOLATION RISKS:
Identify clauses that describe penalties for noncompliance.
Assign severity:
- high → incarceration or major penalty
- moderate → fines or supervision escalation
- low → administrative consequence

6. DEADLINES:
Extract any specific dates or time-based requirements.

7. FINANCIAL PENALTIES:
Extract fines, restitution, fees, or other monetary penalties.

8. LAWYER QUESTIONS:
Generate 5–8 neutral clarification questions that someone could ask their lawyer about this document.
Do not suggest legal strategies.

If a section does not appear in the document, return null for that section.

Here is the document:
 ${text}
    `;
  const { output } = await generateText({
    model: "openai/gpt-5.2",
    output: Output.object({
      schema: SummarySchema,
    }),
    prompt,
  });
  return output;
}
