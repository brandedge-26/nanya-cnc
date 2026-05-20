"use client";

import { useState } from "react";
import { Calculator, FileText } from "lucide-react";
import InstallmentCalculator from "@/components/finance/InstallmentCalculator";
import FinanceApplicationForm from "@/components/finance/FinanceApplicationForm";

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState<"calculator" | "form">("calculator");

    return (
        <div className="min-h-screen" style={{ background: "#0a0a0a" }}>

            {/* ── Page Hero / Tab Header ── */}
            <div className="relative overflow-hidden" style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Grid bg */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.04) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }} />
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(249,133,19,0.12) 0%, transparent 70%)"
                }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-0">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
                            style={{ background: "rgba(249,133,19,0.12)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                            CNC Machine Financing — 2026
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            NANYA CNC <span style={{ color: "#f98513" }}>EZ Financing</span>
                        </h1>
                        <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Smart Investment for Modern Manufacturing Expansion
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center">
                        <div className="flex rounded-t-2xl overflow-hidden" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
                            <button
                                onClick={() => setActiveTab("calculator")}
                                className="flex items-center gap-2.5 px-8 py-4 text-sm font-semibold transition-all cursor-pointer relative"
                                style={activeTab === "calculator"
                                    ? { background: "#f98513", color: "#fff" }
                                    : { background: "transparent", color: "rgba(255,255,255,0.45)" }
                                }
                            >
                                <Calculator size={15} strokeWidth={2} />
                                Installment Calculator
                                {activeTab !== "calculator" && (
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-6"
                                        style={{ background: "rgba(255,255,255,0.08)" }} />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("form")}
                                className="flex items-center gap-2.5 px-8 py-4 text-sm font-semibold transition-all cursor-pointer"
                                style={activeTab === "form"
                                    ? { background: "#f98513", color: "#fff" }
                                    : { background: "transparent", color: "rgba(255,255,255,0.45)" }
                                }
                            >
                                <FileText size={15} strokeWidth={2} />
                                Finance Application Form
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tab Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {activeTab === "calculator" ? (
                    <InstallmentCalculator />
                ) : (
                    <FinanceApplicationForm />
                )}
            </div>
        </div>
    );
}
