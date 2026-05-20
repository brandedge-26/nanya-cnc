"use client";

import { useEffect, useState } from "react";
import {
    Search, X, FileText, Trash2, Eye,
    Loader2, ChevronDown,
} from "lucide-react";
import api from "@/config/axios";
import toast from "react-hot-toast";

interface FinanceApplication {
    _id: string;
    companyName: string;
    applicantName: string;
    emailAddress: string;
    country: string;
    machineModel: string;
    machinePrice: string;
    financingPeriod: string;
    requestedLoanAmount: string;
    status: string;
    createdAt: string;
    // all other fields
    [key: string]: string | boolean | undefined;
}

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
    pending:      { bg: "rgba(249,133,19,0.12)",  color: "#f98513",  label: "Pending" },
    under_review: { bg: "rgba(249,133,19,0.12)",  color: "#f98513",  label: "Under Review" },
    approved:     { bg: "rgba(34,197,94,0.12)",   color: "#22c55e",  label: "Approved" },
    rejected:     { bg: "rgba(239,68,68,0.12)",   color: "#ef4444",  label: "Rejected" },
};

const avatarColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs    = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3 pb-1"
                style={{ color: "#f98513", borderBottom: "1px solid rgba(249,133,19,0.3)" }}>
                {title}
            </p>
            {children}
        </div>
    );
}

function DataRow({ label, value }: { label: string; value?: string | boolean }) {
    if (!value && value !== false) return null;
    const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
    if (!display) return null;
    return (
        <div className="flex gap-3 py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <span className="text-xs flex-shrink-0 w-44" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
            <span className="text-xs font-medium text-white break-all">{display}</span>
        </div>
    );
}

function DetailModal({ app, onClose }: { app: FinanceApplication; onClose: () => void }) {
    const st = statusStyle[app.status] || statusStyle.pending;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={onClose}>
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl"
                style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)" }}
                onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a" }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                            style={{ background: avatarBgs[0], color: avatarColors[0] }}>
                            {app.applicantName?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">{app.applicantName}</p>
                            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{app.emailAddress}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
                            {st.label}
                        </span>
                        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: "calc(90vh - 80px)" }}>

                    <Section title="Application Info">
                        <DataRow label="Application No." value={app.applicationNo as string} />
                        <DataRow label="Submission Date" value={app.submissionDate as string} />
                        <DataRow label="Branch / Agent" value={app.branchAgent as string} />
                        <DataRow label="Submitted At" value={new Date(app.createdAt).toLocaleString()} />
                    </Section>

                    <Section title="Applicant / Buyer Information">
                        <DataRow label="Company Name" value={app.companyName} />
                        <DataRow label="Applicant Name" value={app.applicantName} />
                        <DataRow label="Position / Title" value={app.positionTitle as string} />
                        <DataRow label="Business Reg No." value={app.businessRegNo as string} />
                        <DataRow label="Tax ID / VAT No." value={app.taxIdVatNo as string} />
                        <DataRow label="Country" value={app.country} />
                        <DataRow label="Contact Number" value={app.contactNumber as string} />
                        <DataRow label="Email Address" value={app.emailAddress} />
                        <DataRow label="Website" value={app.website as string} />
                        <DataRow label="Years in Business" value={app.yearsInBusiness as string} />
                        <DataRow label="Business Address" value={app.businessAddress as string} />
                        <DataRow label="Factory Address" value={app.factoryAddress as string} />
                        <DataRow label="Nature of Business" value={app.natureOfBusiness as string} />
                    </Section>

                    <Section title="CNC Machine Financing Details">
                        <DataRow label="Machine Brand" value="NANYA CNC" />
                        <DataRow label="Machine Model" value={app.machineModel} />
                        <DataRow label="Machine Type" value={app.machineType as string} />
                        <DataRow label="Machine Price (USD)" value={app.machinePrice} />
                        <DataRow label="Down Payment Amount" value={app.downPaymentAmount as string} />
                        <DataRow label="Requested Loan Amount" value={app.requestedLoanAmount} />
                        <DataRow label="Preferred Monthly Installment" value={app.preferredMonthlyInstallment as string} />
                        <DataRow label="Purpose of Purchase" value={app.purposeOfPurchase as string} />
                        <DataRow label="Financing Period" value={app.financingPeriod} />
                    </Section>

                    <Section title="Buyer Bank Information">
                        <DataRow label="Bank Name" value={app.bankName as string} />
                        <DataRow label="Branch Name" value={app.branchName as string} />
                        <DataRow label="Account Name" value={app.accountName as string} />
                        <DataRow label="Account Number" value={app.accountNumber as string} />
                        <DataRow label="SWIFT Code" value={app.swiftCode as string} />
                        <DataRow label="IBAN Number" value={app.ibanNumber as string} />
                        <DataRow label="Bank Since" value={app.relationshipWithBankSince as string} />
                        <DataRow label="Avg. Monthly Turnover" value={app.averageMonthlyTurnover as string} />
                        <DataRow label="Bank Address" value={app.bankAddress as string} />
                    </Section>

                    <Section title="Required Financial Documents">
                        <DataRow label="Business Reg. Certificate" value={app.docBusinessRegCert as string} />
                        <DataRow label="Company Financial Statement" value={app.docCompanyFinancialStatement as string} />
                        <DataRow label="Company Tax Certificate" value={app.docCompanyTaxCert as string} />
                        <DataRow label="Factory / Office Photos" value={app.docFactoryOfficePhotos as string} />
                        <DataRow label="Owner / Director Passport" value={app.docOwnerPassport as string} />
                        <DataRow label="Existing Loan Information" value={app.docExistingLoanInfo as string} />
                        <DataRow label="Last 6M Bank Report" value={app.docLast6MonthsReport as string} />
                        <DataRow label="Purchase Quotation" value={app.docPurchaseQuotation as string} />
                    </Section>

                    {(app.guarantorName as string) && (
                        <Section title="Guarantor Information">
                            <DataRow label="Guarantor Name" value={app.guarantorName as string} />
                            <DataRow label="Contact Person" value={app.guarantorContactPerson as string} />
                            <DataRow label="Telephone" value={app.guarantorTelephone as string} />
                            <DataRow label="Relationship to Buyer" value={app.guarantorRelationship as string} />
                            <DataRow label="Address" value={app.guarantorAddress as string} />
                            <DataRow label="Financial Responsibility" value={app.guarantorFinancialResponsibility as string} />
                        </Section>
                    )}

                    <Section title="Applicant Signature">
                        <DataRow label="Signer Name" value={app.signerName as string} />
                        <DataRow label="Position" value={app.signerPosition as string} />
                        <DataRow label="Date" value={app.signDate as string} />
                    </Section>

                    {(app.reviewedBy as string || app.creditEvaluationResult as string) && (
                        <Section title="Office Use Only">
                            <DataRow label="Application Received" value={app.applicationReceivedDate as string} />
                            <DataRow label="Reviewed By" value={app.reviewedBy as string} />
                            <DataRow label="Approved Loan Amount" value={app.approvedLoanAmount as string} />
                            <DataRow label="Approved Financing Period" value={app.approvedFinancingPeriod as string} />
                            <DataRow label="Interest Rate" value={app.officeInterestRate as string} />
                            <DataRow label="Remarks" value={app.remarks as string} />
                            <DataRow label="Credit Evaluation Result" value={app.creditEvaluationResult as string} />
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
}


// ── Main Table ────────────────────────────────────────────────────────────────
const FinanceApplicationsTable = () => {
    const [applications, setApplications] = useState<FinanceApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedApp, setSelectedApp] = useState<FinanceApplication | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/finance-applications/get-all");
            setApplications(res.data.data || []);
        } catch {
            toast.error("Failed to load finance applications.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this finance application?")) return;
        try {
            setDeletingId(id);
            await api.delete(`/finance-applications/${id}/delete`);
            setApplications((prev) => prev.filter((a) => a._id !== id));
            toast.success("Application deleted.");
        } catch {
            toast.error("Failed to delete application.");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = applications.filter((app) => {
        const matchesSearch =
            app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.machineModel?.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;
        if (statusFilter === "All") return true;
        return app.status === statusFilter;
    });

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <FileText size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Finance Applications</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${applications.length} applications received`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    {/* Status filter */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-3 pr-8 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer appearance-none"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            <option value="All" className="bg-[#0A0A0A]">All Status</option>
                            <option value="pending" className="bg-[#0A0A0A]">Pending</option>
                            <option value="under_review" className="bg-[#0A0A0A]">Under Review</option>
                            <option value="approved" className="bg-[#0A0A0A]">Approved</option>
                            <option value="rejected" className="bg-[#0A0A0A]">Rejected</option>
                        </select>
                        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search company, name, model…"
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

            {/* Table / States */}
            {isLoading ? (
                <div className="flex items-center justify-center py-24 gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading applications…</span>
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 rounded-2xl"
                    style={{ border: "1px dashed rgba(255,255,255,0.08)" }}>
                    <FileText size={40} style={{ color: "rgba(255,255,255,0.12)" }} />
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {searchTerm || statusFilter !== "All" ? "No results found" : "No finance applications yet"}
                    </p>
                    {(searchTerm || statusFilter !== "All") && (
                        <button onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                            className="text-xs text-blue-400 hover:text-blue-300 transition cursor-pointer">
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <table className="w-full">
                        <thead>
                            <tr style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                {["#", "Applicant", "Company", "Machine", "Loan Amount", "Period", "Status", "Date", "Actions"].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold tracking-widest uppercase"
                                        style={{ color: "rgba(255,255,255,0.35)" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((app, i) => {
                                const st = statusStyle[app.status] || statusStyle.pending;
                                const colorIdx = i % avatarColors.length;
                                return (
                                    <tr key={app._id}
                                        className="transition-all"
                                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <td className="px-4 py-3 text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                                            #{String(i + 1).padStart(3, "0")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                                    style={{ background: avatarBgs[colorIdx], color: avatarColors[colorIdx] }}>
                                                    {app.applicantName?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-white leading-tight">{app.applicantName}</p>
                                                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{app.emailAddress}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-white">{app.companyName || "-"}</td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                                style={{ background: "rgba(249,133,19,0.1)", color: "#f98513" }}>
                                                {app.machineModel || "-"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                                            {app.requestedLoanAmount ? `$${app.requestedLoanAmount}` : "-"}
                                        </td>
                                        <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                                            {app.financingPeriod || "-"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                                                style={{ background: st.bg, color: st.color }}>
                                                {st.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setSelectedApp(app)}
                                                    title="View Details"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                    style={{ color: "#f98513" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(249,133,19,0.12)"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                                    <Eye size={14} strokeWidth={2} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(app._id)}
                                                    title="Delete"
                                                    disabled={deletingId === app._id}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                                                    style={{ color: "#ef4444" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                                    {deletingId === app._id
                                                        ? <Loader2 size={14} className="animate-spin" />
                                                        : <Trash2 size={14} strokeWidth={2} />}
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

            {!isLoading && filtered.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filtered.length} of {applications.length} applications
                </p>
            )}

            {/* Detail Modal */}
            {selectedApp && <DetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
        </div>
    );
};

export default FinanceApplicationsTable;
