import type { Metadata } from "next";
import "../../globals.css";
import { Work_Sans } from "next/font/google";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Provider from "@/providers/Providers";
import AdminGuard from "@/providers/AdminGuard";


const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});



export const metadata: Metadata = {
    title: "Admin Dashboard | NANYA CNC",
    description: "NANYA CNC Admin Dashboard",
    robots: {
        index: false,
        follow: false,
    },
};



export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${workSans.className} antialiased tracking-tight`}>
                <Provider>
                    <AdminGuard>
                        <DashboardShell>
                            {children}
                        </DashboardShell>
                    </AdminGuard>
                </Provider>
            </body>
        </html>
    );
}
