"use client";

import { useState } from "react";
import { useConsultationStore } from "@/store/consultationStore";
import { Loader, CheckCircle, ChevronRight, Factory, Wrench, TrendingUp, Brain, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

const MACHINES = {
    "Vertical Machine Center": ["NANO-X8", "NANO-X10", "NV-855", "NV-1165", "NV-1370"],
    "Horizontal Machine Center": ["HMC-630A", "HMC-800A"],
    "Slant-Bed Lathe": ["3015S", "3015M", "3015L", "3605S", "3605M"],
    "Vertical Lathe": ["VLT-550", "VLT-750"],
};

const CONSULTATION_TYPES = [
    { label: "New Factory Setup", icon: Factory },
    { label: "Machine Upgrade", icon: Wrench },
    { label: "Production Expansion", icon: TrendingUp },
    { label: "Technical Guidance", icon: Brain },
    { label: "Price Inquiry", icon: DollarSign },
];

const REQUIREMENTS = [
    "Installation required",
    "Training required",
    "Spare parts package",
    "Custom machine configuration",
    "After-sales support",
    "CNC programming assistance",
];

type Step = 1 | 2 | 3 | 4;

const ConsultationClient = () => {
    const { isLoading, submitConsultation } = useConsultationStore();
    const [step, setStep] = useState<Step>(1);
    const [submitted, setSubmitted] = useState(false);

    const [consultType, setConsultType] = useState("");
    const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
    const [projectDetails, setProjectDetails] = useState({
        companyName: "",
        industry: "",
        country: "",
        quantity: "",
        budget: "",
        timeline: "Normal",
    });
    const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
    const [contactDetails, setContactDetails] = useState({
        firstName: "",
        email: "",
        phone: "",
        message: "",
    });

    const toggleMachine = (machine: string) => {
        setSelectedMachines((prev) =>
            prev.includes(machine) ? prev.filter((m) => m !== machine) : [...prev, machine]
        );
    };

    const toggleReq = (req: string) => {
        setSelectedReqs((prev) =>
            prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
        );
    };

    const handleSubmit = async () => {
        if (!contactDetails.firstName || !contactDetails.email) {
            toast.error("Name and Email are required!");
            return;
        }
        if (isLoading) return;

        const messageContent = [
            `Consultation Type: ${consultType || "Not specified"}`,
            `Machines of Interest: ${selectedMachines.join(", ") || "None selected"}`,
            `Company: ${projectDetails.companyName || "-"}`,
            `Industry: ${projectDetails.industry || "-"}`,
            `Country: ${projectDetails.country || "-"}`,
            `Quantity: ${projectDetails.quantity || "-"}`,
            `Budget: ${projectDetails.budget || "-"}`,
            `Timeline: ${projectDetails.timeline}`,
            `Requirements: ${selectedReqs.join(", ") || "None"}`,
            `Additional Notes: ${contactDetails.message || "-"}`,
        ].join("\n");

        const payload = {
            name: contactDetails.firstName,
            email: contactDetails.email,
            machine: selectedMachines.join(", ") || consultType || "Not specified",
            message: messageContent,
        };

        try {
            const success = await submitConsultation(payload);
            if (success) {
                setSubmitted(true);
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
                <div className="max-w-2xl w-full">
                    <div className="bg-white/5 border border-orange-500/30 rounded-2xl p-10 text-center">
                        <div className="flex justify-center mb-6">
                            <CheckCircle size={56} className="text-orange-500" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                            Consultation Request Received
                        </h2>
                        <p className="text-gray-400 mb-8 text-sm">
                            Our engineering team is analyzing your selected CNC system.
                        </p>
                        <div className="space-y-3 text-left mb-8">
                            {[
                                { label: "Machines selected", done: true },
                                { label: "Requirements logged", done: true },
                                { label: "Engineer assigned", done: true },
                                { label: "Response time: 24–48 hours", done: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${item.done ? "bg-orange-500 text-black" : "bg-white/10 text-gray-400"}`}>
                                        {item.done ? "✓" : "⏳"}
                                    </div>
                                    <span className="text-sm text-gray-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 text-left">
                            <p className="text-xs uppercase tracking-widest text-orange-500 mb-4 font-medium">Consultation Status</p>
                            <div className="space-y-2">
                                {["Received", "Technical Review", "Engineer Assignment", "Response Preparation", "Delivery"].map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-orange-500" : "bg-white/20"}`}></div>
                                        <span className={`text-sm ${i === 0 ? "text-white font-medium" : "text-gray-500"}`}>
                                            Step {i + 1}: {s} {i === 0 && "✓"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-400 text-xs mb-6">
                            Our engineering team will review your machine configuration and respond within 24–48 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="https://wa.me/886928021628"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition text-sm"
                            >
                                WhatsApp Engineer
                            </a>
                            <button
                                onClick={() => { setSubmitted(false); setStep(1); setSelectedMachines([]); setConsultType(""); }}
                                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm cursor-pointer"
                            >
                                New Request
                            </button>
                        </div>
                    </div>
                    <p className="text-center mt-8 text-gray-600 text-xs">
                        &ldquo;Nanya CNC — Powering the Future of Smart Manufacturing.&rdquo;
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero */}
            <section className="relative pt-24 pb-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 bg-[radial-gradient(circle,rgba(255,140,0,0.12),transparent_70%)] blur-3xl pointer-events-none"></div>
                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Technical Consultation System</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight">
                        Request CNC Machine <span className="text-orange-500">Consultation</span>
                    </h1>
                    <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
                        Tell us your production needs. Our engineers will design the right machine setup for your industry.
                    </p>
                </div>
            </section>

            {/* Progress Bar */}
            <div className="max-w-3xl mx-auto px-6 mb-8">
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex-1 flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${step >= s ? "bg-orange-500 text-black" : "bg-white/10 text-gray-500"}`}>
                                {step > s ? "✓" : s}
                            </div>
                            {s < 4 && <div className={`flex-1 h-0.5 transition-all duration-300 ${step > s ? "bg-orange-500" : "bg-white/10"}`}></div>}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2">
                    {["Consultation Type", "Machine Selection", "Project Details", "Contact Info"].map((label, i) => (
                        <span key={i} className={`text-xs ${step === i + 1 ? "text-orange-400" : "text-gray-600"}`}>{label}</span>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">

                {/* STEP 1: Consultation Type */}
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-6 font-serif">What are you looking for?</h2>
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                            {CONSULTATION_TYPES.map(({ label, icon: Icon }) => (
                                <button
                                    key={label}
                                    onClick={() => setConsultType(label)}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${consultType === label ? "border-orange-500 bg-orange-500/10 text-white" : "border-white/10 bg-white/5 text-gray-300 hover:border-orange-500/30 hover:bg-white/10"}`}
                                >
                                    <Icon size={22} className={consultType === label ? "text-orange-500" : "text-gray-500"} strokeWidth={1.5} />
                                    <span className="text-sm font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-500/80 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Continue <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* STEP 2: Machine Selection */}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2 font-serif">Select machines you&apos;re interested in</h2>
                        <p className="text-gray-400 text-sm mb-6">Multi-select allowed. Click to select/deselect.</p>

                        {Object.entries(MACHINES).map(([category, models]) => (
                            <div key={category} className="mb-6">
                                <h3 className="text-orange-500 text-xs uppercase tracking-widest font-medium mb-3">{category}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {models.map((model) => (
                                        <button
                                            key={model}
                                            onClick={() => toggleMachine(model)}
                                            className={`py-3 px-4 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-300 ${selectedMachines.includes(model)
                                                ? "border-orange-500 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/10"
                                                : "border-white/10 bg-white/5 text-gray-300 hover:border-orange-500/30"}`}
                                        >
                                            {selectedMachines.includes(model) && <span className="mr-1">✓</span>}
                                            {model}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {selectedMachines.length > 0 && (
                            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-6">
                                <p className="text-xs text-orange-400 font-medium mb-2">Selected ({selectedMachines.length}):</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMachines.map((m) => (
                                        <span key={m} className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">{m}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/10 transition cursor-pointer text-sm">
                                Back
                            </button>
                            <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-500/80 transition flex items-center justify-center gap-2 cursor-pointer">
                                Continue <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: Project Details */}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-6 font-serif">Tell us about your project</h2>
                        <div className="space-y-4 mb-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={projectDetails.companyName}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, companyName: e.target.value })}
                                    className="input-glass"
                                />
                                <select
                                    value={projectDetails.industry}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, industry: e.target.value })}
                                    className="input-glass bg-black/60 text-gray-300"
                                >
                                    <option value="">Industry Type</option>
                                    <option>Automotive</option>
                                    <option>Aerospace & Defense</option>
                                    <option>Medical & Healthcare</option>
                                    <option>Mold, Die & Engineering</option>
                                    <option>Electronics & Semiconductors</option>
                                    <option>Robotics & Smart Manufacturing</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={projectDetails.country}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, country: e.target.value })}
                                    className="input-glass"
                                />
                                <input
                                    type="text"
                                    placeholder="Required Quantity (e.g. 2 units)"
                                    value={projectDetails.quantity}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, quantity: e.target.value })}
                                    className="input-glass"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Budget Range (optional)"
                                    value={projectDetails.budget}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, budget: e.target.value })}
                                    className="input-glass"
                                />
                                <select
                                    value={projectDetails.timeline}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, timeline: e.target.value })}
                                    className="input-glass bg-black/60 text-gray-300"
                                >
                                    <option>Urgent</option>
                                    <option>Normal</option>
                                    <option>Planning Phase</option>
                                </select>
                            </div>
                        </div>

                        <h3 className="text-sm font-medium text-gray-300 mb-3">Additional Requirements</h3>
                        <div className="grid sm:grid-cols-2 gap-2 mb-6">
                            {REQUIREMENTS.map((req) => (
                                <button
                                    key={req}
                                    onClick={() => toggleReq(req)}
                                    className={`flex items-center gap-3 py-3 px-4 rounded-xl border text-sm cursor-pointer transition-all duration-300 text-left ${selectedReqs.includes(req) ? "border-orange-500/50 bg-orange-500/10 text-orange-300" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}
                                >
                                    <div className={`w-4 h-4 rounded flex items-center justify-center text-xs shrink-0 ${selectedReqs.includes(req) ? "bg-orange-500 text-black" : "border border-white/20"}`}>
                                        {selectedReqs.includes(req) && "✓"}
                                    </div>
                                    {req}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/10 transition cursor-pointer text-sm">
                                Back
                            </button>
                            <button onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-500/80 transition flex items-center justify-center gap-2 cursor-pointer">
                                Continue <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: Contact Info + Submit */}
                {step === 4 && (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-6 font-serif">Your Contact Details</h2>

                        <div className="space-y-4 mb-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value={contactDetails.firstName}
                                    onChange={(e) => setContactDetails({ ...contactDetails, firstName: e.target.value })}
                                    className="input-glass"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={contactDetails.email}
                                    onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                                    className="input-glass"
                                />
                            </div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={contactDetails.phone}
                                onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                                className="input-glass"
                            />
                            <textarea
                                placeholder="Any additional notes or specific requirements..."
                                value={contactDetails.message}
                                onChange={(e) => setContactDetails({ ...contactDetails, message: e.target.value })}
                                rows={3}
                                className="input-glass resize-none"
                            />
                        </div>

                        {(selectedMachines.length > 0 || consultType) && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
                                <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Your Configuration Summary</p>
                                {consultType && <p className="text-xs text-gray-400 mb-1">Consultation: <span className="text-gray-200">{consultType}</span></p>}
                                {selectedMachines.length > 0 && (
                                    <div className="mb-1">
                                        <p className="text-xs text-gray-400 mb-1">Selected Machines:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedMachines.map((m) => (
                                                <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">{m}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {selectedReqs.length > 0 && <p className="text-xs text-gray-400 mt-1">Requirements: <span className="text-gray-200">{selectedReqs.join(", ")}</span></p>}
                            </div>
                        )}

                        <p className="text-xs text-gray-500 text-center mb-5">
                            Engineers respond within 24–48 hours with technical guidance &amp; recommendations
                        </p>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/10 transition cursor-pointer text-sm">
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex-1 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-500/80 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <><Loader className="animate-spin" size={18} /> Processing...</>
                                ) : (
                                    "Request Engineer Consultation"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationClient;
