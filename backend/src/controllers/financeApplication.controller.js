import { FinanceApplication } from "../models/FinanceApplication.js";
import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";


// ── Email helper ──────────────────────────────────────────────────────────────
const sendFinanceEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: ENV.SENDER_EMAIL, pass: ENV.SENDER_PASS },
    });

    const row = (label, value) =>
        value ? `<tr><td style="padding:6px 12px;color:#888;font-size:12px;width:200px;vertical-align:top;">${label}</td><td style="padding:6px 12px;color:#fff;font-size:12px;">${value}</td></tr>` : "";

    const section = (title, rows) =>
        `<tr><td colspan="2" style="padding:12px;background:#1a1a1a;color:#f98513;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;border-top:1px solid #333;">${title}</td></tr>${rows.filter(Boolean).join("")}`;

    const html = `
    <div style="font-family:Arial,sans-serif;background:#0d0d0d;padding:24px;border-radius:12px;max-width:700px;margin:0 auto;">
      <div style="background:#111;border-radius:8px;overflow:hidden;border:1px solid #222;">
        <div style="background:#0a0a0a;padding:20px 24px;border-bottom:1px solid #222;text-align:center;">
          <h1 style="color:#f98513;font-size:18px;margin:0 0 4px;">NANYA CNC</h1>
          <p style="color:#fff;font-size:15px;font-weight:700;margin:0 0 4px;">New Finance Application Received</p>
          <p style="color:#666;font-size:12px;margin:0;">${new Date().toLocaleString()}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${section("Application Info", [
        row("Application No.", data.applicationNo),
        row("Submission Date", data.submissionDate),
        row("Branch / Agent", data.branchAgent),
    ])}
          ${section("Applicant / Buyer Information", [
        row("Company Name", data.companyName),
        row("Applicant Name", data.applicantName),
        row("Position / Title", data.positionTitle),
        row("Business Reg No.", data.businessRegNo),
        row("Tax ID / VAT No.", data.taxIdVatNo),
        row("Country", data.country),
        row("Contact Number", data.contactNumber),
        row("Email Address", data.emailAddress),
        row("Website", data.website),
        row("Years in Business", data.yearsInBusiness),
        row("Business Address", data.businessAddress),
        row("Factory Address", data.factoryAddress),
        row("Nature of Business", data.natureOfBusiness),
    ])}
          ${section("CNC Machine Financing Details", [
        row("Machine Brand", "NANYA CNC"),
        row("Machine Model", data.machineModel),
        row("Machine Type", data.machineType),
        row("Machine Price (USD)", data.machinePrice),
        row("Down Payment Amount", data.downPaymentAmount),
        row("Requested Loan Amount", data.requestedLoanAmount),
        row("Preferred Monthly Installment", data.preferredMonthlyInstallment),
        row("Purpose of Purchase", data.purposeOfPurchase),
        row("Financing Period", data.financingPeriod),
    ])}
          ${section("Buyer Bank Information", [
        row("Bank Name", data.bankName),
        row("Branch Name", data.branchName),
        row("Account Name", data.accountName),
        row("Account Number", data.accountNumber),
        row("SWIFT Code", data.swiftCode),
        row("IBAN Number", data.ibanNumber),
        row("Relationship with Bank Since", data.relationshipWithBankSince),
        row("Average Monthly Turnover", data.averageMonthlyTurnover),
        row("Bank Address", data.bankAddress),
    ])}
          ${section("Required Financial Documents", [
        row("Business Registration Certificate", data.docBusinessRegCert),
        row("Company Financial Statement", data.docCompanyFinancialStatement),
        row("Company Tax Certificate", data.docCompanyTaxCert),
        row("Factory / Office Photos", data.docFactoryOfficePhotos),
        row("Owner / Director Passport or ID", data.docOwnerPassport),
        row("Existing Loan Information", data.docExistingLoanInfo),
        row("Last 6 Months Bank Report", data.docLast6MonthsReport),
        row("Purchase Quotation / Proforma Invoice", data.docPurchaseQuotation),
    ])}
          ${section("Guarantor Information", [
        row("Guarantor Name / Company", data.guarantorName),
        row("Contact Person", data.guarantorContactPerson),
        row("Telephone Number", data.guarantorTelephone),
        row("Relationship to Buyer", data.guarantorRelationship),
        row("Address", data.guarantorAddress),
        row("Financial Responsibility Accepted", data.guarantorFinancialResponsibility),
    ])}
          ${section("Applicant Signature", [
        row("Name", data.signerName),
        row("Position", data.signerPosition),
        row("Date", data.signDate),
    ])}
        </table>
        <div style="padding:16px 24px;background:#0a0a0a;border-top:1px solid #222;text-align:center;">
          <p style="color:#444;font-size:11px;margin:0;">NANYA ENTERPRISE CO., LTD. · No. 5F-1, No. 118, Dadun 20th Street, Xitun District, Taichung City, 407 TAIWAN ROC</p>
        </div>
      </div>
    </div>`;

    const recipients = ["att0905@gmail.com"];
    if (data.emailAddress) recipients.push(data.emailAddress);

    await transporter.sendMail({
        from: `"NANYA CNC Finance" <${ENV.SENDER_EMAIL}>`,
        to: recipients,
        subject: `[Finance Application] ${data.companyName} - ${data.machineModel} - ${data.financingPeriod || "N/A"}`,
        html,
    });
};


// ── Controllers ───────────────────────────────────────────────────────────────

const submitFinanceApplicationController = async (req, res, next) => {
    try {
        const { companyName, applicantName, emailAddress, machineModel } = req.body;

        if (!companyName || !applicantName || !emailAddress || !machineModel) {
            return res.status(400).json({
                success: false,
                message: "Company Name, Applicant Name, Email Address, and Machine Model are required.",
            });
        }

        const application = await FinanceApplication.create(req.body);

        // Send email (non-blocking failure)
        try {
            await sendFinanceEmail(req.body);
        } catch (emailErr) {
            console.error("Finance email send failed:", emailErr.message);
        }

        return res.status(201).json({
            success: true,
            message: "Finance application submitted successfully!",
            data: application,
        });
    } catch (err) {
        next(err);
    }
};


const getAllFinanceApplicationsController = async (req, res, next) => {
    try {
        const applications = await FinanceApplication.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: applications });
    } catch (err) {
        next(err);
    }
};


const deleteFinanceApplicationController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const app = await FinanceApplication.findById(id);
        if (!app) {
            return res.status(404).json({ success: false, message: "Application not found." });
        }
        await FinanceApplication.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Application deleted successfully." });
    } catch (err) {
        next(err);
    }
};


export {
    submitFinanceApplicationController,
    getAllFinanceApplicationsController,
    deleteFinanceApplicationController,
};
