import { z } from "zod";

export type Summary = {
  summary: string;
  document_type: string;
  charges: string[];
  obligations: {
    obligation: string;
    consequence_if_violated: string | null;
  }[] | null;
  violation_risks: {
    clause: string;
    explanation: string;
    severity: "low" | "moderate" | "high";
  }[] | null;
  deadlines: {
    description: string;
    date: string | null;
  }[] | null;
  financial_penalties:
    | {
        type: string;
        amount: string;
      }[]  | null;
  lawyer_questions: string[] | null;
};

export const SummarySchema = z.object({
  summary: z.string(),

  document_type: z.string(),

  charges: z.array(z.string()),

  obligations: z
    .array(
      z.object({
        obligation: z.string(),
        consequence_if_violated: z.string().nullable(),
      }),
    )
    .nullable(),

  violation_risks: z
    .array(
      z.object({
        clause: z.string(),
        explanation: z.string(),
        severity: z.enum(["low", "moderate", "high"]),
      }),
    )
    .nullable(),

  deadlines: z
    .array(
      z.object({
        description: z.string(),
        date: z.string().nullable(),
      }),
    )
    .nullable(),

  financial_penalties: z
    .array(
      z.object({
        type: z.string(),
        amount: z.string(),
      }),
    )
    .nullable(),
  lawyer_questions: z.array(z.string()).nullable(),
});
