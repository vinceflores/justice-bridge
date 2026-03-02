import { Summary } from "@/app/types"

export type DocSummaryProps = {
    summary: Summary
}
export function DocSummary(props: DocSummaryProps) {
    const { summary } = props

    const splitParagraph = (text: string) => {
        return text.split("\n\n");
    }

    return (
        <div className="max-w-3xl">
            <h3 className="">
                <span className="font-bold">Document Type:</span>
                {summary.document_type}
            </h3>
            <h2 className="h2">Summary</h2>
            {/* <p >{summary.summary}</p> */}
            <div className="space-y-3 ">
                {
                    splitParagraph(summary.summary).map((i, k) => (
                        <p key={k} className="leading-relaxed indent-4">
                            {i}
                        </p>
                    ))
                }
            </div>
            <h2 className="h2">Charges</h2>
            <ul className="ml-6 list-disc [&>li]:mt-2">
                {
                    summary.charges.map((i, k) => (
                        <li key={k}>{i}</li>
                    ))
                }
            </ul>

            <h2 className="h2">Obligations</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Obligation</th>
                        <th className="border border-gray-300 p-3 text-left">Consequence if Violated</th>
                    </tr>
                </thead>
                <tbody>

                    {summary.obligations && summary.obligations.length > 0 &&
                        summary.obligations.map((i, k) => (
                            <tr key={k} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3">{i.obligation}</td>
                                <td className="border border-gray-300 p-3">{i.consequence_if_violated}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <h2 className="h2">Violation Risks</h2>
            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Clause</th>
                        <th className="border border-gray-300 p-3 text-left">Explanation</th>
                        <th className="border border-gray-300 p-3 text-left">Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.violation_risks && summary.violation_risks.map((v, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 align-top">
                            <td className="border border-gray-300 p-3 align-top">{v.clause}</td>
                            <td className="border border-gray-300 p-3">{v.explanation}</td>
                            <td className="border border-gray-300 p-3">
                                <span className={
                                    v.severity === "high" ? "text-red-600 font-semibold" :
                                        v.severity === "moderate" ? "text-yellow-600 font-medium" :
                                            "text-green-600"
                                }>
                                    {v.severity}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="h2">Deadlines</h2>
            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Description</th>
                        <th className="border border-gray-300 p-3 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.deadlines && summary.deadlines.map((d, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-3">{d.description}</td>
                            <td className="border border-gray-300 p-3">{d.date ?? "TBD"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="h2">Financial Penalties</h2>
            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Type</th>
                        <th className="border border-gray-300 p-3 text-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.financial_penalties && summary.financial_penalties.map((p, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-3">{p.type}</td>
                            <td className="border border-gray-300 p-3">{p.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="h2">Lawyer Questions</h2>
            <ul>
                {
                    summary.lawyer_questions && summary.lawyer_questions.map((i, k) => (
                        <li key={k} className="p-3 border-t-2 border-b-2 ">{i}</li>
                    ))
                }
            </ul>
        </div>
    )
}