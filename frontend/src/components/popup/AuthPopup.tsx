"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";


export default function AuthPopup() {

    const { isOpen, closeModal } = useModal();
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();


    // Auth state
    const { loginWithGoogle, register, login } = useAuthStore();


    // formState
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    // handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }



    // handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();

        try {

            if (mode === "signup") {

                if (!formData.name || !formData.email || !formData.password) {
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

                const isSuccess = await register(formData);

                if (isSuccess) {

                    closeModal();
                    router.refresh();

                    setFormData({
                        name: "",
                        email: "",
                        password: ""
                    });

                } else {
                    return;
                }

            } else {

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


                const isSuccess = await login({
                    name: "", // required by interface but not used
                    email: formData.email,
                    password: formData.password
                });

                if (isSuccess) {

                    closeModal();
                    router.refresh();

                    setFormData({
                        name: "",
                        email: "",
                        password: ""
                    });

                } else {
                    return;
                }

            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }
    }



    return (

        <AnimatePresence>

            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-70 flex items-center justify-center bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >

                    <motion.div
                        initial={{ scale: 0.85, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: 30 }}
                        className="relative w-[90%] max-w-md rounded-xl border border-white/20 bg-black/70 backdrop-blur-xl shadow-2xl p-6 text-white"
                    >

                        {/* Close */}
                        <button
                            onClick={closeModal}
                            className="absolute right-4 top-3 text-white/60 hover:text-white cursor-pointer"
                        >
                            ✕
                        </button>


                        {/* Header */}
                        <h2 className="text-2xl font-medium tracking-tighter text-center mb-1">
                            {mode === "login" ? "Welcome Back" : "Create Account"}
                        </h2>

                        <p className="text-center text-white/60 mb-6 text-sm">
                            {mode === "login"
                                ? "Login to access dealer portal"
                                : "Signup to continue"}
                        </p>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>

                            {mode === "signup" && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            )}

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />

                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 pr-12 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black transition-all"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />

                                {/* Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-orange-500 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>

                            </div>

                            {/* Primary Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full mt-2 cursor-pointer border text-sm py-2 shadow-sm 
                bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 
                text-white rounded-lg hover:from-orange-600 hover:to-orange-600 transition"
                            >
                                {mode === "login" ? "Login" : "Sign Up"}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-3">
                                <div className="flex-1 h-px bg-white/20" />
                                <span className="text-xs text-white/50">OR</span>
                                <div className="flex-1 h-px bg-white/20" />
                            </div>

                            {/* Google */}
                            <button className="w-full flex items-center cursor-pointer justify-center gap-4 py-2.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition"
                                type="button"
                                onClick={loginWithGoogle}
                            >
                                <Image
                                    src="/googleicon.png"
                                    alt="Google logo"
                                    width={22}
                                    height={22}
                                />
                                <span className="text-sm">Continue with Google</span>
                            </button>

                        </form>

                        {/* Footer Toggle */}
                        <p className="text-center text-sm text-white/60 mt-5">
                            {mode === "login" ? (
                                <>
                                    Don’t have an account?{" "}
                                    <button
                                        onClick={() => setMode("signup")}
                                        className="text-orange-500 hover:underline cursor-pointer"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setMode("login")}
                                        className="text-orange-500 hover:underline cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    );
}
