import type { Metadata } from "next";
import "../globals.css";
import { Work_Sans } from 'next/font/google';
import Provider from "@/providers/Providers";
import { Toaster } from "react-hot-toast";


const workSans = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});



export const metadata: Metadata = {
    title: "Admin Login | NANYA CNC",
    description: "NANYA CNC admin sign-in.",
    robots: {
        index: false,
        follow: false,
    },
};


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${workSans.className} antialiased tracking-tight`}
            >
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
