"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { UserCircle, Mail, ShieldCheck, BadgeCheck } from "lucide-react";


const ProfilePage = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    const initial = (user.name || user.email || "D").charAt(0).toUpperCase();

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Profile Card */}
            <div className="relative rounded-2xl overflow-hidden p-6"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.05) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }} />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.4), #f98513, transparent)"
                }} />

                <div className="relative z-10 flex items-center gap-5">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                        {initial}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user.name || "Dealer"}</h2>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{user.email}</p>
                        <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                            <BadgeCheck size={10} strokeWidth={2.5} />
                            Authorized Dealer
                        </span>
                    </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="rounded-2xl p-6 space-y-4"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-sm font-bold text-white mb-4">Account Information</h3>

                {[
                    { icon: UserCircle, label: "Full Name",   value: user.name || "—",      color: "#f98513" },
                    { icon: Mail,       label: "Email",       value: user.email || "—",     color: "#3b82f6" },
                    { icon: ShieldCheck,label: "Account Role",value: "Dealer",              color: "#22c55e" },
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.label} className="flex items-center gap-4 py-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${item.color}18`, color: item.color }}>
                                <Icon size={16} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</p>
                                <p className="text-sm font-medium text-white mt-0.5">{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                To update your account details, please contact support.
            </p>
        </div>
    );
};

export default ProfilePage;
