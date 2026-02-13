"use client";

import { useEffect, useState } from "react";
import { Loader, Send } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Dealer, useDealerStore } from "@/store/dealerStore";
import toast from "react-hot-toast";
import PendingStatus from "@/components/dealer/PendingStatus";
import AcceptedStatus from "@/components/dealer/AcceptedStatus";
import RejectedStatus from "@/components/dealer/RejectStatus";


const DealerRequest = () => {

    // user state
    const { user } = useAuthStore();

    // dealer request state
    const { isLoading, submitRequest, dealerStatus, getDealerStatus } = useDealerStore();
    const [initialLoad, setInitialLoad] = useState(true);


    useEffect(() => {
        const fetchStatus = async () => {
            await getDealerStatus();
            setInitialLoad(false);
        };
        fetchStatus();
    }, [getDealerStatus])


    const [formData, setFormData] = useState<Dealer>({
        name: user?.name as string,
        email: user?.email as string,
        companyName: "",
        companyEmail: "",
        message: "",
        status: "idle"
    });


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    // form submission
    const handleSubmit = async (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.companyName || !formData.companyEmail || !formData.message) {
            toast.error("All fields are required!");
            return;
        }

        try {

            const success = await submitRequest(formData);


            if (success) {
                setFormData({
                    name: "",
                    email: "",
                    companyName: "",
                    companyEmail: "",
                    message: "",
                    status: "idle"
                });
            }

        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }

    }

    if (initialLoad || isLoading) {
        return (
            <div className="max-w-2xl mx-auto px-5 py-20 text-center">
                <Loader className="animate-spin w-12 h-12 text-orange-500 mx-auto" />
            </div>
        );
    }


    if (dealerStatus === 'pending') {
        return <>
            {isLoading ? <Loader className="animate-spin" /> : <PendingStatus />}
        </>;
    }

    if (dealerStatus === 'accept') {
        return <AcceptedStatus />;
    }

    if (dealerStatus === 'reject') {
        return <RejectedStatus />;
    }


    return (
        <div className="max-w-3xl mx-auto px-5 py-5">

            {dealerStatus === "idle" && <>

                {/* Header Section */}
                <div className="text-center mb-10 mt-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Become a <span className="text-orange-500">Dealer</span>
                    </h2>
                    <p className="text-gray-400 mt-2">Submit your details to join our global network.</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6"
                >

                    {/* name & email */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                readOnly
                                className="input-glass cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Personal Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                readOnly
                                className="input-glass cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Company Name & Company Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Your Business Name"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Company Email</label>
                            <input
                                type="email"
                                name="companyEmail"
                                placeholder="business@company.com"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white"
                            />
                        </div>
                    </div>

                    {/*  Message */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Message / Requirements</label>
                        <textarea
                            name="message"
                            placeholder="Tell us about your business..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white resize-none"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="h-12 w-full flex items-center gap-3 cursor-pointer justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased"
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" size={24} />
                        ) : (
                            <>
                                <span>Send Request</span>
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>

                </form>

            </>}

        </div>
    );
};

export default DealerRequest;