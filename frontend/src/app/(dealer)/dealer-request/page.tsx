"use client";

import { useEffect, useState } from "react";
import {
    Loader, Send, CheckCircle, Globe, TrendingUp,
    HeadphonesIcon, BadgeDollarSign, ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Dealer, useDealerStore } from "@/store/dealerStore";
import toast from "react-hot-toast";
import PendingStatus from "@/components/dealer/PendingStatus";
import RejectedStatus from "@/components/dealer/RejectStatus";
import { useRouter } from "next/dist/client/components/navigation";


const benefits = [
    {
        icon: Globe,
        title: "Global Network",
        desc: "Access NANYA CNC's worldwide distribution and sales infrastructure.",
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
        icon: ShieldCheck,
        title: "Certified Partner",
        desc: "Official certification and recognition as an authorized NANYA CNC dealer.",
    },
];


const inputClass =
    "w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm transition focus:border-orange-500/60 focus:bg-white/8 focus:ring-1 focus:ring-orange-500/30";


const DealerRequest = () => {

    const { user } = useAuthStore();
    const router = useRouter();
    const { isLoading, submitRequest, dealerStatus, getDealerStatus } = useDealerStore();
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            await getDealerStatus();
            setInitialLoad(false);
        };
        fetchStatus();
    }, [getDealerStatus]);

    useEffect(() => {
        if (dealerStatus === "accept") {
            router.replace("/dealer-portal");
        }
    }, [dealerStatus, router]);

    const [formData, setFormData] = useState<Dealer>({
        name: user?.name ?? "",
        email: user?.email ?? "",
        companyName: "",
        companyEmail: "",
        message: "",
        status: "idle",
    });

    // Sync name/email once user loads
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: prev.name || user.name || "",
                email: prev.email || user.email || "",
            }));
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.companyName || !formData.companyEmail || !formData.message) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const success = await submitRequest(formData);
            if (success) {
                setFormData({
                    name: "",
                    email: "",
                    companyName: "",
                    companyEmail: "",
                    message: "",
                    status: "idle",
                });
            }
        } catch {
            toast.error("Something went wrong!");
        }
    };


    if (initialLoad) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (dealerStatus === "pending") {
        return <PendingStatus />;
    }

    if (dealerStatus === "accept") {
        return null;
    }

    if (dealerStatus === "reject") {
        return <RejectedStatus />;
    }


    return (
        <div className="min-h-screen bg-black pt-6 pb-20">

            {/* ── Page Hero ── */}
            <div className="max-w-6xl mx-auto px-5 pt-10 pb-12 text-center">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">
                    Partner Program
                </span>
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-white mb-4 leading-tight">
                    Become an Authorized <span className="text-orange-500">NANYA CNC</span> Dealer
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                    Join our global network of certified dealers and grow your business with industry-leading CNC machines, support, and resources.
                </p>
            </div>

            {/* ── Main Layout ── */}
            <div className="max-w-6xl mx-auto px-5">
                <div className="grid lg:grid-cols-5 gap-8 items-start">

                    {/* ── Left: Benefits ── */}
                    <div className="lg:col-span-2 space-y-4">

                        <div className="rounded-2xl p-6 relative overflow-hidden"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            {/* Subtle grid */}
                            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                                backgroundImage: `linear-gradient(rgba(249,133,19,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.06) 1px, transparent 1px)`,
                                backgroundSize: "28px 28px",
                            }} />
                            {/* Glow */}
                            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{
                                background: "radial-gradient(ellipse at 50% 0%, rgba(249,133,19,0.15) 0%, transparent 70%)"
                            }} />
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{
                                background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.4), #f98513, transparent)"
                            }} />

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white font-serif mb-1">Why Partner With Us?</h3>
                                <p className="text-xs text-gray-500 mb-6">Everything you need to scale your business</p>

                                <div className="space-y-4">
                                    {benefits.map((b) => {
                                        const Icon = b.icon;
                                        return (
                                            <div key={b.title} className="flex items-start gap-3.5">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                                                    <Icon size={16} strokeWidth={2} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{b.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{b.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Note card */}
                        <div className="rounded-xl px-4 py-3.5 flex items-start gap-3"
                            style={{ background: "rgba(249,133,19,0.07)", border: "1px solid rgba(249,133,19,0.2)" }}>
                            <CheckCircle size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-orange-300/80 leading-relaxed">
                                Applications are reviewed within <span className="font-semibold text-orange-400">2–3 business days</span>. Our team will contact you via the email you provide.
                            </p>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <div className="lg:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl p-6 md:p-8 space-y-5"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            <div className="mb-2">
                                <h2 className="text-xl font-bold text-white">Submit Your Application</h2>
                                <p className="text-xs text-gray-500 mt-1">Fill in your details and we&apos;ll get back to you shortly.</p>
                            </div>

                            {/* Divider */}
                            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                            {/* Personal Info */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Personal Information</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-400">Full Name <span className="text-orange-500">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="e.g. John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-400">Personal Email <span className="text-orange-500">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Company Info */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Company Information</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-400">Company Name <span className="text-orange-500">*</span></label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Your Business Name"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-400">Company Email <span className="text-orange-500">*</span></label>
                                        <input
                                            type="email"
                                            name="companyEmail"
                                            placeholder="business@company.com"
                                            value={formData.companyEmail}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400">Message / Requirements <span className="text-orange-500">*</span></label>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your business, the markets you serve, and why you want to partner with NANYA CNC..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl font-semibold text-sm text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                style={{ background: isLoading ? "#f98513" : "linear-gradient(135deg, #f98513, #e06e00)" }}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send size={16} strokeWidth={2.5} />
                                        Submit Application
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-600">
                                By submitting, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DealerRequest;
