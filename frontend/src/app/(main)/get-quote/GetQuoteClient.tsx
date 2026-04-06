"use client";


import { useState } from "react";
import { useApplicationStore } from "@/store/applicationStore";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";


interface Quote {
    firstName: string;
    lastName: string;
    email: string;
    companyEmail: string;
    companyName: string;
    companyAddress: string;
    message: string;
}


const GetQuoteClient = () => {

    const { isLoading, submitApplication } = useApplicationStore();

    const [formData, setFormData] = useState<Quote>({
        firstName: "",
        lastName: "",
        email: "",
        companyEmail: "",
        companyName: "",
        companyAddress: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return;

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.companyName ||
            !formData.companyEmail ||
            !formData.companyAddress ||
            !formData.message
        ) {
            toast.error("All fields are required!");
            return;
        }

        if (formData.message.length <= 10) {
            toast.error("Message must be at least 10 characters long!");
            return;
        }


        try {

            const success = await submitApplication(formData);

            if (success) {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    companyEmail: "",
                    companyName: "",
                    companyAddress: "",
                    message: "",
                });
            }

        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        }
    };

    return (
        <>

            {/* Hero / Header */}
            <div className="px-5 text-center mt-20 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                    Contact our <span className="text-orange-500">Team</span>
                </h1>

                <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                    Connect with our experts to discuss your CNC machining needs.
                    Whether you’re looking for a custom solution, technical guidance,
                    or a detailed quote, our team is ready to provide tailored support
                    and ensure your manufacturing projects achieve the highest level
                    of precision, efficiency, and reliability.
                </p>
            </div>


            {/* Form */}
            <div className="max-w-5xl mx-auto px-5 py-16">

                <h2 className="text-center text-3xl font-semibold text-white mb-10 font-serif">
                    Request a Quote
                </h2>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl p-10 space-y-6 shadow-lg"
                >
                    {/* Row 1 */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-glass"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input-glass"
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-glass"
                        />
                        <input
                            type="email"
                            name="companyEmail"
                            placeholder="Company Email"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            className="input-glass"
                        />
                    </div>

                    {/* Row 3 */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="input-glass"
                        />
                        <input
                            type="text"
                            name="companyAddress"
                            placeholder="Company Address"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            className="input-glass"
                        />
                    </div>

                    {/* Message */}
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="input-glass resize-none"
                    />

                    {/* Submit Button */}

                    <button className="h-11.25 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased"
                        onClick={handleSubmit}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={22} /> : "Send Message"}
                    </button>


                </form>


            </div>
        </>
    );
};

export default GetQuoteClient;