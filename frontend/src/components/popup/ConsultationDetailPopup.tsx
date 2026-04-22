import { ConsultationType } from "@/store/consultationStore";
import {
    X, Mail, User, Cpu, StickyNote,
    Factory, Wrench, TrendingUp, Brain, DollarSign,
    Building2, Globe, MapPin, PackageSearch, Banknote,
    Clock, CheckSquare,
} from "lucide-react";

interface Props {
    consultation: ConsultationType;
    onClose: () => void;
}

function parseMessage(message: string): Record<string, string> {
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
    "New Factory Setup":     Factory,
    "Machine Upgrade":       Wrench,
    "Production Expansion":  TrendingUp,
    "Technical Guidance":    Brain,
    "Price Inquiry":         DollarSign,
};

const timelineStyle: Record<string, { bg: string; color: string }> = {
    Urgent:           { bg: "rgba(239,68,68,0.12)",  color: "#ef4444" },
    Normal:           { bg: "rgba(249,133,19,0.12)", color: "#f98513" },
    "Planning Phase": { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
};

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) {
    if (!value || value === "-") return null;
    return (
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                <Icon size={13} strokeWidth={2} />
            </div>
            <div>
                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                <p className="text-sm font-medium text-white mt-0.5">{value}</p>
            </div>
        </div>
    );
}

function Block({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl p-4 space-y-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                <Icon size={11} />
                {title}
            </p>
            {children}
        </div>
    );
}

const ConsultationDetailPopup = ({ consultation, onClose }: Props) => {
    const parsed       = parseMessage(consultation.message);
    const isStructured = !!parsed["Consultation Type"];

    const consultType  = parsed["Consultation Type"] || "";
    const machines     = parsed["Machines of Interest"]
        ? parsed["Machines of Interest"].split(", ").filter(Boolean)
        : consultation.machine ? [consultation.machine] : [];
    const company      = parsed["Company"] || "";
    const industry     = parsed["Industry"] || "";
    const country      = parsed["Country"] || "";
    const quantity     = parsed["Quantity"] || "";
    const budget       = parsed["Budget"] || "";
    const timeline     = parsed["Timeline"] || "";
    const requirements = parsed["Requirements"]
        ? parsed["Requirements"].split(", ").filter((r) => r && r !== "None")
        : [];
    const notes        = parsed["Additional Notes"] || "";
    const plainMsg     = isStructured ? "" : consultation.message;

    const ConsultIcon  = consultIcons[consultType] || Factory;
    const tlStyle      = timelineStyle[timeline] || { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };

    const dateStr = consultation.createdAt
        ? new Date(consultation.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
        : "—";

    return (
        <div className="text-white relative" style={{ maxHeight: "88vh", overflowY: "auto" }}>

            {/* Close */}
            <button onClick={onClose}
                className="absolute right-5 top-5 w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer z-10"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                <X size={16} strokeWidth={2} />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start gap-4 pr-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.15)", color: "#f98513" }}>
                        {consultation.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-white leading-tight">{consultation.name}</h2>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{consultation.email}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            {consultType && (
                                <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                    <ConsultIcon size={11} strokeWidth={2.5} />
                                    {consultType}
                                </span>
                            )}
                            {timeline && (
                                <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                                    style={{ background: tlStyle.bg, color: tlStyle.color }}>
                                    <Clock size={10} strokeWidth={2.5} />
                                    {timeline}
                                </span>
                            )}
                            {!isStructured && (
                                <span className="text-[11px] px-2.5 py-1 rounded-full"
                                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                                    Quick Inquiry
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">

                {isStructured ? (
                    <>
                        {/* Contact + Company */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Block title="Contact Info" icon={User}>
                                <div className="space-y-3">
                                    <Row icon={Mail}  label="Email"   value={consultation.email} />
                                </div>
                            </Block>
                            <Block title="Company Info" icon={Building2}>
                                <div className="space-y-3">
                                    <Row icon={Building2} label="Company"  value={company} />
                                    <Row icon={Globe}     label="Industry" value={industry} />
                                    <Row icon={MapPin}    label="Country"  value={country} />
                                </div>
                            </Block>
                        </div>

                        {/* Project Details */}
                        {(quantity || budget || timeline) && (
                            <Block title="Project Details" icon={PackageSearch}>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <Row icon={PackageSearch} label="Quantity" value={quantity} />
                                    <Row icon={Banknote}      label="Budget"   value={budget} />
                                    <Row icon={Clock}         label="Timeline" value={timeline} />
                                </div>
                            </Block>
                        )}

                        {/* Machines */}
                        {machines.length > 0 && machines[0] !== "None selected" && (
                            <Block title={`Machine Selection (${machines.length})`} icon={Cpu}>
                                <div className="flex flex-wrap gap-2">
                                    {machines.map((m) => (
                                        <span key={m} className="text-xs font-medium px-3 py-1.5 rounded-full"
                                            style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                            {m}
                                        </span>
                                    ))}
                                </div>
                            </Block>
                        )}

                        {/* Requirements */}
                        {requirements.length > 0 && (
                            <Block title={`Requirements (${requirements.length})`} icon={CheckSquare}>
                                <div className="flex flex-wrap gap-2">
                                    {requirements.map((r) => (
                                        <span key={r} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                                            style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.15)" }}>
                                            <span className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px]"
                                                style={{ background: "#22c55e", color: "#000" }}>✓</span>
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </Block>
                        )}

                        {/* Notes */}
                        {notes && notes !== "-" && (
                            <Block title="Additional Notes" icon={StickyNote}>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{notes}</p>
                            </Block>
                        )}
                    </>
                ) : (
                    /* Simple consultation */
                    <>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Block title="Contact Info" icon={User}>
                                <div className="space-y-3">
                                    <Row icon={Mail} label="Email"   value={consultation.email} />
                                    <Row icon={Cpu}  label="Machine" value={consultation.machine} />
                                </div>
                            </Block>
                            {machines.length > 0 && machines[0] !== "None selected" && (
                                <Block title="Machine Interest" icon={Cpu}>
                                    <div className="flex flex-wrap gap-2">
                                        {machines.map((m) => (
                                            <span key={m} className="text-xs font-medium px-3 py-1.5 rounded-full"
                                                style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </Block>
                            )}
                        </div>
                        <Block title="Message" icon={StickyNote}>
                            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "rgba(255,255,255,0.7)" }}>
                                {plainMsg}
                            </p>
                        </Block>
                    </>
                )}

                {/* Date */}
                <p className="text-xs text-right pt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Submitted: {dateStr}
                </p>

                {/* Close */}
                <button onClick={onClose}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ConsultationDetailPopup;
