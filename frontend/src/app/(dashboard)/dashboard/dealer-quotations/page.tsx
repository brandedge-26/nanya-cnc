"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, X, FileText, Clock, CheckCircle2, Send as SendIcon, Package } from "lucide-react";
import { useDealerQuotationStore, DealerQuotation } from "@/store/dealerQuotationStore";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "@/components/popup/DeleteConfirmPopup";

const avatarColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs    = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];

const STATUS_CONFIG = {
    pending:  { label: "Pending",  color: "#f98513", bg: "rgba(249,133,19,0.12)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    reviewed: { label: "Reviewed", color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  icon: CheckCircle2 },
    sent:     { label: "Sent",     color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)",   icon: SendIcon },
};

const DealerQuotationsPage = () => {
    const { isLoading, quotations, getAllQuotations, updateQuotationStatus, deleteQuotation } = useDealerQuotationStore();
    const [searchTerm,   setSearchTerm]   = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => { getAllQuotations(); }, [getAllQuotations]);

    const filtered = quotations.filter((q: DealerQuotation) => {
        const matchSearch =
            q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === "All" || q.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const pendingCount  = quotations.filter(q => q.status === "pending").length;
    const reviewedCount = quotations.filter(q => q.status === "reviewed").length;
    const sentCount     = quotations.filter(q => q.status === "sent").length;

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="space-y-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <FileText size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Dealer Quotations</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${quotations.length} quotations · ${pendingCount} pending · ${reviewedCount} reviewed · ${sentCount} sent`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <option value="All"      className="bg-[#0A0A0A]">All Status</option>
                        <option value="pending"  className="bg-[#0A0A0A]">Pending</option>
                        <option value="reviewed" className="bg-[#0A0A0A]">Reviewed</option>
                        <option value="sent"     className="bg-[#0A0A0A]">Sent</option>
                    </select>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search name, email, product…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-white outline-none transition"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(249,133,19,0.5)")}
                            onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                style={{ color: "rgba(255,255,255,0.3)" }}>
                                <X size={13} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Quick Stats ── */}
            {!isLoading && quotations.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Pending",  value: pendingCount,  color: "#f98513", bg: "rgba(249,133,19,0.08)", icon: Clock },
                        { label: "Reviewed", value: reviewedCount, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", icon: CheckCircle2 },
                        { label: "Sent",     value: sentCount,     color: "#22c55e", bg: "rgba(34,197,94,0.08)",  icon: SendIcon },
                    ].map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3"
                                style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
                                <Icon size={16} style={{ color: s.color, flexShrink: 0 }} strokeWidth={2} />
                                <div>
                                    <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Table ── */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {isLoading ? (
                    <div className="flex items-center justify-center py-24 gap-3">
                        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading quotations…</span>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Package size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm || statusFilter !== "All" ? "No quotations match your filters" : "No quotation requests yet"}
                        </p>
                        {(searchTerm || statusFilter !== "All") && (
                            <button onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                                className="text-xs text-orange-400 hover:text-orange-300 transition cursor-pointer">
                                Clear filters
                            </button>
                        )}
                    </div>

                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "Dealer", "Product", "Message", "Status", "Date", "Action"].map((h) => (
                                        <th key={h}
                                            className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((q: DealerQuotation, index: number) => {
                                    const colorIdx = index % avatarColors.length;
                                    const sc       = STATUS_CONFIG[q.status] || STATUS_CONFIG.pending;
                                    const SIcon    = sc.icon;

                                    return (
                                        <tr key={q._id || index}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>

                                            {/* # */}
                                            <td className="px-5 py-4 text-xs font-mono"
                                                style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(index + 1).padStart(2, "0")}
                                            </td>

                                            {/* Dealer */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                                                        style={{ background: avatarBgs[colorIdx], color: avatarColors[colorIdx] }}>
                                                        {q.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white leading-tight">{q.name}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{q.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Product */}
                                            <td className="px-5 py-4">
                                                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                                                    style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                    {q.productName}
                                                </span>
                                            </td>

                                            {/* Message */}
                                            <td className="px-5 py-4 max-w-[180px]">
                                                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}
                                                    title={q.message}>
                                                    {q.message || <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full w-fit"
                                                        style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                                                        <SIcon size={9} strokeWidth={2.5} />
                                                        {sc.label}
                                                    </span>
                                                    <select
                                                        value={q.status}
                                                        onChange={(e) => updateQuotationStatus(q._id as string, e.target.value)}
                                                        className="text-[10px] font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer"
                                                        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                                                    >
                                                        <option value="pending"  className="bg-[#141414]">Set Pending</option>
                                                        <option value="reviewed" className="bg-[#141414]">Set Reviewed</option>
                                                        <option value="sent"     className="bg-[#141414]">Set Sent</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs whitespace-nowrap"
                                                style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {formatDate(q.createdAt)}
                                            </td>

                                            {/* Delete */}
                                            <td className="px-5 py-4">
                                                <button
                                                    title="Delete Quotation"
                                                    onClick={() => openModal(
                                                        <DeleteConfirmPopup
                                                            title={`${q.productName} quotation`}
                                                            onClose={closeModal}
                                                            onDelete={() => deleteQuotation(q._id as string)}
                                                        />
                                                    )}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                    style={{ color: "#ef4444" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                                >
                                                    <Trash2 size={15} strokeWidth={2} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!isLoading && filtered.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filtered.length} of {quotations.length} quotations
                </p>
            )}
        </div>
    );
};

export default DealerQuotationsPage;
