"use client";

import { useEffect } from "react";
import { useDealerQuotationStore, DealerQuotation } from "@/store/dealerQuotationStore";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "@/components/popup/DeleteConfirmPopup";
import { FileText, Trash2, Clock, CheckCircle2, Send as SendIcon } from "lucide-react";


const statusConfig = {
    pending:  { label: "Pending",  color: "#f98513", bg: "rgba(249,133,19,0.1)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    reviewed: { label: "Reviewed", color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)",  icon: CheckCircle2 },
    sent:     { label: "Sent",     color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)",   icon: SendIcon },
};

const statuses = ["pending", "reviewed", "sent"] as const;


const DealerQuotationsPage = () => {

    const { quotations, isLoading, getAllQuotations, updateQuotationStatus, deleteQuotation } = useDealerQuotationStore();
    const { openModal, closeModal } = useModal();

    useEffect(() => { getAllQuotations(); }, [getAllQuotations]);

    const formatDate = (d?: string) => d
        ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "—";

    const handleDelete = (q: DealerQuotation) => {
        openModal(
            <DeleteConfirmPopup
                title={`${q.productName} quotation`}
                onClose={closeModal}
                onDelete={() => deleteQuotation(q._id as string)}
            />
        );
    };

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                    <FileText size={18} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">Dealer Quotations</h1>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {isLoading ? "Loading..." : `${quotations.length} quotation requests`}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                {isLoading ? (
                    <div className="flex items-center justify-center py-20 gap-3">
                        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading quotations…</span>
                    </div>
                ) : quotations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <FileText size={36} style={{ color: "rgba(255,255,255,0.12)" }} />
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No quotation requests yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "Dealer", "Email", "Product", "Message", "Status", "Date", "Actions"].map((h) => (
                                        <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {quotations.map((q, i) => {
                                    const s = statusConfig[q.status] || statusConfig.pending;
                                    const Icon = s.icon;
                                    return (
                                        <tr key={q._id || i}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>

                                            {/* # */}
                                            <td className="px-5 py-4 text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(i + 1).padStart(2, "0")}
                                            </td>

                                            {/* Dealer name */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-white whitespace-nowrap">{q.name}</p>
                                            </td>

                                            {/* Email */}
                                            <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                                {q.email}
                                            </td>

                                            {/* Product */}
                                            <td className="px-5 py-4">
                                                <span className="text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                                                    style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                    {q.productName}
                                                </span>
                                            </td>

                                            {/* Message */}
                                            <td className="px-5 py-4 text-xs max-w-[200px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                <span className="line-clamp-2">{q.message || <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}</span>
                                            </td>

                                            {/* Status select */}
                                            <td className="px-5 py-4">
                                                <div className="relative">
                                                    <select
                                                        value={q.status}
                                                        onChange={(e) => updateQuotationStatus(q._id as string, e.target.value)}
                                                        className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full cursor-pointer appearance-none pr-6 outline-none"
                                                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                                                        {statuses.map((st) => (
                                                            <option key={st} value={st} className="bg-[#141414] text-white text-sm">
                                                                {statusConfig[st].label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <Icon size={9} strokeWidth={2.5}
                                                        className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                                        style={{ color: s.color }} />
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {formatDate(q.createdAt)}
                                            </td>

                                            {/* Delete */}
                                            <td className="px-5 py-4">
                                                <button title="Delete" onClick={() => handleDelete(q)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                    style={{ color: "#ef4444" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
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

            {!isLoading && quotations.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {quotations.length} total quotations
                </p>
            )}
        </div>
    );
};

export default DealerQuotationsPage;
