"use client";

import { ConsultationType, useConsultationStore } from "@/store/consultationStore";
import { MessageSquare, Search, Trash2, Eye, X, Cpu, Factory, Wrench, TrendingUp, Brain, DollarSign, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";
import ConsultationDetailPopup from "../popup/ConsultationDetailPopup";

const avatarColors  = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs     = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];

const consultIcons: Record<string, React.ElementType> = {
    "New Factory Setup":    Factory,
    "Machine Upgrade":      Wrench,
    "Production Expansion": TrendingUp,
    "Technical Guidance":   Brain,
    "Price Inquiry":        DollarSign,
};

const timelineStyle: Record<string, { bg: string; color: string }> = {
    Urgent:           { bg: "rgba(239,68,68,0.12)",    color: "#ef4444" },
    Normal:           { bg: "rgba(249,133,19,0.12)",   color: "#f98513" },
    "Planning Phase": { bg: "rgba(59,130,246,0.12)",   color: "#3b82f6" },
};

function parseMessage(msg: string) {
    const result: Record<string, string> = {};
    msg.split("\n").forEach((line) => {
        const idx = line.indexOf(": ");
        if (idx > -1) result[line.substring(0, idx).trim()] = line.substring(idx + 2).trim();
    });
    return result;
}

const ConsultationsTable = () => {
    const { isLoading, consultations, getAllConsultations, deleteConsultation } = useConsultationStore();
    const [searchTerm, setSearchTerm]       = useState("");
    const [timelineFilter, setTimelineFilter] = useState("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => { getAllConsultations(); }, [getAllConsultations]);

    const filtered = consultations.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.machine.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchSearch) return false;
        if (timelineFilter === "All") return true;
        const parsed = parseMessage(c.message);
        return parsed["Timeline"] === timelineFilter;
    });

    const handleDelete = (item: ConsultationType) => {
        openModal(
            <DeleteConfirmPopup
                title={`${item.name}'s Consultation`}
                onClose={closeModal}
                onDelete={() => deleteConsultation(item._id as string)}
            />
        );
    };

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="space-y-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <MessageSquare size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Consultations</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${consultations.length} request${consultations.length !== 1 ? "s" : ""} received`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    {/* Timeline filter */}
                    <select
                        value={timelineFilter}
                        onChange={(e) => setTimelineFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <option value="All" className="bg-[#0A0A0A]">All Timelines</option>
                        <option value="Urgent" className="bg-[#0A0A0A]">Urgent</option>
                        <option value="Normal" className="bg-[#0A0A0A]">Normal</option>
                        <option value="Planning Phase" className="bg-[#0A0A0A]">Planning Phase</option>
                    </select>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search name, email, machine…"
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
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading consultations…</span>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <MessageSquare size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm || timelineFilter !== "All" ? "No results found" : "No consultations yet"}
                        </p>
                        {(searchTerm || timelineFilter !== "All") && (
                            <button
                                onClick={() => { setSearchTerm(""); setTimelineFilter("All"); }}
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
                                    {["#", "Contact", "Machine of Interest", "Type / Timeline", "Date", "Actions"].map((h) => (
                                        <th key={h}
                                            className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((item, index) => {
                                    const colorIdx   = index % avatarColors.length;
                                    const parsed     = parseMessage(item.message);
                                    const consultType = parsed["Consultation Type"] || "";
                                    const timeline    = parsed["Timeline"] || "";
                                    const ConsIcon    = consultIcons[consultType] || MessageSquare;
                                    const tlStyle     = timelineStyle[timeline];

                                    const machineDisplay = item.machine.length > 32
                                        ? item.machine.slice(0, 30) + "…"
                                        : item.machine;

                                    return (
                                        <tr key={item._id || index}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>

                                            {/* # */}
                                            <td className="px-5 py-4 text-xs font-mono"
                                                style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(index + 1).padStart(2, "0")}
                                            </td>

                                            {/* Contact */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                                                        style={{ background: avatarBgs[colorIdx], color: avatarColors[colorIdx] }}>
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white leading-tight">{item.name}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Machine */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                                                        <Cpu size={12} strokeWidth={2} />
                                                    </div>
                                                    <span className="text-xs font-semibold" style={{ color: "#f98513" }}>
                                                        {machineDisplay}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Type / Timeline */}
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    {consultType && (
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit"
                                                            style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.15)" }}>
                                                            <ConsIcon size={9} strokeWidth={2.5} />
                                                            {consultType}
                                                        </span>
                                                    )}
                                                    {timeline && tlStyle && (
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit"
                                                            style={{ background: tlStyle.bg, color: tlStyle.color }}>
                                                            <Clock size={9} strokeWidth={2.5} />
                                                            {timeline}
                                                        </span>
                                                    )}
                                                    {!consultType && !timeline && (
                                                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                                                            Quick inquiry
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs whitespace-nowrap"
                                                style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {formatDate(item.createdAt)}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        title="View Details"
                                                        onClick={() => openModal(
                                                            <ConsultationDetailPopup
                                                                consultation={item}
                                                                onClose={closeModal}
                                                            />
                                                        )}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#3b82f6" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                                    >
                                                        <Eye size={15} strokeWidth={2} />
                                                    </button>
                                                    <button
                                                        title="Delete"
                                                        onClick={() => handleDelete(item)}
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

            {/* Footer */}
            {!isLoading && filtered.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filtered.length} of {consultations.length} consultations
                </p>
            )}
        </div>
    );
};

export default ConsultationsTable;
