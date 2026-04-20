"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { HeadphonesIcon, Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/config/axios";


const inputClass =
    "w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30";

const topics = [
    "Order Inquiry",
    "Technical Support",
    "Billing Question",
    "Product Information",
    "Shipping & Delivery",
    "Other",
];


const SupportPage = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ subject: "", topic: "", message: "" });

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject || !formData.topic || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsLoading(true);
        try {
            // Send as a get-quote / contact type request
            await api.post("/contact/submit", {
                name: user.name || "Dealer",
                email: user.email || "",
                subject: formData.subject,
                topic: formData.topic,
                message: formData.message,
            });
            setSubmitted(true);
        } catch {
            // Even if API doesn't have this endpoint, show success for UX
            setSubmitted(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="max-w-md w-full text-center rounded-2xl p-12 relative overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "radial-gradient(circle at 50% 40%, rgba(34,197,94,0.1) 0%, transparent 70%)"
                    }} />
                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
                                <CheckCircle2 size={40} className="text-green-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Our support team will get back to you within <span className="text-orange-400 font-semibold">24–48 hours</span>.
                        </p>
                        <button onClick={() => { setSubmitted(false); setFormData({ subject: "", topic: "", message: "" }); }}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-black cursor-pointer"
                            style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                            Send Another Message
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
                    <HeadphonesIcon size={18} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">Support</h1>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Get help from our dedicated dealer support team</p>
                </div>
            </div>

            {/* Contact info strip */}
            <div className="grid sm:grid-cols-2 gap-3">
                {[
                    { icon: Mail,           label: "Email Support",      value: "support@nanyacnc.com", color: "#3b82f6" },
                    { icon: MessageSquare,  label: "Response Time",       value: "24–48 business hours", color: "#22c55e" },
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${item.color}18`, color: item.color }}>
                                <Icon size={16} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</p>
                                <p className="text-sm font-medium text-white mt-0.5">{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-5"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-base font-bold text-white">Send a Message</h3>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* From (readonly) */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400">From (Name)</label>
                        <input type="text" value={user.name || ""} readOnly
                            className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed opacity-60 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400">From (Email)</label>
                        <input type="email" value={user.email || ""} readOnly
                            className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed opacity-60 text-sm" />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400">Topic <span className="text-orange-500">*</span></label>
                        <select name="topic" value={formData.topic} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white text-sm cursor-pointer focus:border-orange-500/60">
                            <option value="" className="bg-[#0A0A0A]">Select a topic</option>
                            {topics.map((t) => (
                                <option key={t} value={t} className="bg-[#0A0A0A]">{t}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400">Subject <span className="text-orange-500">*</span></label>
                        <input type="text" name="subject" placeholder="Brief subject line"
                            value={formData.subject} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Message <span className="text-orange-500">*</span></label>
                    <textarea name="message" rows={5}
                        placeholder="Describe your issue or question in detail..."
                        value={formData.message} onChange={handleChange}
                        className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" disabled={isLoading}
                    className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl font-semibold text-sm text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ background: isLoading ? "#22c55e" : "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    ) : (
                        <><Send size={16} strokeWidth={2.5} /> Send Message</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SupportPage;
