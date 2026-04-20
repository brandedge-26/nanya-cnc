"use client";

import { ApplicationType, useApplicationStore } from "@/store/applicationStore";
import {
    Search, X, ClipboardList, Trash2, Eye,
    Factory, Wrench, TrendingUp, Brain, DollarSign,
    MapPin, Building2, Cpu, Clock, CheckSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import ApplicationDetailPopup from "../popup/ApplicationDetailPopup";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";


// ── Parse the structured message from get-quote form ──────────────────────────
export function parseAppMessage(message: string): Record<string, string> {
    const result: Record<string, string> = {};
    message.split("\n").forEach((line) => {
        const idx = line.indexOf(": ");
        if (idx > -1) {
            result[line.substring(0, idx).trim()] = line.substring(idx + 2).trim();
        }
    });
    return result;
}

const consultIcons: Record<string, React.ElementType> = {
    "New Factory Setup": Factory,
    "Machine Upgrade": Wrench,
    "Production Expansion": TrendingUp,
    "Technical Guidance": Brain,
    "Price Inquiry": DollarSign,
};

const timelineStyle: Record<string, { bg: string; color: string }> = {
    Urgent:         { bg: "rgba(239,68,68,0.12)",    color: "#ef4444" },
    Normal:         { bg: "rgba(249,133,19,0.12)",   color: "#f98513" },
    "Planning Phase": { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
};

const avatarColors  = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs     = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];


// ── Application Card ──────────────────────────────────────────────────────────
function AppCard({
    app, index, onView, onDelete,
}: {
    app: ApplicationType;
    index: number;
    onView: () => void;
    onDelete: () => void;
}) {
    const parsed        = parseAppMessage(app.message);
    const consultType   = parsed["Consultation Type"] || "";
    const machines      = parsed["Machines of Interest"]
        ? parsed["Machines of Interest"].split(", ").filter(Boolean)
        : [];
    const industry      = parsed["Industry"] || "";
    const country       = parsed["Country"] || parsed["companyAddress"] || app.companyAddress || "";
    const timeline      = parsed["Timeline"] || "";
    const requirements  = parsed["Requirements"]
        ? parsed["Requirements"].split(", ").filter((r) => r && r !== "None")
        : [];
    const budget        = parsed["Budget"] || "";
    const quantity      = parsed["Quantity"] || "";

    const colorIdx  = index % avatarColors.length;
    const ConsultIcon = consultIcons[consultType] || ClipboardList;
    const tlStyle   = timelineStyle[timeline] || { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };
    const isStructured = !!parsed["Consultation Type"];

    return (
        <div
            className="rounded-2xl flex flex-col transition-all duration-300"
            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(249,133,19,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
        >
            {/* Card Top */}
            <div className="p-5 flex-1">

                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                            style={{ background: avatarBgs[colorIdx], color: avatarColors[colorIdx] }}
                        >
                            {app.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white leading-tight">{app.firstName} {app.lastName}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{app.email}</p>
                        </div>
                    </div>
                    {/* Serial */}
                    <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                        #{String(index + 1).padStart(3, "0")}
                    </span>
                </div>

                {isStructured ? (
                    <>
                        {/* Consultation type */}
                        {consultType && (
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                                    <ConsultIcon size={14} strokeWidth={2} />
                                </div>
                                <span className="text-xs font-semibold text-white">{consultType}</span>
                            </div>
                        )}

                        {/* Company + Location */}
                        <div className="space-y-1.5 mb-3">
                            {app.companyName && app.companyName !== "-" && (
                                <div className="flex items-center gap-2">
                                    <Building2 size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{app.companyName}</span>
                                </div>
                            )}
                            {country && country !== "-" && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                                        {country}{industry && industry !== "-" ? ` · ${industry}` : ""}
                                    </span>
                                </div>
                            )}
                            {(budget && budget !== "-") || (quantity && quantity !== "-") ? (
                                <div className="flex items-center gap-2">
                                    <DollarSign size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                                        {[quantity !== "-" ? quantity : null, budget !== "-" ? budget : null].filter(Boolean).join(" · ")}
                                    </span>
                                </div>
                            ) : null}
                        </div>

                        {/* Machines */}
                        {machines.length > 0 && machines[0] !== "None selected" && (
                            <div className="mb-3">
                                <p className="text-[10px] uppercase tracking-widest font-semibold mb-1.5"
                                    style={{ color: "rgba(255,255,255,0.3)" }}>
                                    <Cpu size={10} className="inline mr-1" />Machines
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {machines.slice(0, 4).map((m) => (
                                        <span key={m}
                                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                                            style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                            {m}
                                        </span>
                                    ))}
                                    {machines.length > 4 && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full"
                                            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                                            +{machines.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {requirements.length > 0 && (
                            <div className="mb-3">
                                <p className="text-[10px] uppercase tracking-widest font-semibold mb-1.5"
                                    style={{ color: "rgba(255,255,255,0.3)" }}>
                                    <CheckSquare size={10} className="inline mr-1" />Requirements
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {requirements.slice(0, 3).map((r) => (
                                        <span key={r}
                                            className="text-[10px] px-2 py-0.5 rounded-full"
                                            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                            {r}
                                        </span>
                                    ))}
                                    {requirements.length > 3 && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full"
                                            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                                            +{requirements.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Non-structured (plain message from homepage CTA) */
                    <div className="mb-3">
                        {app.companyName && app.companyName !== "-" && (
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                                <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{app.companyName}</span>
                            </div>
                        )}
                        <p className="text-xs leading-relaxed line-clamp-3"
                            style={{ color: "rgba(255,255,255,0.4)" }}>
                            {app.message}
                        </p>
                    </div>
                )}
            </div>

            {/* Card Footer */}
            <div className="px-5 py-3 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>

                {/* Timeline badge */}
                {timeline ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: tlStyle.bg, color: tlStyle.color }}>
                        <Clock size={10} strokeWidth={2.5} />
                        {timeline}
                    </span>
                ) : (
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                        General Inquiry
                    </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={onView}
                        title="View Details"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        style={{ color: "#3b82f6" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                    >
                        <Eye size={15} strokeWidth={2} />
                    </button>
                    <button
                        onClick={onDelete}
                        title="Delete"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        style={{ color: "#ef4444" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                    >
                        <Trash2 size={15} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}


// ── Main Table Component ──────────────────────────────────────────────────────
const ApplicationsTable = () => {
    const { isLoading, getAllApplications, applications, deleteApplication } = useApplicationStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [timelineFilter, setTimelineFilter] = useState("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        getAllApplications();
    }, [getAllApplications]);

    const filteredApplications = applications.filter((app: ApplicationType) => {
        const matchesSearch =
            app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.companyName.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (timelineFilter === "All") return true;
        const parsed = parseAppMessage(app.message);
        return parsed["Timeline"] === timelineFilter;
    });

    const handleDelete = (app: ApplicationType) => {
        openModal(
            <DeleteConfirmPopup
                title={`${app.firstName}'s Application`}
                onClose={closeModal}
                onDelete={() => deleteApplication(app._id as string)}
            />
        );
    };

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <ClipboardList size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">All Applications</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${applications.length} consultation requests`}
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
                            placeholder="Search name, email, company…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-white outline-none transition"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(249,133,19,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
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

            {/* Grid / States */}
            {isLoading ? (
                <div className="flex items-center justify-center py-24 gap-3">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading applications…</span>
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 rounded-2xl"
                    style={{ border: "1px dashed rgba(255,255,255,0.08)" }}>
                    <ClipboardList size={40} style={{ color: "rgba(255,255,255,0.12)" }} />
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {searchTerm || timelineFilter !== "All" ? "No results found" : "No applications yet"}
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
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredApplications.map((app: ApplicationType, index: number) => (
                        <AppCard
                            key={app._id || index}
                            app={app}
                            index={index}
                            onView={() => openModal(<ApplicationDetailPopup application={app} onClose={closeModal} />)}
                            onDelete={() => handleDelete(app)}
                        />
                    ))}
                </div>
            )}

            {/* Footer */}
            {!isLoading && filteredApplications.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filteredApplications.length} of {applications.length} applications
                </p>
            )}
        </div>
    );
};

export default ApplicationsTable;
