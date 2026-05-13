import Link from "next/link";
import { ArrowRight, Globe, BadgeDollarSign, HeadphonesIcon, Package, LayoutDashboard, FileBarChart } from "lucide-react";

const features = [
    {
        icon: LayoutDashboard,
        title: "Dealer Dashboard",
        desc: "A centralized dashboard to manage your orders, quotations, and account — all in one place.",
    },
    {
        icon: Package,
        title: "Exclusive Catalogue",
        desc: "Access the full NANYA CNC product catalogue with dealer-only pricing and detailed specifications.",
    },
    {
        icon: FileBarChart,
        title: "Quotation Management",
        desc: "Raise, track, and manage quotations for your clients directly from the portal.",
    },
    {
        icon: BadgeDollarSign,
        title: "Competitive Margins",
        desc: "Earn attractive margins backed by flexible pricing structures and volume incentives.",
    },
    {
        icon: HeadphonesIcon,
        title: "Priority Support",
        desc: "Get a dedicated account manager and fast-track technical support for your business.",
    },
    {
        icon: Globe,
        title: "Global Partner Network",
        desc: "Join authorized dealers across the world and grow with NANYA CNC's brand and reach.",
    },
];

const DealerSection = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[radial-gradient(circle,rgba(249,133,19,0.07),transparent_70%)] blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-14">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3">Partner Program</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-white max-w-lg leading-tight">
                            Everything you need as an <span className="text-orange-500">authorized dealer</span>
                        </h2>
                        <Link href="/how-dealer-portal-works">
                            <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-orange-500 text-black font-semibold text-sm hover:bg-orange-500/85 transition cursor-pointer whitespace-nowrap shadow-lg shadow-orange-500/20">
                                Access Dealer Portal
                                <ArrowRight size={15} />
                            </button>
                        </Link>
                    </div>
                    <p className="text-gray-400 text-sm mt-4 max-w-xl">
                        The NANYA CNC Dealer Portal gives authorized partners a complete set of tools to manage their business, access products, and serve their clients efficiently.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-orange-500/10 rounded-2xl overflow-hidden border border-orange-500/10">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className="bg-black p-7 flex flex-col gap-3 hover:bg-orange-500/5 transition-colors duration-200"
                            >
                                <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Icon size={17} className="text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom note */}
                <p className="text-center text-gray-600 text-xs mt-8">
                    Applications are reviewed within 2–3 business days. Already a dealer?{" "}
                    <Link href="/how-dealer-portal-works" className="text-orange-500 hover:text-orange-400 transition underline-offset-2 underline">
                        Sign in to your portal
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default DealerSection;
