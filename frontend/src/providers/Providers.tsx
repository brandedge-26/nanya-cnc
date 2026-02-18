"use client"


import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "react-hot-toast";
import GoogleOneTap from "@/components/auth/GoogleOneTap";


export default function Provider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        backgroundColor: "black",
                        color: "white",
                        border: "1px solid #333333"
                    }
                }}
            />
            <GoogleOneTap />
            <ModalProvider>
                {children}
            </ModalProvider>
        </AuthProvider>
    );
}
