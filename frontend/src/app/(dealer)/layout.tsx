import type { Metadata } from "next";
import "../globals.css";
import { Work_Sans } from 'next/font/google';
import Provider from "@/providers/Providers";
import DealerLayoutClient from "@/components/dealer/DealerLayoutClient";


const workSans = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});


export const metadata: Metadata = {
    title: "Dealer Portal | NANYA CNC",
    description: "NANYA CNC Dealer Portal",
    robots: {
        index: false,
        follow: false,
    },
};


export default function DealerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${workSans.className} antialiased tracking-tight bg-black text-white`}
            >
                <Provider>
                    <DealerLayoutClient>
                        {children}
                    </DealerLayoutClient>
                </Provider>
            </body>
        </html>
    );
}
