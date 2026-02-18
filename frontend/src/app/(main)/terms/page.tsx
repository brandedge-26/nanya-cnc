export const metadata = {
    title: "Terms & Conditions | NANYA CNC",
    description: "Terms and Conditions governing sales of products by NANYA CNC ENTERPRISE CO., LTD.",
};

const termSections = [
    {
        title: "1. Scope and Acceptance",
        content:
            "These Terms and Conditions govern all sales of products and services by NANYA CNC ENTERPRISE CO., LTD and its affiliates. Any purchase order, acceptance, or performance confirms the buyer's assent. Any additional or conflicting buyer terms are expressly rejected unless accepted in writing by NANYA CNC.",
    },
    {
        title: "2. Definitions",
        content:
            "Buyer means the purchasing entity. Contract means the signed agreement or accepted purchase order together with these Terms, final quotation, scope of work, and order acknowledgement. Products include machinery, spare parts, industrial materials, supplies, services, software, and customized machine goods.",
    },
    {
        title: "3. Prices and Payment",
        content:
            "Unless agreed otherwise in writing, prices are quoted on EXW, FOB, or CNF basis and exclude taxes, tariffs, freight, insurance, and other charges. Buyer is responsible for all applicable taxes not based on NANYA CNC income. Payments are due at least three weeks before scheduled shipment unless otherwise agreed. Overdue invoices may accrue 2.5% monthly interest.",
    },
    {
        title: "4. Orders, Changes, and Cancellation",
        content:
            "All orders are subject to written acceptance by NANYA CNC. Orders cannot be cancelled or rescheduled without prior written approval. NANYA CNC may classify certain items as non-cancelable and non-returnable (NCNR). If a change or cancellation is accepted, buyer must compensate all resulting losses, damages, and expenses.",
    },
    {
        title: "5. Delivery and Inspection",
        content:
            "Products are packed as per commercial practice unless otherwise agreed. Delivery terms and destination are mutually agreed in the contract. Buyer must inspect packaging, type, and quantity and report non-compliance within two weeks of receipt.",
    },
    {
        title: "6. Warranty",
        content:
            "Warranty period is one and a half years from delivery date for eligible products. Buyer must promptly report non-conformity with supporting records. Warranty is conditional on proper storage, installation, operation, and maintenance, and on no unauthorized modification or repair. Misuse, neglect, accidents, and unauthorized changes void warranty.",
    },
    {
        title: "7. Confidentiality",
        content:
            "Both parties must use confidential information only for contract performance, protect it with reasonable measures, and avoid disclosure to competitors. Restrictions generally survive for five years from disclosure unless superseded by a separate NDA.",
    },
    {
        title: "8. Indemnification and IP Claims",
        content:
            "NANYA CNC will defend and indemnify buyer for third-party intellectual property claims attributable solely to NANYA CNC products, subject to prompt notice, defense control, and cooperation requirements. Exclusions apply for buyer-driven modifications, specifications, unauthorized use, and non-implemented updates.",
    },
    {
        title: "9. Limitation of Liability",
        content:
            "To the maximum extent allowed by law, neither party is liable for indirect, incidental, special, consequential, exemplary, or punitive damages. NANYA CNC aggregate liability is limited to 10% of the amount paid by buyer for affected products during the 12-month period prior to the claim, subject to document rules on overlapping claims.",
    },
    {
        title: "10. Restricted Uses of Products",
        content:
            "Products are not designed for critical life-support, nuclear, or similar high-risk uses unless agreed in writing. Buyer assumes sole risk for such uses and indemnifies NANYA CNC against related claims.",
    },
    {
        title: "11. Governing Law and Disputes",
        content:
            "These terms are governed by the laws of Taiwan. The Taichung District Court has exclusive jurisdiction over disputes concerning interpretation or enforcement.",
    },
    {
        title: "12. Force Majeure and Entire Agreement",
        content:
            "NANYA CNC is not liable for delays or non-performance caused by events beyond reasonable control. Performance time may be extended or remaining performance may be canceled with notice. These terms constitute the entire agreement and supersede prior oral or written understandings.",
    },
];

const TermsPage = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] animate-gridMove" />
                <div className="absolute left-1/2 top-36 h-96 w-96 -translate-x-1/2 bg-[radial-gradient(circle,rgba(249,133,19,0.30),transparent_70%)] blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-6">
                    <p className="mb-4 text-sm uppercase tracking-[0.2em] text-orange-400">Legal</p>
                    <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                        Terms <span className="text-orange-500">&amp; Conditions</span>
                    </h1>
                </div>
            </section>

            <section className="pb-24">
                <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6">
                    {termSections.map((section) => (
                        <article
                            key={section.title}
                            className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-7"
                        >
                            <h2 className="font-serif text-xl text-orange-400 md:text-2xl">{section.title}</h2>
                            <p className="mt-3 leading-relaxed text-gray-200">{section.content}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default TermsPage;
