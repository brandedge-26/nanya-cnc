"use client"


import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "react-hot-toast";


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
            <ModalProvider>
                {children}
            </ModalProvider>
        </AuthProvider>
    );
}
