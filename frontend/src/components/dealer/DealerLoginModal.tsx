"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function DealerLoginModal() {

    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithGoogle, register, login } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("All fields are required!");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email!");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password should be at least 6 characters!");
            return;
        }

        if (mode === "signup") {
            if (!formData.name) {
                toast.error("Name is required!");
                return;
            }
            await register(formData);
        } else {
            await login({ name: "", email: formData.email, password: formData.password });
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-[90%] max-w-md rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl p-6 text-white"
                >
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                        style={{ background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.4), #f98513, transparent)" }}
                    />

                    <h2 className="text-2xl font-medium tracking-tighter text-center mb-1">
                        {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>

                    <p className="text-center text-white/60 mb-6 text-sm">
                        {mode === "login"
                            ? "Login to access the dealer portal"
                            : "Sign up to continue"}
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {mode === "signup" && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black text-sm"
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black text-sm"
                        />

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 pr-12 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-orange-500 transition-colors cursor-pointer"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 cursor-pointer border text-sm py-2 shadow-sm bg-gradient-to-b from-orange-500 to-orange-600 border-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-600 transition"
                        >
                            {mode === "login" ? "Login" : "Sign Up"}
                        </button>

                        <div className="flex items-center gap-3 my-3">
                            <div className="flex-1 h-px bg-white/20" />
                            <span className="text-xs text-white/50">OR</span>
                            <div className="flex-1 h-px bg-white/20" />
                        </div>

                        <button
                            type="button"
                            onClick={loginWithGoogle}
                            className="w-full flex items-center cursor-pointer justify-center gap-4 py-2.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition"
                        >
                            <Image src="/googleicon.png" alt="Google" width={20} height={20} />
                            <span className="text-sm">Continue with Google</span>
                        </button>
                    </form>

                    <p className="text-center text-sm text-white/60 mt-5">
                        {mode === "login" ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <button onClick={() => setMode("signup")} className="text-orange-500 hover:underline cursor-pointer">
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setMode("login")} className="text-orange-500 hover:underline cursor-pointer">
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
