"use client";

import { useState } from "react";
import {
    AlertTriangle, Truck, TrendingDown, ShieldCheck, CalendarDays,
    Percent, TrendingUp, CheckCircle, BarChart3, RefreshCw, Target, Lock,
    DollarSign, Sparkles, Cpu, Zap,
} from "lucide-react";

const MACHINES = [
    { model: "NV-855",  price: 38000, advance: 0.30, specs: "M80A + 12K + Chain Type Conveyor + Tool Probe · Matt Black · Magazine Full Covered 24T" },
    { model: "NV-1165", price: 44000, advance: 0.40, specs: "M80A + 12K + Chain Type Conveyor + Tool Probe · Matt Black · Magazine Full Covered 24T" },
    { model: "NV-1370", price: 58800, advance: 0.45, specs: "M80A + 12K + Chain Type Conveyor + Tool Probe · Matt Black · Magazine Full Covered 24T" },
];

const PLANS = [
    { term: 6,  rate: 0.06, processingFee: 240 },
    { term: 12, rate: 0.12, processingFee: 480 },
    { term: 18, rate: 0.18, processingFee: 720 },
    { term: 24, rate: 0.24, processingFee: 960 },
];

function fmt(n: number) {
    return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcPlan(price: number, advanceRate: number, term: number, rate: number, fee: number) {
    const advance     = price * advanceRate;
    const loanAmount  = price - advance;
    const interestPure = loanAmount * rate;
    const interestCost = interestPure + fee;          // what we label "Interest Cost"
    const loanCost    = loanAmount + interestCost;    // total repayment
    const monthly     = loanCost / term;
    const totalCost   = advance + loanCost;           // = machine price + interestCost
    return { advance, loanAmount, interestCost, loanCost, monthly, totalCost };
}

// ── EZ Financing Info Section ─────────────────────────────────────────────────
function EzFinancingSection() {
    const benefits = [
        { icon: Truck,         label: "Fast Delivery" },
        { icon: TrendingDown,  label: "Less Investment" },
        { icon: ShieldCheck,   label: "High Quality Product" },
        { icon: CalendarDays,  label: "Flexible Payment Terms" },
        { icon: Percent,       label: "Minimal Interest Rate" },
        { icon: TrendingUp,    label: "Maximum Production Growth" },
    ];

    const machines = [
        { model: "NV-855",  table: "1000 × 550 mm", spindle: "8000 rpm", power: "11 / 15 kW" },
        { model: "NV-1165", table: "1200 × 650 mm", spindle: "8000 rpm", power: "15 / 18.5 kW" },
        { model: "NV-1370", table: "1500 × 700 mm", spindle: "8000 rpm", power: "18.5 / 22 kW" },
    ];

    const financingSolutions = [
        { icon: DollarSign,  label: "Low Upfront Investment" },
        { icon: Percent,     label: "Minimal Interest Financing Support" },
        { icon: CalendarDays,label: "Easy Monthly Installment Plans" },
        { icon: TrendingUp,  label: "Production Capacity Growth for Investors & Factories" },
        { icon: Sparkles,    label: "Smart Investment for Modern Manufacturing Expansion" },
    ];

    const buybackItems = [
        { icon: ShieldCheck, label: "Machine Buyback Guarantee" },
        { icon: RefreshCw,   label: "Replace Old Machine with New Model Upgrade" },
        { icon: Target,      label: "Maintain Long-Term High Machining Accuracy" },
        { icon: Lock,        label: "Secure Future Production Performance" },
    ];

    return (
        <div className="space-y-6 mt-4">

            {/* Divider */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                <span className="text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
                    style={{ color: "#f98513", background: "rgba(249,133,19,0.08)", border: "1px solid rgba(249,133,19,0.2)" }}>
                    EZ Financing Program
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Hero banner */}
            <div className="relative rounded-2xl overflow-hidden p-8 sm:p-10"
                style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #141410 60%, #1a1200 100%)", border: "1px solid rgba(249,133,19,0.2)" }}>
                {/* grid bg */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.05) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }} />
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 100% 0%, rgba(249,133,19,0.12) 0%, transparent 65%)"
                }} />
                <div className="relative">
                    <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#f98513" }}>
                        NANYA CNC
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-1">
                        NANYA CNC<br />
                        <span style={{ color: "#f98513" }}>EZ FINANCING</span> PROGRAM
                    </h2>
                    <p className="text-sm font-semibold mt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                        SMART INVESTMENT FOR{" "}
                        <span style={{ color: "#f98513" }}>MODERN MANUFACTURING EXPANSION</span>
                    </p>
                </div>
            </div>

            {/* 6 Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {benefits.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
                        style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(249,133,19,0.1)" }}>
                            <Icon size={18} style={{ color: "#f98513" }} strokeWidth={1.5} />
                        </div>
                        <p className="text-[11px] font-semibold text-white leading-tight">{label}</p>
                    </div>
                ))}
            </div>

            {/* Technology + Performance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Intelligent CNC Technology */}
                <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center gap-2 mb-5">
                        <Cpu size={16} style={{ color: "#f98513" }} />
                        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Intelligent CNC Technology
                        </p>
                    </div>
                    <div className="space-y-3">
                        {["High Accuracy", "High Rigidity", "High Productivity"].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <CheckCircle size={15} style={{ color: "#f98513" }} strokeWidth={2} />
                                <span className="text-sm font-semibold text-white">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Precision Performance */}
                <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center gap-2 mb-5">
                        <BarChart3 size={16} style={{ color: "#f98513" }} />
                        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Precision Performance
                        </p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: "Accuracy",     value: 98 },
                            { label: "Efficiency",   value: 95 },
                            { label: "Productivity", value: 90 },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</span>
                                    <span className="text-xs font-bold" style={{ color: "#f98513" }}>+{value}%</span>
                                </div>
                                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                                    <div className="h-1.5 rounded-full transition-all duration-700"
                                        style={{ width: `${value}%`, background: "linear-gradient(90deg, #f98513, #ffa94d)" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Machine Specs Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {machines.map((m) => (
                    <div key={m.model} className="rounded-2xl p-5"
                        style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                            NANYA CNC
                        </p>
                        <p className="text-xl font-black mb-4" style={{ color: "#f98513" }}>{m.model}</p>
                        <div className="space-y-2">
                            {[
                                { label: "Table Size",     value: m.table },
                                { label: "Spindle Speed",  value: m.spindle },
                                { label: "Power",          value: m.power },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex items-center justify-between">
                                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
                                    <span className="text-[11px] font-semibold text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Flexible Financing Solutions */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-center text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Flexible <span style={{ color: "#f98513" }}>Financing</span> Solutions
                </p>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Months */}
                    <div className="flex-shrink-0 text-center sm:text-left sm:pr-6" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Flexible Financing Period
                        </p>
                        <div className="flex items-center gap-2">
                            {["6", "12", "18", "24"].map((m, i) => (
                                <span key={m} className="flex items-center gap-2">
                                    <span className="text-3xl font-black text-white">{m}</span>
                                    {i < 3 && <span className="text-xl font-light" style={{ color: "rgba(249,133,19,0.5)" }}>|</span>}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm font-bold tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>MONTHS</p>
                    </div>
                    {/* Solutions grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {financingSolutions.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "rgba(249,133,19,0.1)" }}>
                                    <Icon size={14} style={{ color: "#f98513" }} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-medium leading-tight pt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Buyback Policy */}
            <div className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0f0f0f, #120e00)", border: "1.5px solid rgba(249,133,19,0.25)" }}>
                <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 0% 0%, rgba(249,133,19,0.08) 0%, transparent 65%)"
                }} />
                <div className="relative flex flex-col sm:flex-row gap-6 items-start">
                    {/* Badge */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl text-center"
                        style={{ background: "rgba(249,133,19,0.1)", border: "2px solid rgba(249,133,19,0.35)" }}>
                        <p className="text-2xl font-black leading-none" style={{ color: "#f98513" }}>3-4</p>
                        <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "#f98513" }}>YEAR</p>
                        <div className="flex gap-0.5 mt-1">
                            {[0,1,2].map(i => (
                                <span key={i} className="text-[10px]" style={{ color: "#f98513" }}>★</span>
                            ))}
                        </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                        <p className="text-xl font-black text-white mb-4">
                            BUYBACK <span style={{ color: "#f98513" }}>POLICY</span>
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {buybackItems.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(249,133,19,0.1)" }}>
                                        <Icon size={14} style={{ color: "#f98513" }} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-xs font-medium leading-tight pt-1" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Banner */}
            <div className="rounded-2xl p-5 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(90deg, #0f0f0f, #1a1000, #0f0f0f)", border: "1px solid rgba(249,133,19,0.2)" }}>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    NANYA CNC ALWAYS PRESENTS
                </p>
                <p className="text-lg sm:text-xl font-black text-white tracking-wide">
                    <span style={{ color: "#f98513" }}>FAST DELIVERY</span>
                    {" + "}
                    <span style={{ color: "#f98513" }}>LESS INVESTMENT</span>
                    {" + "}
                    <span style={{ color: "#f98513" }}>QUALITY PRODUCT</span>
                </p>
                <div className="flex justify-center gap-6 mt-4 flex-wrap">
                    {[
                        { icon: Zap,         label: "Advanced Technology" },
                        { icon: Target,      label: "High Precision" },
                        { icon: ShieldCheck, label: "Made for Performance" },
                        { icon: TrendingUp,  label: "Built for the Future" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <Icon size={12} style={{ color: "#f98513" }} strokeWidth={2} />
                            <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
                        </div>
                    ))}
                </div>
                <p className="text-[11px] mt-3 font-medium" style={{ color: "rgba(249,133,19,0.5)" }}>
                    WWW.NANYA-CNC.COM
                </p>
            </div>

        </div>
    );
}

function PaymentSummary({
    machine,
    plan,
}: {
    machine: typeof MACHINES[0];
    plan: typeof PLANS[0];
}) {
    const advance      = machine.price * machine.advance;
    const loanAmount   = machine.price - advance;
    const interestPure = loanAmount * plan.rate;
    const interestCost = interestPure + plan.processingFee; // displayed as "Interest"
    const loanCost     = loanAmount + interestCost;
    const monthly      = loanCost / plan.term;
    const totalCost    = advance + loanCost;

    const advPct   = Math.round(machine.advance * 100);
    const ratePct  = Math.round(plan.rate * 100);
    const years    = plan.term / 12;
    const yearLabel = Number.isInteger(years) ? `${years} yr` : `${years} yr`;
    const previewMonths = Math.min(plan.term, 6);
    const remaining     = plan.term - previewMonths;

    return (
        <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1.5px solid rgba(249,133,19,0.35)" }}>

            {/* Title */}
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#f98513" }}>
                Payment Summary — {machine.model} · {plan.term}-Month Plan
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT: Breakdown */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Machine Price (USD)</span>
                        <span className="text-sm font-semibold text-white">{fmt(machine.price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Down Payment (T/T, {advPct}%)</span>
                        <span className="text-sm font-bold" style={{ color: "#f98513" }}>{fmt(advance)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Loan Amount Approved</span>
                        <span className="text-sm font-semibold text-white">{fmt(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Interest ({ratePct}% p.a. × {yearLabel})
                        </span>
                        <span className="text-sm font-semibold text-white">{fmt(interestCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Processing Fee (PF)</span>
                        <span className="text-sm font-semibold text-white">{fmt(plan.processingFee)}</span>
                    </div>

                    {/* Divider + Total */}
                    <div className="pt-3" style={{ borderTop: "1px solid rgba(249,133,19,0.2)" }}>
                        <div className="flex justify-between items-center">
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                                Total Cost of Machine (incl. interest + PF)
                            </span>
                            <span className="text-base font-bold" style={{ color: "#f98513" }}>{fmt(totalCost)}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Payment Schedule */}
                <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Payment Schedule
                    </p>

                    {/* Before Delivery */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#f98513" }} />
                        <div className="flex justify-between w-full">
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Before Delivery</span>
                            <div className="text-right">
                                <span className="text-sm font-bold text-white">{fmt(advance)}</span>
                                <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>T/T wire transfer</span>
                            </div>
                        </div>
                    </div>

                    {/* Vertical line connector */}
                    <div className="ml-1 w-px h-3 mb-1" style={{ background: "rgba(255,255,255,0.1)" }} />

                    {/* Monthly schedule */}
                    <div className="space-y-2">
                        {Array.from({ length: previewMonths }, (_, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ background: idx === 0 ? "rgba(249,133,19,0.6)" : "rgba(255,255,255,0.15)" }}
                                />
                                <div className="flex justify-between w-full">
                                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Month {idx + 1}</span>
                                    <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>{fmt(monthly)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Continues notice */}
                    {remaining > 0 && (
                        <p className="text-xs mt-3 ml-5" style={{ color: "rgba(255,255,255,0.25)" }}>
                            · · · (continues for {remaining} more month{remaining > 1 ? "s" : ""})
                        </p>
                    )}

                    {/* Monthly summary box */}
                    <div className="mt-4 rounded-xl p-4 flex items-center justify-between"
                        style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div>
                            <p className="text-xs font-semibold text-white">Monthly Payment</p>
                            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                × {plan.term} months = {fmt(loanCost)} total installment
                            </p>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: "#f98513" }}>{fmt(monthly)}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function InstallmentCalculator() {
    const [selectedMachine, setSelectedMachine] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(1); // default 12M

    const machine = MACHINES[selectedMachine];
    const advance = machine.price * machine.advance;
    const loanAmount = machine.price - advance;

    return (
        <div className="space-y-8">

            {/* SELECT MACHINE MODEL */}
            <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Select Machine Model
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {MACHINES.map((m, i) => (
                        <button
                            key={m.model}
                            onClick={() => setSelectedMachine(i)}
                            className="text-left p-5 rounded-2xl transition-all cursor-pointer relative"
                            style={selectedMachine === i
                                ? { background: "#0f0f0f", border: "1.5px solid #f98513", boxShadow: "0 0 20px rgba(249,133,19,0.15)" }
                                : { background: "#0f0f0f", border: "1.5px solid rgba(255,255,255,0.08)" }
                            }
                        >
                            {selectedMachine === i && (
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: "#f98513" }} />
                            )}
                            <p className="font-bold text-white text-lg mb-1">{m.model}</p>
                            <p className="text-2xl font-bold mb-1" style={{ color: "#f98513" }}>
                                ${m.price.toLocaleString()}
                                <span className="text-sm font-normal ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>USD</span>
                            </p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {Math.round(m.advance * 100)}% advance required
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* SUMMARY ROW */}
            <div className="rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Machine Price</p>
                    <p className="text-xl font-bold text-white">${machine.price.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Advance ({Math.round(machine.advance * 100)}%)
                    </p>
                    <p className="text-xl font-bold" style={{ color: "#f98513" }}>${advance.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Loan Amount</p>
                    <p className="text-xl font-bold text-white">${loanAmount.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Warranty</p>
                    <p className="text-xl font-bold" style={{ color: "#22c55e" }}>24 Months</p>
                </div>
                <div className="col-span-2 sm:col-span-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{machine.specs}</p>
                </div>
            </div>

            {/* INSTALLMENT PLANS */}
            <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Installment Plans — Click to Select
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PLANS.map((plan, i) => {
                        const c = calcPlan(machine.price, machine.advance, plan.term, plan.rate, plan.processingFee);
                        const isSelected = selectedPlan === i;
                        return (
                            <button
                                key={plan.term}
                                onClick={() => setSelectedPlan(i)}
                                className="text-left p-5 rounded-2xl transition-all cursor-pointer"
                                style={isSelected
                                    ? { background: "#141414", border: "1.5px solid #f98513", boxShadow: "0 0 20px rgba(249,133,19,0.12)" }
                                    : { background: "#0f0f0f", border: "1.5px solid rgba(255,255,255,0.07)" }
                                }
                            >
                                {/* Term badge */}
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>
                                    {plan.term} Months
                                </span>

                                {/* Monthly payment */}
                                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Monthly Payment</p>
                                <p className="text-2xl font-bold text-white mb-0.5">{fmt(c.monthly)}</p>
                                <p className="text-[10px] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>incl. processing fee</p>

                                {/* Details */}
                                <div className="space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
                                    <div className="flex justify-between text-xs">
                                        <span style={{ color: "rgba(255,255,255,0.4)" }}>Interest Rate</span>
                                        <span style={{ color: "rgba(255,255,255,0.7)" }}>{Math.round(plan.rate * 100)}% p.a.</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span style={{ color: "rgba(255,255,255,0.4)" }}>Processing Fee</span>
                                        <span style={{ color: "rgba(255,255,255,0.7)" }}>${plan.processingFee}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span style={{ color: "rgba(255,255,255,0.4)" }}>Interest Cost</span>
                                        <span style={{ color: "rgba(255,255,255,0.7)" }}>{fmt(c.interestCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-semibold pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                        <span style={{ color: "rgba(255,255,255,0.6)" }}>Total Cost</span>
                                        <span className="text-white">{fmt(c.totalCost)}</span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* PAYMENT SUMMARY */}
            <PaymentSummary machine={machine} plan={PLANS[selectedPlan]} />

            {/* FULL PLAN COMPARISON TABLE */}
            <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Full Plan Comparison — {machine.model}
                </p>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <table className="w-full">
                        <thead>
                            <tr style={{ background: "#0f0f0f", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                {["Term", "Interest Rate", "Loan Cost", "Proc. Fee", "Total Cost", "Monthly"].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold tracking-widest uppercase"
                                        style={{ color: "rgba(255,255,255,0.35)" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {PLANS.map((plan, i) => {
                                const c = calcPlan(machine.price, machine.advance, plan.term, plan.rate, plan.processingFee);
                                const isSelected = selectedPlan === i;
                                return (
                                    <tr
                                        key={plan.term}
                                        onClick={() => setSelectedPlan(i)}
                                        className="cursor-pointer transition-all"
                                        style={{
                                            background: isSelected ? "rgba(249,133,19,0.05)" : "transparent",
                                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                                        }}
                                    >
                                        <td className="px-4 py-4 font-semibold text-sm text-white">{plan.term} Months</td>
                                        <td className="px-4 py-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{Math.round(plan.rate * 100)}%</td>
                                        <td className="px-4 py-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{fmt(c.loanCost)}</td>
                                        <td className="px-4 py-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>${plan.processingFee}</td>
                                        <td className="px-4 py-4 text-sm font-semibold text-white">{fmt(c.totalCost)}</td>
                                        <td className="px-4 py-4 text-sm font-bold" style={{ color: "#f98513" }}>{fmt(c.monthly)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CAUTION */}
            <div className="flex gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                <div>
                    <span className="text-xs font-bold mr-2" style={{ color: "#ef4444" }}>CAUTION</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        This installment plan is only available with a guarantee letter and a sales agreement signed between Buyer, Seller, and Middleman. Buyback under the NYCNC brand applies only to machines that are 3 to 4 years old.
                    </span>
                </div>
            </div>

            {/* EZ FINANCING INFO SECTION */}
            <EzFinancingSection />

        </div>
    );
}
