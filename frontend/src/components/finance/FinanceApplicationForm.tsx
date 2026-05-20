"use client";

import { useState } from "react";
import { Printer, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/config/axios";

interface FormData {
    // Application info
    applicationNo: string;
    submissionDate: string;
    branchAgent: string;
    // Section 1: Applicant
    companyName: string;
    applicantName: string;
    positionTitle: string;
    businessRegNo: string;
    taxIdVatNo: string;
    country: string;
    contactNumber: string;
    emailAddress: string;
    website: string;
    yearsInBusiness: string;
    businessAddress: string;
    factoryAddress: string;
    natureOfBusiness: string;
    // Section 2: Machine Financing
    machineModel: string;
    machineType: string;
    machinePrice: string;
    downPaymentAmount: string;
    requestedLoanAmount: string;
    preferredMonthlyInstallment: string;
    purposeOfPurchase: string;
    financingPeriod: string;
    // Section 3: Bank Info
    bankName: string;
    branchName: string;
    accountName: string;
    accountNumber: string;
    swiftCode: string;
    ibanNumber: string;
    relationshipWithBankSince: string;
    averageMonthlyTurnover: string;
    bankAddress: string;
    // Section 4: Required Docs
    docBusinessRegCert: string;
    docCompanyFinancialStatement: string;
    docCompanyTaxCert: string;
    docFactoryOfficePhotos: string;
    docOwnerPassport: string;
    docExistingLoanInfo: string;
    docLast6MonthsReport: string;
    docPurchaseQuotation: string;
    // Section 5: Declarations
    decl1: boolean;
    decl2: boolean;
    decl3: boolean;
    // Section 6: Guarantor
    guarantorName: string;
    guarantorContactPerson: string;
    guarantorTelephone: string;
    guarantorRelationship: string;
    guarantorAddress: string;
    guarantorFinancialResponsibility: string;
    // Section 8: Signature
    signerName: string;
    signerPosition: string;
    signDate: string;
    companyStamp: string;
    // Section 9: Office Use
    applicationReceivedDate: string;
    reviewedBy: string;
    approvedLoanAmount: string;
    approvedFinancingPeriod: string;
    officeInterestRate: string;
    remarks: string;
    creditEvaluationResult: string;
    // Attachments
    attLast6MonthsBank: boolean;
    attCompanyRegDocs: boolean;
    attTaxDocuments: boolean;
    attCncMachineQuotation: boolean;
    attPassportId: boolean;
    attFinancialStatements: boolean;
}

const defaultForm: FormData = {
    applicationNo: "", submissionDate: "", branchAgent: "",
    companyName: "", applicantName: "", positionTitle: "", businessRegNo: "", taxIdVatNo: "",
    country: "", contactNumber: "", emailAddress: "", website: "", yearsInBusiness: "",
    businessAddress: "", factoryAddress: "", natureOfBusiness: "",
    machineModel: "", machineType: "", machinePrice: "", downPaymentAmount: "",
    requestedLoanAmount: "", preferredMonthlyInstallment: "", purposeOfPurchase: "", financingPeriod: "",
    bankName: "", branchName: "", accountName: "", accountNumber: "", swiftCode: "", ibanNumber: "",
    relationshipWithBankSince: "", averageMonthlyTurnover: "", bankAddress: "",
    docBusinessRegCert: "", docCompanyFinancialStatement: "", docCompanyTaxCert: "",
    docFactoryOfficePhotos: "", docOwnerPassport: "", docExistingLoanInfo: "",
    docLast6MonthsReport: "", docPurchaseQuotation: "",
    decl1: false, decl2: false, decl3: false,
    guarantorName: "", guarantorContactPerson: "", guarantorTelephone: "",
    guarantorRelationship: "", guarantorAddress: "", guarantorFinancialResponsibility: "",
    signerName: "", signerPosition: "", signDate: "", companyStamp: "",
    applicationReceivedDate: "", reviewedBy: "", approvedLoanAmount: "",
    approvedFinancingPeriod: "", officeInterestRate: "", remarks: "", creditEvaluationResult: "",
    attLast6MonthsBank: false, attCompanyRegDocs: false, attTaxDocuments: false,
    attCncMachineQuotation: false, attPassportId: false, attFinancialStatements: false,
};

const inputStyle = {
    background: "transparent",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    color: "#fff",
    outline: "none",
    width: "100%",
    padding: "4px 0",
    fontSize: "13px",
};

const labelStyle = {
    color: "rgba(255,255,255,0.45)",
    fontSize: "10px",
    fontWeight: "600" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    display: "block",
    marginBottom: "4px",
};

const sectionTitleStyle = {
    color: "#f98513",
    fontSize: "12px",
    fontWeight: "700" as const,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #f98513",
    paddingBottom: "6px",
    marginBottom: "16px",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            {children}
        </div>
    );
}

function YesNo({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex items-center gap-4 mt-1">
            {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="radio"
                        checked={value === opt}
                        onChange={() => onChange(opt)}
                        className="accent-orange-500 cursor-pointer"
                    />
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{opt}</span>
                </label>
            ))}
        </div>
    );
}

function DocRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex items-center justify-between py-1.5">
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", fontWeight: "600" }}>{label}</span>
            <YesNo value={value} onChange={onChange} />
        </div>
    );
}

export default function FinanceApplicationForm() {
    const [form, setForm] = useState<FormData>(defaultForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const val = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        setForm((f) => ({ ...f, [key]: val }));
    };

    const setVal = (key: keyof FormData, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

    const handlePrint = () => {
        window.print();
    };

    const handleSubmit = async () => {
        if (!form.companyName || !form.applicantName || !form.emailAddress || !form.machineModel) {
            toast.error("Please fill in at least: Company Name, Applicant Name, Email, and Machine Model.");
            return;
        }
        setIsSubmitting(true);
        try {
            await api.post("/finance-applications/submit", form);
            setSubmitted(true);
            toast.success("Finance application submitted successfully!");
        } catch {
            toast.error("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34,197,94,0.12)" }}>
                    <CheckCircle size={32} style={{ color: "#22c55e" }} />
                </div>
                <h2 className="text-xl font-bold text-white">Application Submitted!</h2>
                <p className="text-sm text-center max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Your CNC Finance Application has been submitted successfully. Our team will review it and contact you soon.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setForm(defaultForm); }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all"
                    style={{ background: "#f98513" }}
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Print button */}
            <div className="flex justify-end mb-6 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513", border: "1px solid rgba(249,133,19,0.3)" }}
                >
                    <Printer size={15} strokeWidth={2} />
                    Print / Save as PDF
                </button>
            </div>

            {/* Form */}
            <div className="rounded-2xl p-6 sm:p-8 space-y-8 print:p-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>

                {/* Form Header */}
                <div className="text-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>www.nye-cnc.com | www.nanya-ent.com</p>
                    <h1 className="text-2xl font-bold text-white mb-1">CNC FINANCE APPLICATION FORM</h1>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>For CNC Machine Financing / Equipment Loan Approval</p>
                </div>

                {/* Top meta fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Field label="Application No.">
                        <input style={inputStyle} value={form.applicationNo} onChange={set("applicationNo")} />
                    </Field>
                    <Field label="Submission Date">
                        <input type="date" style={inputStyle} value={form.submissionDate} onChange={set("submissionDate")} />
                    </Field>
                    <Field label="Branch / Agent">
                        <input style={inputStyle} value={form.branchAgent} onChange={set("branchAgent")} />
                    </Field>
                </div>

                {/* Section 1 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>1</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Applicant / Buyer Information</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Company Name"><input style={inputStyle} value={form.companyName} onChange={set("companyName")} /></Field>
                        <Field label="Applicant Name"><input style={inputStyle} value={form.applicantName} onChange={set("applicantName")} /></Field>
                        <Field label="Position / Title"><input style={inputStyle} value={form.positionTitle} onChange={set("positionTitle")} /></Field>
                        <Field label="Business Registration No."><input style={inputStyle} value={form.businessRegNo} onChange={set("businessRegNo")} /></Field>
                        <Field label="Tax ID / VAT No."><input style={inputStyle} value={form.taxIdVatNo} onChange={set("taxIdVatNo")} /></Field>
                        <Field label="Country"><input style={inputStyle} value={form.country} onChange={set("country")} /></Field>
                        <Field label="Contact Number"><input style={inputStyle} value={form.contactNumber} onChange={set("contactNumber")} /></Field>
                        <Field label="Email Address"><input type="email" style={inputStyle} value={form.emailAddress} onChange={set("emailAddress")} /></Field>
                        <Field label="Website"><input style={inputStyle} value={form.website} onChange={set("website")} /></Field>
                        <Field label="Years in Business"><input style={inputStyle} value={form.yearsInBusiness} onChange={set("yearsInBusiness")} /></Field>
                        <div className="sm:col-span-2">
                            <Field label="Business Address"><input style={inputStyle} value={form.businessAddress} onChange={set("businessAddress")} /></Field>
                        </div>
                        <div className="sm:col-span-2">
                            <Field label="Factory Address"><input style={inputStyle} value={form.factoryAddress} onChange={set("factoryAddress")} /></Field>
                        </div>
                        <div className="sm:col-span-2">
                            <Field label="Nature of Business"><input style={inputStyle} value={form.natureOfBusiness} onChange={set("natureOfBusiness")} /></Field>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>2</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">CNC Machine Financing Details</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label style={labelStyle}>Machine Brand</label>
                            <p className="text-sm font-bold" style={{ color: "#f98513", padding: "4px 0" }}>NANYA CNC</p>
                        </div>
                        <Field label="Machine Model">
                            <select style={{ ...inputStyle }} value={form.machineModel} onChange={set("machineModel")}>
                                <option value="" style={{ background: "#1a1a1a" }}>Select model</option>
                                <option value="NV-855" style={{ background: "#1a1a1a" }}>NV-855</option>
                                <option value="NV-1165" style={{ background: "#1a1a1a" }}>NV-1165</option>
                                <option value="NV-1370" style={{ background: "#1a1a1a" }}>NV-1370</option>
                            </select>
                        </Field>
                        <Field label="Machine Type"><input style={inputStyle} value={form.machineType} onChange={set("machineType")} placeholder="e.g. Vertical Machine Center" /></Field>
                        <Field label="Machine Price (USD)"><input style={inputStyle} value={form.machinePrice} onChange={set("machinePrice")} placeholder="e.g. 38000" /></Field>
                        <Field label="Down Payment Amount (USD)"><input style={inputStyle} value={form.downPaymentAmount} onChange={set("downPaymentAmount")} /></Field>
                        <Field label="Requested Loan Amount (USD)"><input style={inputStyle} value={form.requestedLoanAmount} onChange={set("requestedLoanAmount")} /></Field>
                        <Field label="Preferred Monthly Installment"><input style={inputStyle} value={form.preferredMonthlyInstallment} onChange={set("preferredMonthlyInstallment")} /></Field>
                        <Field label="Purpose of Purchase"><input style={inputStyle} value={form.purposeOfPurchase} onChange={set("purposeOfPurchase")} /></Field>
                        <div className="sm:col-span-2">
                            <label style={labelStyle}>Financing Period</label>
                            <div className="flex flex-wrap gap-6 mt-1">
                                {["6 Months", "12 Months", "18 Months", "24 Months"].map((p) => (
                                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="financingPeriod" value={p}
                                            checked={form.financingPeriod === p}
                                            onChange={() => setVal("financingPeriod", p)}
                                            className="accent-orange-500 cursor-pointer" />
                                        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>3</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Buyer Bank Information</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Bank Name"><input style={inputStyle} value={form.bankName} onChange={set("bankName")} /></Field>
                        <Field label="Branch Name"><input style={inputStyle} value={form.branchName} onChange={set("branchName")} /></Field>
                        <Field label="Account Name"><input style={inputStyle} value={form.accountName} onChange={set("accountName")} /></Field>
                        <Field label="Account Number"><input style={inputStyle} value={form.accountNumber} onChange={set("accountNumber")} /></Field>
                        <Field label="SWIFT Code"><input style={inputStyle} value={form.swiftCode} onChange={set("swiftCode")} /></Field>
                        <Field label="IBAN Number"><input style={inputStyle} value={form.ibanNumber} onChange={set("ibanNumber")} /></Field>
                        <Field label="Relationship with Bank Since"><input style={inputStyle} value={form.relationshipWithBankSince} onChange={set("relationshipWithBankSince")} /></Field>
                        <Field label="Average Monthly Turnover (USD)"><input style={inputStyle} value={form.averageMonthlyTurnover} onChange={set("averageMonthlyTurnover")} /></Field>
                        <div className="sm:col-span-2">
                            <Field label="Bank Address"><input style={inputStyle} value={form.bankAddress} onChange={set("bankAddress")} /></Field>
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>4</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Required Financial Documents</p>
                    </div>
                    <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                        The Applicant agrees to provide the following documents for loan approval evaluation:
                    </p>
                    <div className="space-y-1 rounded-xl p-4" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <div className="py-1 sm:pr-6">
                                <DocRow label="Business Registration Certificate" value={form.docBusinessRegCert} onChange={(v) => setVal("docBusinessRegCert", v)} />
                                <DocRow label="Company Tax Certificate" value={form.docCompanyTaxCert} onChange={(v) => setVal("docCompanyTaxCert", v)} />
                                <DocRow label="Owner / Director Passport or ID" value={form.docOwnerPassport} onChange={(v) => setVal("docOwnerPassport", v)} />
                                <DocRow label="Last 6 Months Bank Transaction Report" value={form.docLast6MonthsReport} onChange={(v) => setVal("docLast6MonthsReport", v)} />
                            </div>
                            <div className="py-1 sm:pl-6" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                                <DocRow label="Company Financial Statement" value={form.docCompanyFinancialStatement} onChange={(v) => setVal("docCompanyFinancialStatement", v)} />
                                <DocRow label="Factory / Office Photos" value={form.docFactoryOfficePhotos} onChange={(v) => setVal("docFactoryOfficePhotos", v)} />
                                <DocRow label="Existing Loan Information" value={form.docExistingLoanInfo} onChange={(v) => setVal("docExistingLoanInfo", v)} />
                                <DocRow label="Purchase Quotation / Proforma Invoice" value={form.docPurchaseQuotation} onChange={(v) => setVal("docPurchaseQuotation", v)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 5 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>5</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Last 6 Months Bank Transaction Declaration</p>
                    </div>
                    <div className="space-y-3">
                        {[
                            { key: "decl1" as const, text: "The submitted bank transaction reports are true and valid." },
                            { key: "decl2" as const, text: "All financial information provided is accurate and complete." },
                            { key: "decl3" as const, text: "The lender, seller, or financing guarantor may verify banking records with the related financial institution if necessary." },
                        ].map(({ key, text }) => (
                            <label key={key} className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={form[key] as boolean}
                                    onChange={(e) => setVal(key, e.target.checked)}
                                    className="mt-0.5 accent-blue-500 cursor-pointer flex-shrink-0" />
                                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>{text}</span>
                            </label>
                        ))}
                        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.3)" }}>
                            The Applicant hereby confirms the above declarations by signature in Section 8.
                        </p>
                    </div>
                </div>

                {/* Section 6 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>6</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Guarantor Information (If Applicable)</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Guarantor Company / Name"><input style={inputStyle} value={form.guarantorName} onChange={set("guarantorName")} /></Field>
                        <Field label="Contact Person"><input style={inputStyle} value={form.guarantorContactPerson} onChange={set("guarantorContactPerson")} /></Field>
                        <Field label="Telephone Number"><input style={inputStyle} value={form.guarantorTelephone} onChange={set("guarantorTelephone")} /></Field>
                        <Field label="Relationship to Buyer"><input style={inputStyle} value={form.guarantorRelationship} onChange={set("guarantorRelationship")} /></Field>
                        <div className="sm:col-span-2">
                            <Field label="Address"><input style={inputStyle} value={form.guarantorAddress} onChange={set("guarantorAddress")} /></Field>
                        </div>
                        <div className="sm:col-span-2">
                            <label style={labelStyle}>Financial Responsibility Accepted</label>
                            <YesNo value={form.guarantorFinancialResponsibility} onChange={(v) => setVal("guarantorFinancialResponsibility", v)} />
                        </div>
                    </div>
                </div>

                {/* Section 7 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>7</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Declaration & Consent</p>
                    </div>
                    <div className="space-y-2">
                        {[
                            "All information submitted in this application is true and correct.",
                            "I / We authorize the financing company, seller, and guarantor to review financial and banking information for loan evaluation purposes.",
                            "I / We understand that loan approval is subject to financial review and internal approval policy.",
                            "Submission of this application does not guarantee financing approval.",
                            "In case of financing approval, the Applicant agrees to comply with all financing contract terms and repayment obligations.",
                        ].map((text, i) => (
                            <div key={i} className="flex gap-3">
                                <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: "#f98513" }}>0{i + 1}.</span>
                                <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 8 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "#f98513" }}>8</div>
                        <p style={sectionTitleStyle} className="flex-1 m-0">Applicant Signature</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Name"><input style={inputStyle} value={form.signerName} onChange={set("signerName")} /></Field>
                        <Field label="Position"><input style={inputStyle} value={form.signerPosition} onChange={set("signerPosition")} /></Field>
                        <Field label="Date"><input type="date" style={inputStyle} value={form.signDate} onChange={set("signDate")} /></Field>
                        <Field label="Company Stamp">
                            <div className="h-16 rounded-lg mt-1 flex items-center justify-center"
                                style={{ border: "1px dashed rgba(255,255,255,0.15)" }}>
                                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>Stamp area</span>
                            </div>
                        </Field>
                        <div className="sm:col-span-2">
                            <Field label="Authorized Signature">
                                <div className="h-14 rounded-lg mt-1"
                                    style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }} />
                            </Field>
                        </div>
                    </div>
                </div>

                {/* Section 9 */}
                <div className="rounded-xl p-5" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: "rgba(255,255,255,0.15)" }}>9</div>
                        <p className="text-xs font-semibold tracking-widest uppercase m-0" style={{ color: "rgba(255,255,255,0.35)" }}>
                            For Office Use Only
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Application Received Date"><input type="date" style={inputStyle} value={form.applicationReceivedDate} onChange={set("applicationReceivedDate")} /></Field>
                        <Field label="Reviewed By"><input style={inputStyle} value={form.reviewedBy} onChange={set("reviewedBy")} /></Field>
                        <Field label="Approved Loan Amount"><input style={inputStyle} value={form.approvedLoanAmount} onChange={set("approvedLoanAmount")} /></Field>
                        <Field label="Approved Financing Period"><input style={inputStyle} value={form.approvedFinancingPeriod} onChange={set("approvedFinancingPeriod")} /></Field>
                        <Field label="Interest Rate"><input style={inputStyle} value={form.officeInterestRate} onChange={set("officeInterestRate")} /></Field>
                        <Field label="Remarks"><input style={inputStyle} value={form.remarks} onChange={set("remarks")} /></Field>
                        <div className="sm:col-span-2">
                            <label style={labelStyle}>Credit Evaluation Result</label>
                            <div className="flex gap-6 mt-1">
                                {["Approved", "Pending", "Rejected"].map((opt) => (
                                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="creditEval" value={opt}
                                            checked={form.creditEvaluationResult === opt}
                                            onChange={() => setVal("creditEvaluationResult", opt)}
                                            className="accent-orange-500 cursor-pointer" />
                                        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attachment Requirements */}
                <div>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Attachment Requirements
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { key: "attLast6MonthsBank" as const, label: "Last 6 months official bank transaction statements" },
                            { key: "attCompanyRegDocs" as const, label: "Company registration documents" },
                            { key: "attTaxDocuments" as const, label: "Tax documents" },
                            { key: "attCncMachineQuotation" as const, label: "CNC machine quotation" },
                            { key: "attPassportId" as const, label: "Passport / ID copies" },
                            { key: "attFinancialStatements" as const, label: "Financial statements" },
                        ].map(({ key, label }) => (
                            <label key={key} className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" checked={form[key] as boolean}
                                    onChange={(e) => setVal(key, e.target.checked)}
                                    className="mt-0.5 accent-blue-500 cursor-pointer flex-shrink-0" />
                                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "11px" }}>{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs font-bold text-white">NANYA ENTERPRISE CO., LTD.</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                        No. 5F-1, No. 118, Dadun 20th Street, Xitun District, Taichung City, 407 TAIWAN ROC
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                        TEL +886-4-2669-0550 · FAX +886-4-2669-1539 · adam@nanya-ent.com · www.nye-cnc.com
                    </p>
                </div>

            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8 print:hidden">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-10 py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #f98513, #e07010)", boxShadow: "0 4px 20px rgba(249,133,19,0.35)" }}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Finance Application"
                    )}
                </button>
            </div>

            {/* Print styles */}
            <style>{`
                @media print {
                    header, nav, footer { display: none !important; }
                    body { background: white !important; }
                    * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
