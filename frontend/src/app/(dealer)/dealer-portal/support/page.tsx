"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useDealerSupportStore } from "@/store/dealerSupportStore";
import {
    HeadphonesIcon, Send, CheckCircle2, Mail, MessageSquare,
    Clock, RotateCcw, Tag, AlignLeft, Ticket
} from "lucide-react";

const inputClass =
    "w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20";

const topics = [
    "Order Inquiry",
    "Technical Support",
    "Billing Question",
    "Product Information",
    "Shipping & Delivery",
    "Other",
];

const STATUS_CONFIG = {
    open:         { label: "Open",        color: "#f98513", bg: "rgba(249,133,19,0.12)",  icon: Clock },
    "in-progress":{ label: "In Progress", color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  icon: RotateCcw },
    resolved:     { label: "Resolved",    color: "#22c55e", bg: "rgba(34,197,94,0.12)",   icon: CheckCircle2 },
};

const SupportPage = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const { isLoading, submitted, submitTicket, getMyTickets, tickets, resetSubmitted } = useDealerSupportStore();
    const [formData, setFormData] = useState({ subject: "", topic: "", message: "" });
    const [activeTab, setActiveTab] = useState<"form" | "history">("form");

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
        getMyTickets();
    }, [isAuthenticated, isCheckingAuth, user, router, getMyTickets]);

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
        if (!formData.subject || !formData.topic || !formData.message) return;
        const ok = await submitTicket(formData);
        if (ok) setFormData({ subject: "", topic: "", message: "" });
    };

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    // ── Success state ──
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
                        <h2 className="text-2xl font-bold text-white mb-2">Ticket Submitted!</h2>
                        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Our support team will respond within{" "}
                            <span className="text-orange-400 font-semibold">24–48 hours</span>.
                        </p>
                        <button
                            onClick={() => { resetSubmitted(); setActiveTab("history"); getMyTickets(); }}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-black cursor-pointer"
                            style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                            View My Tickets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* ── Header ── */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                    <HeadphonesIcon size={18} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">Support</h1>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Get help from our dedicated dealer support team
                    </p>
                </div>
            </div>

            {/* ── Info strip ── */}
            <div className="grid sm:grid-cols-2 gap-3">
                {[
                    { icon: Mail,         label: "Email Support",  value: "support@nanyacnc.com",  color: "#3b82f6" },
                    { icon: MessageSquare, label: "Response Time", value: "24–48 business hours",  color: "#22c55e" },
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

            {/* ── Tabs ── */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                {([
                    { key: "form",    label: "New Ticket",  icon: Send },
                    { key: "history", label: "My Tickets",  icon: Ticket },
                ] as const).map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.key;
                    return (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                            style={active
                                ? { background: "#f98513", color: "#000" }
                                : { color: "rgba(255,255,255,0.4)" }
                            }>
                            <Icon size={14} strokeWidth={2} />
                            {tab.label}
                            {tab.key === "history" && tickets.length > 0 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                                    style={active
                                        ? { background: "rgba(0,0,0,0.2)", color: "#000" }
                                        : { background: "rgba(249,133,19,0.15)", color: "#f98513" }}>
                                    {tickets.length}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── New Ticket Form ── */}
            {activeTab === "form" && (
                <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-5"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <h3 className="text-base font-bold text-white">Submit a Support Ticket</h3>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                    {/* From (readonly) */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>From (Name)</label>
                            <input type="text" value={user.name || ""} readOnly
                                className="w-full border outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed text-sm opacity-50"
                                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>From (Email)</label>
                            <input type="email" value={user.email || ""} readOnly
                                className="w-full border outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed text-sm opacity-50"
                                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }} />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                                <Tag size={11} /> Topic <span className="text-orange-500">*</span>
                            </label>
                            <select name="topic" value={formData.topic} onChange={handleChange}
                                className="w-full border outline-none px-4 py-3 rounded-xl text-white text-sm cursor-pointer transition"
                                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(249,133,19,0.5)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}>
                                <option value="" className="bg-[#0A0A0A]">Select a topic</option>
                                {topics.map((t) => (
                                    <option key={t} value={t} className="bg-[#0A0A0A]">{t}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                                <AlignLeft size={11} /> Subject <span className="text-orange-500">*</span>
                            </label>
                            <input type="text" name="subject" placeholder="Brief subject line"
                                value={formData.subject} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                            <MessageSquare size={11} /> Message <span className="text-orange-500">*</span>
                        </label>
                        <textarea name="message" rows={5}
                            placeholder="Describe your issue or question in detail..."
                            value={formData.message} onChange={handleChange}
                            className={`${inputClass} resize-none`} />
                    </div>

                    <button type="submit" disabled={isLoading || !formData.topic || !formData.subject || !formData.message}
                        className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl font-semibold text-sm text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                        {isLoading
                            ? <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                            : <><Send size={16} strokeWidth={2.5} /> Submit Ticket</>
                        }
                    </button>
                </form>
            )}

            {/* ── My Tickets History ── */}
            {activeTab === "history" && (
                <div className="rounded-2xl overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16 gap-3">
                            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading tickets…</span>
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <Ticket size={36} style={{ color: "rgba(255,255,255,0.1)" }} />
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No support tickets yet</p>
                            <button onClick={() => setActiveTab("form")}
                                className="text-xs text-orange-400 hover:text-orange-300 transition cursor-pointer">
                                Submit your first ticket
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                            {tickets.map((ticket) => {
                                const sc = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
                                const Icon = sc.icon;
                                return (
                                    <div key={ticket._id} className="p-5 flex items-start gap-4"
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ background: sc.bg, color: sc.color }}>
                                            <Icon size={16} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 flex-wrap">
                                                <div>
                                                    <p className="text-sm font-semibold text-white leading-tight">{ticket.subject}</p>
                                                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{ticket.topic}</p>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                                                        style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30` }}>
                                                        <Icon size={9} strokeWidth={2.5} />
                                                        {sc.label}
                                                    </span>
                                                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                                                        {formatDate(ticket.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs mt-2 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                {ticket.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SupportPage;
