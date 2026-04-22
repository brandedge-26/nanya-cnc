"use client";

import { Trash2, Search, Eye, X, Users, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { Dealer, useDealerStore } from "@/store/dealerStore";
import DealerDetailPopup from "../popup/DealerDetailPopup";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";

const avatarColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs    = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
    pending: { label: "Pending",  color: "#f98513", bg: "rgba(249,133,19,0.12)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    idle:    { label: "Pending",  color: "#f98513", bg: "rgba(249,133,19,0.12)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    accept:  { label: "Accepted", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)",   icon: CheckCircle2 },
    reject:  { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)",   icon: XCircle },
};

const DealerRequestTable = () => {
    const { isLoading, getAllDealerRequests, dealerRequests, updateDealerStatus, deleteDealerRequest } = useDealerStore();
    const [searchTerm,    setSearchTerm]    = useState("");
    const [statusFilter,  setStatusFilter]  = useState("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => { getAllDealerRequests(); }, [getAllDealerRequests]);

    const filtered = dealerRequests.filter((d: Dealer) => {
        const matchSearch =
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === "All" || d.status === statusFilter || (statusFilter === "pending" && d.status === "idle");
        return matchSearch && matchStatus;
    });

    const pendingCount  = dealerRequests.filter(d => d.status === "pending" || d.status === "idle").length;
    const acceptedCount = dealerRequests.filter(d => d.status === "accept").length;

    return (
        <div className="space-y-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <Users size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Dealer Requests</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${dealerRequests.length} requests · ${pendingCount} pending · ${acceptedCount} accepted`}
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
                        <option value="All" className="bg-[#0A0A0A]">All Status</option>
                        <option value="pending" className="bg-[#0A0A0A]">Pending</option>
                        <option value="accept"  className="bg-[#0A0A0A]">Accepted</option>
                        <option value="reject"  className="bg-[#0A0A0A]">Rejected</option>
                    </select>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search name, email, company…"
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

            {/* ── Table ── */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {isLoading ? (
                    <div className="flex items-center justify-center py-24 gap-3">
                        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading dealer requests…</span>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Users size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm || statusFilter !== "All" ? "No results match your filters" : "No dealer requests yet"}
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
                                    {["#", "Dealer", "Company", "Message", "Status", "Actions"].map((h) => (
                                        <th key={h}
                                            className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((dealer: Dealer, index: number) => {
                                    const colorIdx = index % avatarColors.length;
                                    const sKey     = dealer.status === "idle" ? "pending" : dealer.status;
                                    const sc       = STATUS_CONFIG[sKey] || STATUS_CONFIG.pending;
                                    const SIcon    = sc.icon;

                                    return (
                                        <tr key={dealer._id || index}
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
                                                        {dealer.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white leading-tight">{dealer.name}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{dealer.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Company */}
                                            <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                                                {dealer.companyName}
                                            </td>

                                            {/* Message */}
                                            <td className="px-5 py-4 max-w-[200px]">
                                                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}
                                                    title={dealer.message}>
                                                    {dealer.message}
                                                </p>
                                            </td>

                                            {/* Status dropdown */}
                                            <td className="px-5 py-4">
                                                <div className="relative inline-block">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full mb-1"
                                                        style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                                                        <SIcon size={9} strokeWidth={2.5} />
                                                        {sc.label}
                                                    </span>
                                                    <select
                                                        value={sKey}
                                                        onChange={(e) => updateDealerStatus(dealer._id as string, e.target.value)}
                                                        className="block w-full text-[10px] font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer transition-all"
                                                        style={{
                                                            background: "#141414",
                                                            border: "1px solid rgba(255,255,255,0.1)",
                                                            color: "rgba(255,255,255,0.5)",
                                                        }}
                                                    >
                                                        <option value="pending" className="bg-[#141414]">Set Pending</option>
                                                        <option value="accept"  className="bg-[#141414]">Set Accepted</option>
                                                        <option value="reject"  className="bg-[#141414]">Set Rejected</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        title="View Details"
                                                        onClick={() => openModal(
                                                            <DealerDetailPopup dealer={dealer} onClose={closeModal} />
                                                        )}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#3b82f6" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                                    >
                                                        <Eye size={15} strokeWidth={2} />
                                                    </button>
                                                    <button
                                                        title="Delete Request"
                                                        onClick={() => openModal(
                                                            <DeleteConfirmPopup
                                                                title={`${dealer.name}'s Dealer Request`}
                                                                onClose={closeModal}
                                                                onDelete={() => deleteDealerRequest(dealer._id as string)}
                                                            />
                                                        )}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#ef4444" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                                    >
                                                        <Trash2 size={15} strokeWidth={2} />
                                                    </button>
                                                </div>
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
                    Showing {filtered.length} of {dealerRequests.length} requests
                </p>
            )}
        </div>
    );
};

export default DealerRequestTable;
