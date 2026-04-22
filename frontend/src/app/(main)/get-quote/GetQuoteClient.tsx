"use client";

import { useState } from "react";
import { useApplicationStore } from "@/store/applicationStore";
import { Loader, CheckCircle, FileText } from "lucide-react";
import toast from "react-hot-toast";

const GetQuoteClient = () => {
    const { isLoading, submitApplication } = useApplicationStore();
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        machine: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.machine || !form.message) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (isLoading) return;

        const payload = {
            firstName: form.name,
            lastName: "-",
            email: form.email,
            companyEmail: form.email,
            companyName: "-",
            companyAddress: "-",
            message: `Machine: ${form.machine}\n\n${form.message}`,
        };

        try {
            const success = await submitApplication(payload);
            if (success) setSubmitted(true);
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <div className="max-w-lg w-full text-center bg-white/5 border border-orange-500/30 rounded-2xl p-10">
                    <div className="flex justify-center mb-5">
                        <CheckCircle size={52} className="text-orange-500" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                        Quote Request Received!
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">
                        Thank you, <span className="text-white font-semibold">{form.name}</span>. Our team will send you a detailed quotation at{" "}
                        <span className="text-orange-400">{form.email}</span> within 24–48 hours.
                    </p>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setForm({ name: "", email: "", machine: "", message: "" });
                        }}
                        className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm cursor-pointer"
                    >
                        Submit Another Request
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero */}
            <section className="relative pt-24 pb-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 bg-[radial-gradient(circle,rgba(255,140,0,0.12),transparent_70%)] blur-3xl pointer-events-none" />
                <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-4">
                        <FileText size={13} className="text-orange-400" />
                        <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Price Quotation</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight">
                        Request a <span className="text-orange-500">Quote</span>
                    </h1>
                    <p className="mt-4 text-gray-400 text-sm max-w-lg mx-auto">
                        Tell us which machine you&apos;re interested in and we&apos;ll send you a detailed price quotation within 24–48 hours.
                    </p>
                </div>
            </section>

            {/* Form */}
            <section className="max-w-2xl mx-auto px-6 pb-24">
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                            Your Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. John Smith"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-orange-500/50 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                            Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="e.g. john@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-orange-500/50 transition"
                        />
                    </div>

                    {/* Machine Selection */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                            Machine of Interest <span className="text-orange-500">*</span>
                        </label>
                        <select
                            name="machine"
                            value={form.machine}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm outline-none focus:border-orange-500/50 transition"
                            style={{ color: form.machine ? "#fff" : "rgba(156,163,175,1)" }}
                        >
                            <option value="" disabled className="bg-black text-gray-400">
                                Select a machine model
                            </option>
                            <optgroup label="Vertical Machine Center" className="bg-black text-orange-400">
                                {["NANO-X8", "NANO-X10", "NV-855", "NV-1165", "NV-1370"].map((m) => (
                                    <option key={m} value={m} className="bg-black text-white">{m}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Horizontal Machine Center" className="bg-black text-orange-400">
                                {["HMC-630A", "HMC-800A"].map((m) => (
                                    <option key={m} value={m} className="bg-black text-white">{m}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Slant-Bed Lathe" className="bg-black text-orange-400">
                                {["3015S", "3015M", "3015L", "3605S", "3605M"].map((m) => (
                                    <option key={m} value={m} className="bg-black text-white">{m}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Vertical Lathe" className="bg-black text-orange-400">
                                {["VLT-550", "VLT-750"].map((m) => (
                                    <option key={m} value={m} className="bg-black text-white">{m}</option>
                                ))}
                            </optgroup>
                            <option value="Not Sure / General Inquiry" className="bg-black text-white">
                                Not Sure / General Inquiry
                            </option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                            Message <span className="text-orange-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Describe your requirements — quantity, industry, timeline, or any specific questions..."
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-orange-500/50 transition resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                    >
                        {isLoading ? (
                            <><Loader className="animate-spin" size={18} /> Sending...</>
                        ) : (
                            "Request Price Quotation"
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-600">
                        Our team responds within 24–48 hours with a detailed price quotation.
                    </p>
                </form>
            </section>
        </div>
    );
};

export default GetQuoteClient;
