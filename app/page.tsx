"use client"

import { Summary } from "@/app/types";
import { submitPDF } from "@/app/upload/action";
import { DocSummary } from "@/components/doc-summary";
import { PDFDropzone } from "@/components/pdfdropzone";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";

const sample: Summary = {
  "summary": "This document is a plea agreement between the United States and D. James Sogas in a federal criminal case in the Northern District of California. Under this agreement, the defendant agrees to plead guilty to a one-count Information charging him with participating in a conspiracy to fix prices of dynamic random access memory (DRAM) in violation of the Sherman Antitrust Act. The conspiracy involved coordinating and stabilizing DRAM prices sold to certain computer manufacturers and coordinating bids in specific auctions.\n\nThe agreement explains the rights the defendant is giving up by pleading guilty, including the right to a jury trial, the right to confront witnesses, and most rights to appeal the sentence if it is consistent with or below the agreed recommendation. The defendant admits to participating in the conspiracy during a defined period and acknowledges the factual basis that the government would have presented at trial.\n\nThe parties jointly recommend a specific sentence: a $250,000 criminal fine, seven months of imprisonment, no restitution, and no supervised release. The fine must be paid in full within 15 days after the date of judgment. In addition, the court is required to impose a $100 special assessment. Although the court is not required to accept this recommended sentence, if it does not, the defendant may withdraw his guilty plea.\n\nA significant part of the agreement requires the defendant to cooperate fully and truthfully with ongoing federal investigations and proceedings related to DRAM antitrust violations. If the defendant fails to cooperate or otherwise violates the agreement, the government may void its obligations and prosecute him for additional crimes, and statements he previously made could be used against him.",
  "document_type": "Plea Agreement",
  "charges": [
    "Conspiracy to suppress and eliminate competition by fixing the price of dynamic random access memory (DRAM), in violation of the Sherman Antitrust Act, 15 U.S.C. § 1"
  ],
  "obligations": [
    {
      "obligation": "Plead guilty to a one-count Information charging violation of the Sherman Antitrust Act.",
      "consequence_if_violated": "If the court rejects the recommended sentence and the defendant withdraws his plea, the government may re-indict him and the statute of limitations will be tolled."
    },
    {
      "obligation": "Pay a $250,000 criminal fine in full before the fifteenth (15th) day after the date of judgment.",
      "consequence_if_violated": null
    },
    {
      "obligation": "Serve a term of seven months of incarceration.",
      "consequence_if_violated": null
    },
    {
      "obligation": "Pay a mandatory $100 special assessment upon conviction.",
      "consequence_if_violated": null
    },
    {
      "obligation": "Provide full, truthful, and continuing cooperation with federal investigations and proceedings related to DRAM antitrust violations, including producing documents, submitting to interviews, responding to inquiries, and testifying under oath when requested.",
      "consequence_if_violated": "The government may void its obligations under the plea agreement and prosecute the defendant for additional federal crimes."
    }
  ],
  "violation_risks": [
    {
      "clause": "If Defendant violates any condition of supervised release, Defendant could be imprisoned for the entire term of supervised release.",
      "explanation": "If supervised release were imposed and he violated its conditions, he could be sent back to prison for the full supervised release term.",
      "severity": "high"
    },
    {
      "clause": "Should the United States determine... that Defendant has failed to provide full and truthful cooperation... the United States... may... void any of its obligations... and Defendant shall be subject to prosecution for any federal crime of which the United States has knowledge.",
      "explanation": "If the government decides he did not cooperate fully and truthfully, it can cancel the plea protections and charge him with additional crimes.",
      "severity": "high"
    },
    {
      "clause": "In any further prosecution... any documents, statements, information, testimony, or evidence provided by him... may be used against him.",
      "explanation": "If the plea agreement is voided due to his violation, the statements and evidence he previously gave can be used against him in a new prosecution.",
      "severity": "high"
    },
    {
      "clause": "Responding fully and truthfully... subject to the penalties of making false statements (18 U.S.C. § 1001) and obstruction of justice (18 U.S.C. § 1503).",
      "explanation": "If he lies or obstructs justice during cooperation, he could face additional criminal charges.",
      "severity": "high"
    }
  ],
  "deadlines": [
    {
      "description": "Participation in the charged conspiracy",
      "date": "On or about April 1, 2001 to on or about June 15, 2002"
    },
    {
      "description": "Payment of $250,000 criminal fine in full",
      "date": "Before the fifteenth (15th) day after the date of judgment"
    },
    {
      "description": "Tolling of statute of limitations if guilty plea is withdrawn",
      "date": "From date of signing of Plea Agreement until withdrawal of plea or at least 60 days after signing, whichever is greater"
    }
  ],
  "financial_penalties": [
    {
      "type": "Criminal fine",
      "amount": "$250,000"
    },
    {
      "type": "Special assessment",
      "amount": "$100"
    }
  ],
  "lawyer_questions": [
    "What specific actions would the government consider a failure to provide full and truthful cooperation?",
    "What happens if I am unable to pay the $250,000 fine within 15 days of judgment?",
    "Under what circumstances could the court reject the recommended sentence?",
    "If the plea agreement is voided, what additional charges could realistically be brought against me?",
    "How will my cooperation be evaluated before the government makes its motion for downward departure?",
    "Are there any potential administrative or professional consequences outside of this criminal case?",
    "What does it mean that most appeal rights are waived if the sentence is consistent with the agreement?"
  ]
}

export default function Home() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<File | null>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if (!fileRef.current) return 
    formData.append("file", fileRef.current)
    setLoading(true)
    const result = await submitPDF(formData)
    setLoading(false)
    if (!result) {
      setError("Prcess Failed")
    }
    setError(null)
    setSummary(result)
  }
  return (
    
    <div className="flex flex-col mx-10 min-h-screen items-center  bg-zinc-50 font-sans dark:bg-black">
      <h1 className="h1">Upload your document </h1>
      <section id="upload" className="">
        <form onSubmit={handleSubmit} className="flex flex-col items-end gap-3">
          <PDFDropzone onFileSelect={(file) => (fileRef.current = file)} disabled={loading} />
          <Button type="submit">Submit</Button>
        </form>
      </section>
      <Separator className="my-4 max-w-3xl" />
      <h1 className="h1">Results</h1>
      {
        !summary && !loading && <div className="flex items-center justify-center h-40">
              <p>Upload document to get a summary</p>
        </div>
      }
      
      {
        loading ? <h1 className="text-2xl font-bold&& !loading">Loading ... </h1> :
          !error && summary &&
          <section id="results">
            <DocSummary summary={summary} />
          </section>
      }
    </div>
  );
}

