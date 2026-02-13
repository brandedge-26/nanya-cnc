"use client";
import React, { createContext, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { checkAuth, isCheckingAuth } = useAuthStore();
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            await checkAuth();

            setTimeout(() => {
                setInitialLoading(false);
            }, 800);
        };

        initialize();
    }, [checkAuth]);


    // Show loading if either initial load or auth check is running
    const isLoading = initialLoading || isCheckingAuth;

    return (
        <AuthContext.Provider value={null}>
            {isLoading ? (
                <div className="flex h-screen items-center justify-center">


                    {/* Spinner */}
                    <Loader
                        className="animate-spin mx-auto mb-4 text-orange-500"
                        size={30}
                    />

                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};