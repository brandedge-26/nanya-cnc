"use client";

import { useState } from "react";
import { BookOpen, Download, ChevronRight, FileText, Maximize2, X } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
    {
        id: "vmc",
        label: "Vertical Machine Center",
        color: "#f98513",
        bg: "rgba(249,133,19,0.1)",
        border: "rgba(249,133,19,0.25)",
        description: "High-speed vertical machining centers for precision milling, drilling & contouring.",
        machines: [
            {
                name: "NANO-X8",
                image: "/products/nano-x8-front.png",
                pdf: "/pdf/nano-x8.pdf",
                specs: ["X/Y/Z: 800×500×550mm", "Spindle: 12,000 RPM", "ATC: 20 Tools", "Table: 900×500mm"],
            },
            {
                name: "NANO-X10",
                image: "/products/nano-x10-front.png",
                pdf: "/pdf/nano-x10.pdf",
                specs: ["X/Y/Z: 1000×600×600mm", "Spindle: 12,000 RPM", "ATC: 20 Tools", "Table: 1100×600mm"],
            },
            {
                name: "NV-855",
                image: "/products/nv-855-front.png",
                pdf: "/pdf/nv-855.pdf",
                specs: ["X/Y/Z: 850×550×550mm", "Spindle: 15,000 RPM", "ATC: 24 Tools", "Rapid: 48m/min"],
            },
            {
                name: "NV-1165",
                image: "/products/nv-1165-front.png",
                pdf: "/pdf/nv1165.pdf",
                specs: ["X/Y/Z: 1100×650×600mm", "Spindle: 15,000 RPM", "ATC: 24 Tools", "Rapid: 48m/min"],
            },
            {
                name: "NV-1370",
                image: "/products/nv-1370-front.png",
                pdf: null,
                specs: ["X/Y/Z: 1370×700×650mm", "Spindle: 12,000 RPM", "ATC: 30 Tools", "Table: 1500×700mm"],
            },
        ],
    },
    {
        id: "hmc",
        label: "Horizontal Machine Center",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.1)",
        border: "rgba(59,130,246,0.25)",
        description: "Horizontal machining centers with pallet changers for multi-face high-volume production.",
        machines: [
            {
                name: "HMC-630A",
                image: "/products/hmc-630a.png",
                pdf: "/pdf/HMC630.pdf",
                specs: ["Pallet: 630×630mm", "Spindle: 8,000 RPM", "ATC: 60 Tools", "BT-50 Taper"],
            },
            {
                name: "HMC-800A",
                image: "/products/hmc-800a.png",
                pdf: "/pdf/hmc800.pdf",
                specs: ["Pallet: 800×800mm", "Spindle: 6,000 RPM", "ATC: 80 Tools", "BT-50 Taper"],
            },
        ],
    },
    {
        id: "lathe",
        label: "Slant-Bed CNC Lathe",
        color: "#22c55e",
        bg: "rgba(34,197,94,0.1)",
        border: "rgba(34,197,94,0.25)",
        description: "High-rigidity slant-bed lathes for turning, threading & facing with superior chip evacuation.",
        machines: [
            {
                name: "3015 Series",
                image: "/products/slant-bed-3015.png",
                pdf: "/pdf/3105S.pdf",
                specs: ["Swing: Ø300mm", "Chuck: 6″", "Spindle: 4,500 RPM", "Models: S / M / L"],
            },
            {
                name: "3605 Series",
                image: "/products/slant-bed-3605.png",
                pdf: "/pdf/3605M.pdf",
                specs: ["Swing: Ø360mm", "Chuck: 8″", "Spindle: 3,500 RPM", "Models: S / M"],
            },
        ],
    },
    {
        id: "vlt",
        label: "Vertical Lathe",
        color: "#a855f7",
        bg: "rgba(168,85,247,0.1)",
        border: "rgba(168,85,247,0.25)",
        description: "Vertical turning lathes for large-diameter, heavy workpieces with stable clamping.",
        machines: [
            {
                name: "VLT-550",
                image: "/products/vlt-550.png",
                pdf: "/pdf/VLT-550.pdf",
                specs: ["Table Dia: Ø550mm", "Max Turn Dia: Ø700mm", "Max Height: 500mm", "Spindle: 1,200 RPM"],
            },
            {
                name: "VLT-750",
                image: "/products/vlt-750.png",
                pdf: "/pdf/vlt-750.pdf",
                specs: ["Table Dia: Ø750mm", "Max Turn Dia: Ø950mm", "Max Height: 650mm", "Spindle: 800 RPM"],
            },
        ],
    },
];

const KEY_COMPONENTS = [
    { part: "Spindle", brand: "ROYAL Belt/DDS", origin: "Taiwan" },
    { part: "Linear Guideway", brand: "PMI & HIWIN", origin: "Taiwan" },
    { part: "Ball-Screw C3", brand: "PMI & HIWIN", origin: "Taiwan" },
    { part: "Tool Magazine (ATC)", brand: "DETA (T-T) 1.8sec", origin: "Taiwan" },
    { part: "Linear Scale", brand: "Heidenhain / Fagor", origin: "Germany" },
    { part: "Spindle Bearings", brand: "NSK / NTN (5 nos.)", origin: "Japan" },
    { part: "Clamp System", brand: "HINAKA", origin: "Japan" },
    { part: "Lubrication", brand: "BAOTENG Oil Lubricant", origin: "China" },
];

export default function CataloguePage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [pdfOpen, setPdfOpen] = useState(false);

    const displayed = activeCategory
        ? CATEGORIES.filter((c) => c.id === activeCategory)
        : CATEGORIES;

    return (
        <div className="space-y-6">

            {/* ── Header Banner ── */}
            <div className="relative rounded-2xl overflow-hidden p-6 md:p-8"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.06) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }} />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.4), #f98513, transparent)"
                }} />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(249,133,19,0.12)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                            <BookOpen size={22} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-0.5">Dealer Exclusive</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">Machine Catalogue</h1>
                            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                                Complete Nanya CNC lineup — specs, images &amp; downloadable brochures.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            onClick={() => setPdfOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/10 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all cursor-pointer"
                        >
                            <Maximize2 size={14} />
                            View Catalogue
                        </button>
                        <a
                            href="/pdf/nanya-catalogue.pdf"
                            download
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:opacity-90"
                            style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}
                        >
                            <Download size={14} strokeWidth={2.5} />
                            Download PDF
                        </a>
                    </div>
                </div>
            </div>

            {/* ── PDF Viewer Modal ── */}
            {pdfOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="relative w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="flex items-center justify-between px-5 py-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-orange-400" />
                                <span className="text-sm font-semibold text-white">Nanya CNC — Full Catalogue</span>
                            </div>
                            <button
                                onClick={() => setPdfOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <iframe
                            src="/pdf/nanya-catalogue.pdf"
                            className="w-full"
                            style={{ height: "calc(90vh - 52px)" }}
                            title="Nanya CNC Catalogue"
                        />
                    </div>
                </div>
            )}

            {/* ── Category Filter Tabs ── */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveCategory(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    style={!activeCategory
                        ? { background: "#f98513", color: "#000" }
                        : { background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                    }
                >
                    All Machines
                </button>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                        style={activeCategory === cat.id
                            ? { background: cat.color, color: "#000" }
                            : { background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                        }
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* ── Machine Sections ── */}
            <div className="space-y-10">
                {displayed.map((cat) => (
                    <div key={cat.id}>

                        {/* Section header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-9 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                            <div>
                                <h2 className="text-base font-bold text-white">{cat.label}</h2>
                                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{cat.description}</p>
                            </div>
                        </div>

                        {/* Machine cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cat.machines.map((machine) => (
                                <div
                                    key={machine.name}
                                    className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
                                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = cat.border)}
                                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                                >
                                    {/* Machine Image */}
                                    <div className="relative w-full bg-white/3 overflow-hidden"
                                        style={{ height: "200px", background: "rgba(255,255,255,0.02)" }}>
                                        <Image
                                            src={machine.image}
                                            alt={machine.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        {/* Category badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                                                style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                                                {cat.label.split(" ")[0]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-base font-bold text-white mb-3">{machine.name}</h3>

                                        {/* Specs */}
                                        <ul className="space-y-1.5 mb-4 flex-1">
                                            {machine.specs.map((spec, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <ChevronRight size={11} style={{ color: cat.color, flexShrink: 0 }} />
                                                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{spec}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* PDF download */}
                                        {machine.pdf ? (
                                            <a
                                                href={machine.pdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
                                                style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}
                                                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                            >
                                                <Download size={13} strokeWidth={2.5} />
                                                Download Spec Sheet
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold"
                                                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                                Spec Sheet Coming Soon
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Key Components ── */}
            <div className="rounded-2xl p-6" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: "#f98513" }} />
                    <div>
                        <h2 className="text-sm font-bold text-white">Structural Characteristics &amp; Key Components</h2>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Premium-grade components used across all Nanya CNC machines
                        </p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {KEY_COMPONENTS.map((comp) => (
                        <div key={comp.part}
                            className="rounded-xl p-4 flex flex-col gap-1"
                            style={{ background: "rgba(249,133,19,0.04)", border: "1px solid rgba(249,133,19,0.12)" }}>
                            <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "rgba(249,133,19,0.7)" }}>
                                {comp.part}
                            </p>
                            <p className="text-xs font-semibold text-white">{comp.brand}</p>
                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Made in {comp.origin}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer CTA ── */}
            <div className="rounded-2xl p-6 text-center" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-sm font-medium text-white mb-1">Need custom configurations or bulk pricing?</p>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Contact our support team for tailored machine specifications and dealer pricing.
                </p>
                <a
                    href="/dealer-portal/support"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold transition"
                >
                    Contact Support <ChevronRight size={14} />
                </a>
            </div>
        </div>
    );
}
