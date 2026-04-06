"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const DealerPortalHeader = () => {
    const router = useRouter();
    const { user } = useAuthStore();
    const isDealer = user?.role === "dealer";

    return (
        <header className="sticky top-0 z-50 w-full bg-black/80 border-b border-white/10 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16 text-white">

                    <Image
                        src="/logo-primary.png"
                        alt="NANYA CNC"
                        height={50}
                        width={200}
                        className="cursor-pointer"
                        onClick={() => router.push("/")}
                    />

                    {isDealer && (
                        <button
                            onClick={() => router.push("/dealer-order")}
                            className="px-6 py-2.5 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition text-sm cursor-pointer"
                        >
                            Order Now
                        </button>
                    )}

                </div>
            </div>
        </header>
    );
};

export default DealerPortalHeader;
