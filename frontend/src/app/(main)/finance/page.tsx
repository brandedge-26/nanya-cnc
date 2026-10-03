import type { Metadata } from "next";
import FinanceClient from "./FinanceClient";

export const metadata: Metadata = {
    title: "CNC Machine Financing & EMI Calculator",
    description:
        "Calculate your CNC machine EMI instantly or apply for NANYA CNC's flexible financing plans. Smart investment options for modern manufacturing expansion.",
    alternates: {
        canonical: "/finance",
    },
    openGraph: {
        title: "CNC Machine Financing & EMI Calculator | NANYA CNC",
        description:
            "Calculate your CNC machine EMI instantly or apply for NANYA CNC's flexible financing plans.",
        url: "/finance",
        type: "website",
    },
};

const FinancePage = () => {
    return <FinanceClient />;
};

export default FinancePage;
