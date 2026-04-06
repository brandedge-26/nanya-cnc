"use client";

import { useRouter } from "next/navigation";
import {
    ShoppingCart,
    BarChart2,
    Package,
    Headphones,
    Zap,
    FileText,
    ChevronRight,
    Globe,
    ShieldCheck,
    Smartphone,
    CheckCircle2,
} from "lucide-react";

const features = [
    {
        icon: ShoppingCart,
        title: "Order Management",
        desc: "Place orders, track shipments, and handle invoices with real-time visibility across your entire pipeline.",
    },
    {
        icon: Package,
        title: "Inventory & Pricing",
        desc: "Instant inventory checks and transparent, up-to-date pricing information — no delays, no guesswork.",
    },
    {
        icon: FileText,
        title: "Product Information & Marketing",
        desc: "Centralized access to the latest product specs, datasheets, and co-branded marketing materials.",
    },
    {
        icon: Zap,
        title: "Self-Service Tools",
        desc: "Manage your account, find answers, and handle requests without waiting on support teams.",
    },
    {
        icon: BarChart2,
        title: "Analytics & Reporting",
        desc: "Track dealer performance, sales trends, and customer behavior with powerful built-in analytics.",
    },
    {
        icon: Headphones,
        title: "Technical Support & Training",
        desc: "Access expert support channels and training resources — including maintenance checklists for CNC machines.",
    },
];

const steps = [
    {
        step: "01",
        title: "Submit Your Application",
        desc: "Fill in your company details and business requirements through our secure online form.",
    },
    {
        step: "02",
        title: "Review & Approval",
        desc: "Our team reviews your application and verifies your dealership credentials within 2-3 business days.",
    },
    {
        step: "03",
        title: "Get Portal Access",
        desc: "Once approved, receive your dedicated dealer credentials and start managing your business.",
    },
    {
        step: "04",
        title: "Grow Your Business",
        desc: "Leverage real-time inventory, marketing tools, and analytics to scale your NANYA CNC partnership.",
    },
];

const benefits = [
    "Real-time collaboration on product data and service orders",
    "Mobile-friendly access — manage from anywhere, anytime",
    "Automated workflows that reduce manual email and phone calls",
    "Secure, centralized hub for all dealer resources",
    "Direct integration with NANYA CNC inventory & ERP systems",
    "Dedicated technical support and machine maintenance checklists",
];

export default function DealerPortalPage() {
    const router = useRouter();

    return (
        <div className="bg-black min-h-screen text-white">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">

                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

                {/* Orange glow */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <div className="h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(255,140,0,0.35),transparent_70%)] blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-orange-500/40 text-orange-400 text-sm font-medium tracking-wide">
                        NANYA CNC Partner Network
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-tight">
                        Your Gateway to the{" "}
                        <span className="text-orange-500">Dealer Portal</span>
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A secure, centralized hub where your dealer network can access
                        resources, place orders, manage accounts, and collaborate
                        with NANYA CNC in real time.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => router.push("/dealer-request")}
                            className="cursor-pointer px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition flex items-center justify-center gap-2"
                        >
                            Apply to Become a Dealer
                            <ChevronRight size={18} />
                        </button>
                        <button
                            onClick={() => router.push("/products")}
                            className="cursor-pointer px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
                        >
                            View Products
                        </button>
                    </div>
                </div>
            </section>


            {/* ── WHAT IS DEALER PORTAL ────────────────────────────── */}
            <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                    What is a <span className="text-orange-500">Dealer Portal?</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
                    A dealer portal is a <span className="text-white font-medium">secure, centralized web platform</span> designed
                    to facilitate communication, collaboration, and information exchange
                    between NANYA CNC and its authorized dealers or distributors worldwide.
                    It removes friction, automates workflows, and empowers dealers to
                    self-serve with confidence.
                </p>
            </section>


            {/* ── KEY FEATURES ─────────────────────────────────────── */}
            <section className="py-20 px-6 bg-white/2">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
                        Key <span className="text-orange-500">Features</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
                        Everything your dealership needs — in one powerful platform.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={i}
                                    className="group rounded-2xl p-7 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                                >
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500 group-hover:bg-orange-500/25 transition">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2 font-serif text-white">
                                        {f.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* ── HOW IT WORKS ─────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
                        How It <span className="text-orange-500">Works</span>
                    </h2>
                    <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
                        Getting started as a NANYA CNC dealer is simple and straightforward.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((s, i) => (
                            <div key={i} className="relative text-center">
                                <div className="text-5xl font-bold font-serif text-orange-500/20 mb-3">
                                    {s.step}
                                </div>
                                <h3 className="font-semibold text-white font-serif mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>

                                {/* Connector line (hide on last) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 right-0 translate-x-1/2 w-6 h-px bg-orange-500/30" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ── BENEFITS ─────────────────────────────────────────── */}
            <section className="py-20 px-6 bg-white/2">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Left: text */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                                Why Join the{" "}
                                <span className="text-orange-500">NANYA CNC</span> Network?
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Our dealer portal is built with one goal — giving you the tools
                                to run your business more efficiently and profitably.
                            </p>
                            <ul className="space-y-3">
                                {benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle2
                                            size={18}
                                            className="text-orange-500 shrink-0 mt-0.5"
                                        />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: stat cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Globe, label: "Global Network", value: "50+ Countries" },
                                { icon: ShieldCheck, label: "Secure Access", value: "Enterprise Grade" },
                                { icon: Smartphone, label: "Mobile Ready", value: "Any Device" },
                                { icon: Zap, label: "Real-Time Sync", value: "Zero Lag" },
                            ].map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className="rounded-2xl p-6 bg-white/5 border border-white/10 text-center hover:border-orange-500/40 transition"
                                    >
                                        <Icon size={28} className="text-orange-500 mx-auto mb-3" strokeWidth={1.5} />
                                        <div className="text-lg font-bold text-white font-serif">{stat.value}</div>
                                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>


            {/* ── CTA BANNER ───────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">

                    {/* Background glow */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="h-64 w-64 bg-[radial-gradient(circle,rgba(255,140,0,0.2),transparent_70%)] blur-2xl" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Ready to <span className="text-orange-500">Get Started?</span>
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
                            Join the NANYA CNC dealer network today and unlock access to
                            exclusive pricing, inventory, and marketing resources.
                        </p>
                        <button
                            onClick={() => router.push("/dealer-request")}
                            className="cursor-pointer px-10 py-3.5 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition inline-flex items-center gap-2"
                        >
                            Apply Now
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
