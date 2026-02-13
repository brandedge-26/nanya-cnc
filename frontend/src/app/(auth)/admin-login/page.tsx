"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";


const AdminLogin = () => {

    const router = useRouter();
    const { adminLogin, isLoading } = useAuthStore();

    // Form Data State
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    // handle change input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }



    // handle submit
    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()) {
            toast.error("Please fill all fields");
            return;
        }

        const success = await adminLogin(formData);
        if (success) {
            router.push("/dashboard");
        }
    }



    return (<>

        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-130 w-full">

                <div className="p-6 sm:p-8 rounded-2xl shadow-sm">
                    <h1 className="text-center text-3xl font-semibold tracking-tight">Admin Login</h1>
                    <form className="mt-12 space-y-6" autoComplete="off" onSubmit={handleAdminLogin}>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-800 text-[18px] outline-none px-4 py-3 rounded-lg transition"
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border-2 border-gray-800 text-[18px] outline-none px-4 py-3 rounded-lg transition"
                        />

                        <button disabled={isLoading} className="primary-btn w-full h-11.25 mt-5 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Logging in..." : "Admin Login"}
                        </button>

                    </form>

                </div>
            </div>
        </div>

    </>);
}

export default AdminLogin;