import mongoose from "mongoose";

const financeApplicationSchema = new mongoose.Schema({
    // Application info
    applicationNo: { type: String, trim: true },
    submissionDate: { type: String },
    branchAgent: { type: String, trim: true },

    // Section 1: Applicant
    companyName: { type: String, required: true, trim: true },
    applicantName: { type: String, required: true, trim: true },
    positionTitle: { type: String, trim: true },
    businessRegNo: { type: String, trim: true },
    taxIdVatNo: { type: String, trim: true },
    country: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    emailAddress: { type: String, required: true, lowercase: true, trim: true },
    website: { type: String, trim: true },
    yearsInBusiness: { type: String, trim: true },
    businessAddress: { type: String, trim: true },
    factoryAddress: { type: String, trim: true },
    natureOfBusiness: { type: String, trim: true },

    // Section 2: Machine Financing
    machineModel: { type: String, required: true, trim: true },
    machineType: { type: String, trim: true },
    machinePrice: { type: String, trim: true },
    downPaymentAmount: { type: String, trim: true },
    requestedLoanAmount: { type: String, trim: true },
    preferredMonthlyInstallment: { type: String, trim: true },
    purposeOfPurchase: { type: String, trim: true },
    financingPeriod: { type: String, trim: true },

    // Section 3: Bank Info
    bankName: { type: String, trim: true },
    branchName: { type: String, trim: true },
    accountName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    swiftCode: { type: String, trim: true },
    ibanNumber: { type: String, trim: true },
    relationshipWithBankSince: { type: String, trim: true },
    averageMonthlyTurnover: { type: String, trim: true },
    bankAddress: { type: String, trim: true },

    // Section 4: Required Docs (Yes/No)
    docBusinessRegCert: { type: String },
    docCompanyFinancialStatement: { type: String },
    docCompanyTaxCert: { type: String },
    docFactoryOfficePhotos: { type: String },
    docOwnerPassport: { type: String },
    docExistingLoanInfo: { type: String },
    docLast6MonthsReport: { type: String },
    docPurchaseQuotation: { type: String },

    // Section 5: Declarations
    decl1: { type: Boolean, default: false },
    decl2: { type: Boolean, default: false },
    decl3: { type: Boolean, default: false },

    // Section 6: Guarantor
    guarantorName: { type: String, trim: true },
    guarantorContactPerson: { type: String, trim: true },
    guarantorTelephone: { type: String, trim: true },
    guarantorRelationship: { type: String, trim: true },
    guarantorAddress: { type: String, trim: true },
    guarantorFinancialResponsibility: { type: String },

    // Section 8: Signature
    signerName: { type: String, trim: true },
    signerPosition: { type: String, trim: true },
    signDate: { type: String },
    companyStamp: { type: String, trim: true },

    // Section 9: Office Use
    applicationReceivedDate: { type: String },
    reviewedBy: { type: String, trim: true },
    approvedLoanAmount: { type: String, trim: true },
    approvedFinancingPeriod: { type: String, trim: true },
    officeInterestRate: { type: String, trim: true },
    remarks: { type: String, trim: true },
    creditEvaluationResult: { type: String },

    // Attachments
    attLast6MonthsBank: { type: Boolean, default: false },
    attCompanyRegDocs: { type: Boolean, default: false },
    attTaxDocuments: { type: Boolean, default: false },
    attCncMachineQuotation: { type: Boolean, default: false },
    attPassportId: { type: Boolean, default: false },
    attFinancialStatements: { type: Boolean, default: false },

    // Status
    status: { type: String, enum: ["pending", "under_review", "approved", "rejected"], default: "pending" },

}, { timestamps: true });

export const FinanceApplication = mongoose.models.FinanceApplication ||
    mongoose.model("FinanceApplication", financeApplicationSchema);
