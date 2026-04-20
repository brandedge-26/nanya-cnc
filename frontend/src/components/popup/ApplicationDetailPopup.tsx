import { ApplicationType } from "@/store/applicationStore";
import {
    X, Building2, Mail, MapPin, User,
    Factory, Wrench, TrendingUp, Brain, DollarSign,
    Cpu, CheckSquare, Clock, StickyNote, Phone,
    PackageSearch, Banknote, Globe,
} from "lucide-react";
import { parseAppMessage } from "@/components/tables/AppicaionsTable";


interface Props {
    application: ApplicationType;
    onClose: () => void;
}

const consultIcons: Record<string, React.ElementType> = {
    "New Factory Setup":   Factory,
    "Machine Upgrade":     Wrench,
    "Production Expansion": TrendingUp,
    "Technical Guidance":  Brain,
    "Price Inquiry":       DollarSign,
};

const timelineStyle: Record<string, { bg: string; color: string }> = {
    Urgent:           { bg: "rgba(239,68,68,0.12)",    color: "#ef4444" },
    Normal:           { bg: "rgba(249,133,19,0.12)",   color: "#f98513" },
    "Planning Phase": { bg: "rgba(59,130,246,0.12)",   color: "#3b82f6" },
};


function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold mb-3"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                <Icon size={12} />
                {title}
            </p>
            {children}
        </div>
    );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
    if (!value || value === "-") return null;
    return (
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                <Icon size={13} strokeWidth={2} />
            </div>
            <div>
                <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                <p className="text-sm font-medium text-white mt-0.5">{value}</p>
            </div>
        </div>
    );
}


const ApplicationDetailPopup = ({ application, onClose }: Props) => {
    const parsed        = parseAppMessage(application.message);
    const isStructured  = !!parsed["Consultation Type"];

    const consultType   = parsed["Consultation Type"] || "";
    const machines      = parsed["Machines of Interest"]
        ? parsed["Machines of Interest"].split(", ").filter(Boolean)
        : [];
    const industry      = parsed["Industry"] || "";
    const country       = parsed["Country"] || application.companyAddress || "";
    const quantity      = parsed["Quantity"] || "";
    const budget        = parsed["Budget"] || "";
    const timeline      = parsed["Timeline"] || "";
    const requirements  = parsed["Requirements"]
        ? parsed["Requirements"].split(", ").filter((r) => r && r !== "None")
        : [];
    const notes         = parsed["Additional Notes"] || "";

    const ConsultIcon   = consultIcons[consultType] || Factory;
    const tlStyle       = timelineStyle[timeline] || { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" };

    return (
        <div className="text-white relative" style={{ maxHeight: "85vh", overflowY: "auto" }}>

            {/* Close */}
            <button onClick={onClose}
                className="absolute right-5 top-5 w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer z-10"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
                <X size={16} strokeWidth={2} />
            </button>

            {/* Top header strip */}
            <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start gap-4 pr-8">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.15)", color: "#f98513" }}>
                        {application.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-white leading-tight">
                            {application.firstName} {application.lastName}
                        </h2>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{application.email}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            {isStructured && consultType && (
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
                                    General Inquiry
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">

                {isStructured ? (
                    <>
                        {/* Contact + Company */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Contact */}
                            <div className="rounded-2xl p-4 space-y-3"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title="Contact Info" icon={User}>
                                    <div className="space-y-3">
                                        <InfoRow icon={Mail}  label="Email"  value={application.email} />
                                        <InfoRow icon={Phone} label="Phone"  value={application.companyEmail !== application.email ? application.companyEmail : ""} />
                                    </div>
                                </Section>
                            </div>

                            {/* Company */}
                            <div className="rounded-2xl p-4 space-y-3"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title="Company Info" icon={Building2}>
                                    <div className="space-y-3">
                                        <InfoRow icon={Building2} label="Company"  value={application.companyName} />
                                        <InfoRow icon={Globe}     label="Industry" value={industry} />
                                        <InfoRow icon={MapPin}    label="Country"  value={country} />
                                    </div>
                                </Section>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="rounded-2xl p-4"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <Section title="Project Details" icon={PackageSearch}>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <InfoRow icon={PackageSearch} label="Quantity" value={quantity} />
                                    <InfoRow icon={Banknote}      label="Budget"   value={budget} />
                                    <InfoRow icon={Clock}         label="Timeline" value={timeline} />
                                </div>
                            </Section>
                        </div>

                        {/* Machine Selection */}
                        {machines.length > 0 && machines[0] !== "None selected" && (
                            <div className="rounded-2xl p-4"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title={`Machine Selection (${machines.length})`} icon={Cpu}>
                                    <div className="flex flex-wrap gap-2">
                                        {machines.map((m) => (
                                            <span key={m}
                                                className="text-xs font-medium px-3 py-1.5 rounded-full"
                                                style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </Section>
                            </div>
                        )}

                        {/* Requirements */}
                        {requirements.length > 0 && (
                            <div className="rounded-2xl p-4"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title={`Requirements (${requirements.length})`} icon={CheckSquare}>
                                    <div className="flex flex-wrap gap-2">
                                        {requirements.map((r) => (
                                            <span key={r}
                                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                                                style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.15)" }}>
                                                <span className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px]"
                                                    style={{ background: "#22c55e", color: "#000" }}>✓</span>
                                                {r}
                                            </span>
                                        ))}
                                    </div>
                                </Section>
                            </div>
                        )}

                        {/* Additional Notes */}
                        {notes && notes !== "-" && (
                            <div className="rounded-2xl p-4"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title="Additional Notes" icon={StickyNote}>
                                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                                        {notes}
                                    </p>
                                </Section>
                            </div>
                        )}
                    </>
                ) : (
                    /* Plain message (from homepage CTA form) */
                    <>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl p-4"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title="Contact Info" icon={User}>
                                    <div className="space-y-3">
                                        <InfoRow icon={Mail}      label="Email"   value={application.email} />
                                        <InfoRow icon={Building2} label="Company" value={application.companyName} />
                                        <InfoRow icon={MapPin}    label="Address" value={application.companyAddress} />
                                    </div>
                                </Section>
                            </div>
                            <div className="rounded-2xl p-4"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Section title="Company Email" icon={Mail}>
                                    <InfoRow icon={Mail} label="Company Email" value={application.companyEmail} />
                                </Section>
                            </div>
                        </div>

                        <div className="rounded-2xl p-4"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <Section title="Message" icon={StickyNote}>
                                <p className="text-sm leading-relaxed whitespace-pre-line"
                                    style={{ color: "rgba(255,255,255,0.7)" }}>
                                    {application.message}
                                </p>
                            </Section>
                        </div>
                    </>
                )}

                {/* Close button */}
                <button onClick={onClose}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ApplicationDetailPopup;
