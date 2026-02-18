export const metadata = {
    title: "Privacy Policy | NANYA CNC",
    description: "Privacy Policy based on legal confidentiality and contract handling terms used by NANYA CNC.",
};

const privacySections = [
    {
        title: "1. Policy Basis",
        content:
            "This Privacy Policy is prepared from the legal terms provided by NANYA CNC, especially confidentiality, contract processing, and dispute-related legal clauses.",
    },
    {
        title: "2. Information We Handle",
        content:
            "For business transactions, we may handle company contact details, order and invoice information, delivery and inspection records, warranty and maintenance records, and communications required to perform contracts.",
    },
    {
        title: "3. Purpose of Use",
        content:
            "Information is used to process quotations and orders, arrange delivery and inspection, provide warranty support, manage payments, handle legal and compliance obligations, and resolve disputes under applicable law.",
    },
    {
        title: "4. Confidentiality Commitment",
        content:
            "Each party must protect confidential information with reasonable safeguards and use it only for contract performance and product use. Disclosure to competitors is restricted. These confidentiality restrictions generally continue for five years after disclosure unless a separate NDA applies.",
    },
    {
        title: "5. Sharing and Disclosure",
        content:
            "Information may be shared with affiliates, subcontractors, logistics providers, and advisors where required for contract performance. Information may also be disclosed when required by law, legal process, or competent authority.",
    },
    {
        title: "6. Retention",
        content:
            "Contract, service, and transaction records are retained for operational, legal, accounting, and dispute-resolution purposes for a period necessary under applicable business and legal requirements.",
    },
    {
        title: "7. Security",
        content:
            "Reasonable administrative and operational controls are used to protect confidential and business-sensitive information from unauthorized disclosure, misuse, or loss.",
    },
    {
        title: "8. Cross-Border and Legal Jurisdiction",
        content:
            "As NANYA CNC serves international buyers, data related to orders and support may be processed across jurisdictions. Contract interpretation and enforcement are subject to the laws of Taiwan with Taichung District Court jurisdiction as stated in the legal terms.",
    },
    {
        title: "9. Updates to This Policy",
        content:
            "This policy may be updated when legal, operational, or contractual requirements change. The current version published on this website will be treated as the active version.",
    },
];

const PrivacyPolicyPage = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] animate-gridMove" />
                <div className="absolute left-1/2 top-36 h-96 w-96 -translate-x-1/2 bg-[radial-gradient(circle,rgba(249,133,19,0.30),transparent_70%)] blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-6">
                    <p className="mb-4 text-sm uppercase tracking-[0.2em] text-orange-400">Legal</p>
                    <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                        Privacy <span className="text-orange-500">Policy</span>
                    </h1>
                </div>
            </section>

            <section className="pb-24">
                <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6">
                    {privacySections.map((section) => (
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

export default PrivacyPolicyPage;
