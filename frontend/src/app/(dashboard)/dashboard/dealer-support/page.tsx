"use client";

import { useEffect, useState } from "react";
import {
    HeadphonesIcon, Search, X, Trash2, Clock, RotateCcw,
    CheckCircle2, Tag, AlignLeft, Package, Eye
} from "lucide-react";
import { useDealerSupportStore, DealerSupportTicket } from "@/store/dealerSupportStore";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "@/components/popup/DeleteConfirmPopup";

const avatarColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs    = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];

const STATUS_CONFIG = {
    "open":        { label: "Open",        color: "#f98513", bg: "rgba(249,133,19,0.12)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    "in-progress": { label: "In Progress", color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  icon: RotateCcw },
    "resolved":    { label: "Resolved",    color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)",   icon: CheckCircle2 },
};

// ── Detail modal ──
const TicketDetailModal = ({ ticket, onClose }: { ticket: DealerSupportTicket; onClose: () => void }) => {
    const sc = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
    const Icon = sc.icon;
    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
            <div className="w-full max-w-lg rounded-2xl overflow-hidden relative"
                style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }}
                onClick={(e) => e.stopPropagation()}>

                {/* Top accent */}
                <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #f98513, transparent)" }} />

                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                            <HeadphonesIcon size={18} strokeWidth={2} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white leading-tight">{ticket.subject}</h2>
                            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                Support Ticket · {formatDate(ticket.createdAt)}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    {/* Dealer info */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Dealer</p>
                            <p className="text-sm font-semibold text-white">{ticket.name}</p>
                        </div>
                        <div className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Email</p>
                            <p className="text-sm font-semibold text-white truncate">{ticket.email}</p>
                        </div>
                    </div>

                    {/* Topic + Status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                                <Tag size={9} /> Topic
                            </p>
                            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                {ticket.topic}
                            </span>
                        </div>
                        <div className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>Status</p>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                                style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                                <Icon size={9} strokeWidth={2.5} />
                                {sc.label}
                            </span>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                            <AlignLeft size={9} /> Message
                        </p>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.7)" }}>
                            {ticket.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const DealerSupportPage = () => {
    const { isLoading, tickets, getAllTickets, updateTicketStatus, deleteTicket } = useDealerSupportStore();
    const [searchTerm,   setSearchTerm]   = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => { getAllTickets(); }, [getAllTickets]);

    const filtered = tickets.filter((t: DealerSupportTicket) => {
        const matchSearch =
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.topic.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === "All" || t.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const openCount       = tickets.filter(t => t.status === "open").length;
    const inProgressCount = tickets.filter(t => t.status === "in-progress").length;
    const resolvedCount   = tickets.filter(t => t.status === "resolved").length;

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="space-y-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <HeadphonesIcon size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Dealer Support</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${tickets.length} tickets · ${openCount} open · ${inProgressCount} in progress · ${resolvedCount} resolved`}
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
                        <option value="All"         className="bg-[#0A0A0A]">All Status</option>
                        <option value="open"        className="bg-[#0A0A0A]">Open</option>
                        <option value="in-progress" className="bg-[#0A0A0A]">In Progress</option>
                        <option value="resolved"    className="bg-[#0A0A0A]">Resolved</option>
                    </select>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search name, email, subject…"
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
            {!isLoading && tickets.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Open",        value: openCount,       color: "#f98513", bg: "rgba(249,133,19,0.08)", icon: Clock },
                        { label: "In Progress", value: inProgressCount, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", icon: RotateCcw },
                        { label: "Resolved",    value: resolvedCount,   color: "#22c55e", bg: "rgba(34,197,94,0.08)",  icon: CheckCircle2 },
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
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading tickets…</span>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Package size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm || statusFilter !== "All" ? "No tickets match your filters" : "No support tickets yet"}
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
                                    {["#", "Dealer", "Topic", "Subject", "Status", "Date", "Actions"].map((h) => (
                                        <th key={h}
                                            className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((ticket: DealerSupportTicket, index: number) => {
                                    const colorIdx = index % avatarColors.length;
                                    const sc       = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
                                    const SIcon    = sc.icon;

                                    return (
                                        <tr key={ticket._id || index}
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
                                                        {ticket.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white leading-tight">{ticket.name}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{ticket.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Topic */}
                                            <td className="px-5 py-4">
                                                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                                                    style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                    {ticket.topic}
                                                </span>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-5 py-4 max-w-[180px]">
                                                <p className="text-sm font-medium text-white truncate" title={ticket.subject}>
                                                    {ticket.subject}
                                                </p>
                                                <p className="text-[11px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }} title={ticket.message}>
                                                    {ticket.message}
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
                                                        value={ticket.status}
                                                        onChange={(e) => updateTicketStatus(ticket._id as string, e.target.value)}
                                                        className="text-[10px] font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer"
                                                        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                                                    >
                                                        <option value="open"        className="bg-[#141414]">Set Open</option>
                                                        <option value="in-progress" className="bg-[#141414]">Set In Progress</option>
                                                        <option value="resolved"    className="bg-[#141414]">Set Resolved</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs whitespace-nowrap"
                                                style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {formatDate(ticket.createdAt)}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        title="View Details"
                                                        onClick={() => openModal(
                                                            <TicketDetailModal ticket={ticket} onClose={closeModal} />
                                                        )}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#3b82f6" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                                    >
                                                        <Eye size={15} strokeWidth={2} />
                                                    </button>
                                                    <button
                                                        title="Delete Ticket"
                                                        onClick={() => openModal(
                                                            <DeleteConfirmPopup
                                                                title={`"${ticket.subject}" ticket`}
                                                                onClose={closeModal}
                                                                onDelete={() => deleteTicket(ticket._id as string)}
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
                    Showing {filtered.length} of {tickets.length} tickets
                </p>
            )}
        </div>
    );
};

export default DealerSupportPage;
