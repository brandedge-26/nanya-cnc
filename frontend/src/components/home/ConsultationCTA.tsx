"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { useApplicationStore } from "@/store/applicationStore";
import toast from "react-hot-toast";

const ConsultationCTA = () => {
    const { isLoading, submitApplication } = useApplicationStore();

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        phone: "",
        industry: "",
        message: "",
        companyName: "",
        companyEmail: "",
        companyAddress: "",
        lastName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        if (!formData.firstName || !formData.email || !formData.message) {
            toast.error("Name, Email and Requirement are required!");
            return;
        }

        try {
            const payload = {
                ...formData,
                lastName: formData.lastName || "-",
                companyName: formData.companyName || "-",
                companyEmail: formData.companyEmail || formData.email,
                companyAddress: formData.companyAddress || "-",
            };
            const success = await submitApplication(payload);
            if (success) {
                setFormData({ firstName: "", email: "", phone: "", industry: "", message: "", companyName: "", companyEmail: "", companyAddress: "", lastName: "" });
            }
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <section className="py-24 bg-black relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-80 bg-[radial-gradient(circle,rgba(255,140,0,0.1),transparent_70%)] blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">AI-Powered Consultation</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Let AI <span className="text-orange-500">Optimize Your Production</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                        Get expert guidance and discover the perfect CNC solution tailored to your business needs.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-5 hover:border-orange-500/20 transition-colors duration-300"
                >
                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Your Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-glass"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-glass"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-glass"
                        />
                        <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="input-glass bg-black/60 text-gray-300"
                        >
                            <option value="">Select Industry</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Aerospace & Defense">Aerospace & Defense</option>
                            <option value="Medical & Healthcare">Medical & Healthcare</option>
                            <option value="Mold, Die & Engineering">Mold, Die & Engineering</option>
                            <option value="Electronics & Semiconductors">Electronics & Semiconductors</option>
                            <option value="Robotics & Smart Manufacturing">Robotics & Smart Manufacturing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <textarea
                        name="message"
                        placeholder="Describe your requirement..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="input-glass resize-none"
                    />

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-500/80 transition shadow-lg shadow-orange-500/20 cursor-pointer"
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Get Free Consultation"}
                    </button>

                    <p className="text-center text-gray-500 text-sm">
                        Or connect instantly via{" "}
                        <a href="https://wa.me/886928021628" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition">
                            WhatsApp
                        </a>{" "}
                        for quick support.
                    </p>

                </form>

                {/* Final brand line */}
                <p className="text-center mt-10 text-gray-500 text-sm font-medium">
                    &ldquo;Nanya CNC — Powering the Future of Smart Manufacturing.&rdquo;
                </p>

            </div>
        </section>
    );
};

export default ConsultationCTA;
