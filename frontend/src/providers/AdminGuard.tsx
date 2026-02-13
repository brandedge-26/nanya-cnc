"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminGuard({ children }: { children: React.ReactNode }) {

    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {

        if (isCheckingAuth) return;


        // Not logged in - redirect to admin login
        if (!isAuthenticated || !user) {
            router.replace("/admin-login");
            return;
        }


        // Logged in but not admin - redirect to home
        if (user.role !== "admin") {
            router.replace("/");
            return;
        }


    }, [isAuthenticated, isCheckingAuth, user, router]);


    // Loading
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    // Not admin - show nothing while redirecting
    if (!isAuthenticated || !user || user.role !== "admin") {
        return null;
    }

    return <>{children}</>;
}
