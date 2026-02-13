"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPopup() {

    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {

        const seen = sessionStorage.getItem("dealer-login-popup");

        if (!seen) {
            setOpen(true);
            sessionStorage.setItem("dealer-login-popup", "true");
        }

    }, []);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative w-[90%] max-w-md rounded-xl border border-white/20 
            bg-black/60 backdrop-blur-xl shadow-2xl p-6 text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-3 text-white/70 hover:text-white transition"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-center mb-2">
                            Login Required
                        </h2>

                        <p className="text-center text-white/70 mb-6">
                            Login to access dealer portal
                        </p>

                        <div className="flex gap-4 justify-center">
                            {/* Login Button */}
                            <button
                                onClick={() => router.push("/login")}
                                className="w-max cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:from-orange-600 hover:to-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none transition antialiased"
                            >
                                Login
                            </button>

                            {/* Cancel Button */}
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
