"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle,
    FileText,
    ShieldCheck,
    Star,
    Globe,
    BadgeDollarSign,
    HeadphonesIcon,
    TrendingUp,
    Package,
    ClipboardList,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useDealerStore } from "@/store/dealerStore";


const steps = [
    {
        number: "01",
        icon: FileText,
        title: "Submit Your Application",
        desc: "Fill out the dealer request form with your personal and company details. Tell us about your business and the markets you serve.",
    },
    {
        number: "02",
        icon: ClipboardList,
        title: "Application Review",
        desc: "Our partner team reviews your application within 2–3 business days and evaluates your business profile and market fit.",
    },
    {
        number: "03",
        icon: ShieldCheck,
        title: "Get Approved",
        desc: "Once approved, you receive access to the exclusive Dealer Portal with full dashboard, catalogue, and ordering capabilities.",
    },
    {
        number: "04",
        icon: Star,
        title: "Start Selling",
        desc: "Browse the full product catalogue, place orders, raise quotations, and manage your business — all from one place.",
    },
];

const benefits = [
    {
        icon: Globe,
        title: "Global Network Access",
        desc: "Tap into NANYA CNC's worldwide distribution and sales infrastructure.",
    },
    {
        icon: BadgeDollarSign,
        title: "Competitive Margins",
        desc: "Earn attractive margins with flexible pricing and volume incentives.",
    },
    {
        icon: HeadphonesIcon,
        title: "Dedicated Support",
        desc: "Get a dedicated account manager and priority technical assistance.",
    },
    {
        icon: TrendingUp,
        title: "Marketing Resources",
        desc: "Co-branded materials, leads, and digital marketing support.",
    },
    {
        icon: Package,
        title: "Exclusive Catalogue",
        desc: "Access the full product catalogue with dealer-only pricing and specs.",
    },
    {
        icon: ShieldCheck,
        title: "Certified Partner Badge",
        desc: "Official recognition as an authorized NANYA CNC dealer worldwide.",
    },
];


const DealerPortalClient = () => {
    const router = useRouter();
    const { isAuthenticated, checkAuth, isCheckingAuth } = useAuthStore();
    const { getDealerStatus, dealerStatus } = useDealerStore();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleAccessPortal = async () => {
        if (!isAuthenticated) {
            router.push("/dealer-request");
            return;
        }

        setChecking(true);
        await getDealerStatus();
        setChecking(false);
    };

    useEffect(() => {
        if (!checking && dealerStatus !== "idle") {
            if (dealerStatus === "accept") {
                router.push("/dealer-portal");
            } else {
                router.push("/dealer-request");
            }
        }
    }, [checking, dealerStatus, router]);

    const isLoading = isCheckingAuth || checking;

    return (
        <div className="min-h-screen bg-black text-white">

            {/* ── Hero ── */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-80 bg-[radial-gradient(circle,rgba(249,133,19,0.12),transparent_70%)] blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">
                        Partner Program
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-5">
                        How the <span className="text-orange-500">Dealer Portal</span> Works
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10">
                        NANYA CNC&apos;s Dealer Portal is an exclusive platform for authorized partners. Manage orders, quotations, catalogues, and support — all in one place.
                    </p>

                    <button
                        onClick={handleAccessPortal}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-orange-500 text-black font-semibold text-sm hover:bg-orange-500/85 transition shadow-lg shadow-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>
                                Access Dealer Portal
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </section>

            {/* ── How It Works Steps ── */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-xs uppercase tracking-widest text-orange-500 mb-3">The Process</p>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-center text-white mb-12">
                        4 Simple Steps to Get Started
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className="relative rounded-2xl p-6 border border-white/7 overflow-hidden"
                                    style={{ background: "#0A0A0A" }}
                                >
                                    {/* Accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                                        style={{ background: "linear-gradient(90deg, transparent, rgba(249,133,19,0.6), transparent)" }} />

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                                                style={{ background: "rgba(249,133,19,0.12)" }}>
                                                <Icon size={20} className="text-orange-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-orange-500/60 tracking-widest">{step.number}</span>
                                            <h3 className="text-white font-semibold text-base mt-0.5 mb-2">{step.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-xs uppercase tracking-widest text-orange-500 mb-3">What You Get</p>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-center text-white mb-12">
                        Dealer Benefits
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {benefits.map((b) => {
                            const Icon = b.icon;
                            return (
                                <div
                                    key={b.title}
                                    className="rounded-2xl p-5 border border-white/7 hover:border-orange-500/20 transition-colors duration-300"
                                    style={{ background: "#0A0A0A" }}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                        style={{ background: "rgba(249,133,19,0.10)" }}>
                                        <Icon size={18} className="text-orange-400" />
                                    </div>
                                    <h3 className="text-white font-semibold text-sm mb-1.5">{b.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Review Note ── */}
            <section className="py-8 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-xl px-5 py-4 flex items-start gap-3"
                        style={{ background: "rgba(249,133,19,0.06)", border: "1px solid rgba(249,133,19,0.18)" }}>
                        <CheckCircle size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-orange-300/80 leading-relaxed">
                            Applications are reviewed within <span className="font-semibold text-orange-400">2–3 business days</span>.
                            Our team will contact you via the email provided. If approved, you&apos;ll get instant access to the Dealer Portal.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-4">
                    Ready to Join the Network?
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
                    Click below to access the dealer portal. If you&apos;re not yet approved, you&apos;ll be directed to submit your application.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={handleAccessPortal}
                        disabled={isLoading}
                        className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-orange-500 text-black font-semibold text-sm hover:bg-orange-500/85 transition shadow-lg shadow-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>
                                Access Dealer Portal
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                    <Link
                        href="/get-consultations"
                        className="text-sm text-gray-400 hover:text-white transition underline underline-offset-4"
                    >
                        Have questions? Talk to us
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default DealerPortalClient;
