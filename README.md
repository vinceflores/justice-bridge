## JusticeBridge

## Inspiration
In the U.S. criminal justice system, life-altering decisions are often made using documents that many defendants and their families struggle to understand. Plea agreements, sentencing orders, and probation conditions are written in dense legal language, full of technical terms and high-stakes consequences.

We were inspired by a simple but powerful idea: access to justice should include access to understanding. Even when someone has legal representation, they should still be able to clearly understand the documents that shape their future. JusticeBridge was built to reduce that information gap and empower families with clarity.
## What it does
JusticeBridge is an AI-powered web app that helps incarcerated individuals and their families understand criminal legal documents in plain language.

- Users can upload or paste a plea agreement, sentencing order, or probation document. JusticeBridge then:
- Generates a plain-language summary
- Extracts key obligations
- Identifies violation risks and consequences
- Highlights important deadlines
- Suggests neutral questions to discuss with legal counsel

JusticeBridge does not provide legal advice or predict outcomes. Instead, it helps users better understand what their documents say so they can have more informed conversations with their lawyers.

## How we built it
- Next.js (App Router) for the frontend and server actions
- Vercel AI SDK for structured AI responses and streaming
- shadcn/ui for accessible, clean UI components

## Challenges we ran into
One of the biggest challenges was ensuring responsible AI behavior.
- Legal documents are sensitive and high-stakes. We had to carefully:
- Prevent the AI from giving legal advice
- Avoid predicting case outcomes
- Structure outputs consistently in JSON
- Handle long documents that exceed token limits
Another challenge was designing for clarity. Our target users may be under stress or have lower legal literacy, so the UI had to be simple, readable, and distraction-free.

We also had to balance technical complexity with hackathon time constraints, especially when implementing structured outputs and error handling for messy PDF text. 
## Accomplishments that we're proud of
We’re proud that we built a tool that addresses the UN SGD 16 with not just another summarization tool but a purpose-built for access to justice. Specifically, we’re proud of:
- Creating structured legal breakdowns (not just summaries)
- Building a “Questions to Ask Your Lawyer” feature that empowers without replacing counsel
- Designing the app around ethical safeguards and disclaimers
- Aligning the project directly with UN SDG 16: Peace, Justice, and Strong Institutions
## What we learned
We learned that building civic technology requires more than just writing code — it requires ethical thinking, careful framing, and responsible AI design.
We also learned:
- How to implement structured AI outputs using the Vercel AI SDK
- How to design prompts that minimize hallucination and avoid legal advice
- How to build a clean full-stack app quickly using Next.js and Supabase
- How important UX clarity is when dealing with complex, emotional subject matter

This project strengthened both our technical skills and our understanding of responsible AI in high-stakes domains.
## What's next for JusticeBridge
- Ability to save documents and their summaries for later
- Add multilingual support to serve more families
- Implement reading-level toggles (Grade 6 / Grade 10)
- Improve document comparison (e.g., version changes in plea agreements)
- Add secure, temporary document deletion for enhanced privacy
- Partner with legal aid organizations for real-world feedback

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

#