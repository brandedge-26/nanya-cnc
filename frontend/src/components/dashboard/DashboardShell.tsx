"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    ClipboardList,
    Users,
    LogOut,
    PlusCircle,
    ShoppingCart,
    Menu,
    X,
    ChevronDown,
    KeyRound,
    MessageSquare,
    HeadphonesIcon,
} from "lucide-react";
import Image from "next/image";
import { useDealerStore } from "@/store/dealerStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import { useDealerQuotationStore } from "@/store/dealerQuotationStore";
import { useDealerSupportStore } from "@/store/dealerSupportStore";
import { useAuthStore } from "@/store/authStore";
import { useModal } from "@/context/ModalContext";
import ChangePasswordModal from "@/components/sidebar/ChangePasswordModal";


const menuItems = [
    { label: "Overview",           path: "/dashboard",                    icon: LayoutDashboard, exact: true },
    { label: "Dealer Requests",    path: "/dashboard/dealer-requests",    icon: Users },
    { label: "Dealer Orders",      path: "/dashboard/dealer-orders",      icon: ShoppingCart },
    { label: "Dealer Quotations",  path: "/dashboard/dealer-quotations",  icon: FileText },
    { label: "All Users",          path: "/dashboard/all-users",          icon: Users },
    { label: "All Applications",   path: "/dashboard/all-applications",   icon: ClipboardList },
    { label: "Consultations",      path: "/dashboard/consultations",      icon: MessageSquare },
    { label: "Dealer Support",     path: "/dashboard/dealer-support",     icon: HeadphonesIcon },
    { label: "Finance Applications", path: "/dashboard/finance-applications", icon: FileText },
    { label: "Add Blog",           path: "/dashboard/add-blog",           icon: PlusCircle },
    { label: "All Blogs",          path: "/dashboard/all-blogs",          icon: FileText },
];

const pageTitles: Record<string, string> = {
    "/dashboard":                        "Overview",
    "/dashboard/dealer-requests":        "Dealer Requests",
    "/dashboard/dealer-orders":          "Dealer Orders",
    "/dashboard/dealer-quotations":      "Dealer Quotations",
    "/dashboard/all-users":              "All Users",
    "/dashboard/all-applications":       "All Applications",
    "/dashboard/consultations":          "Consultations",
    "/dashboard/dealer-support":         "Dealer Support",
    "/dashboard/finance-applications":   "Finance Applications",
    "/dashboard/add-blog":               "Add Blog",
    "/dashboard/all-blogs":              "All Blogs",
};


export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { pendingCount, getPendingRequestCount } = useDealerStore();
    const { pendingOrderCount, getPendingOrderCount } = useDealerOrderStore();
    const { pendingQuotationCount, getPendingQuotationCount } = useDealerQuotationStore();
    const { openTicketCount, getOpenTicketCount } = useDealerSupportStore();
    const { logout, user } = useAuthStore();
    const { openModal } = useModal();

    const adminName = user?.username || user?.name || "Admin";
    const adminInitial = adminName.charAt(0).toUpperCase();

    useEffect(() => {
        getPendingRequestCount();
        getPendingOrderCount();
        getPendingQuotationCount();
        getOpenTicketCount();
    }, [getPendingRequestCount, getPendingOrderCount, getPendingQuotationCount, getOpenTicketCount]);

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        setDropdownOpen(false);
        await logout();
        router.push("/admin-login");
    };

    const handleChangePassword = () => {
        setDropdownOpen(false);
        openModal(<ChangePasswordModal />);
    };

    const isActive = (path: string, exact?: boolean) =>
        exact ? pathname === path : pathname.startsWith(path);

    const getTitle = () => {
        if (pathname.startsWith("/dashboard/dealer-requests/")) return "Dealer Request Detail";
        if (pathname.startsWith("/dashboard/all-users/"))       return "User Detail";
        if (pathname.startsWith("/dashboard/all-applications/")) return "Application Detail";
        return pageTitles[pathname] || "Dashboard";
    };

    return (
        <div className="min-h-screen" style={{ background: "#0d0d0d" }}>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className="fixed top-0 left-0 h-full w-64 flex flex-col z-40 overflow-hidden transition-transform duration-300 ease-in-out"
                style={{
                    background: "#0A0A0A",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                }}
            >
                {/* Grid bg */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.07) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }} />
                {/* Glow */}
                <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(249,133,19,0.20) 0%, transparent 70%)"
                }} />
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.5), #f98513, transparent)"
                }} />

                {/* Logo */}
                <div className="relative z-10 flex items-center justify-between px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-orange-500/10 border border-orange-500/20">
                            <Image src="/logo-primary.png" alt="NANYA CNC" width={24} height={24} className="object-contain" />
                        </div>
                        <div>
                            <p className="text-sm font-bold leading-none tracking-tight">
                                <span style={{ color: "#f98513" }}>NANYA</span>
                                <span className="text-white"> CNC</span>
                            </p>
                            <p className="text-[9px] mt-0.5 font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
                                Admin Panel
                            </p>
                        </div>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/40 hover:text-white p-1">
                        <X size={18} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="relative z-10 flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {menuItems.map((item) => {
                        const active = isActive(item.path, item.exact);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative"
                                style={active
                                    ? { background: "#f98513", color: "#fff", boxShadow: "0 4px 16px rgba(249,133,19,0.35)" }
                                    : { color: "rgba(255,255,255,0.45)" }
                                }
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "rgba(249,133,19,0.12)";
                                        e.currentTarget.style.color = "#fff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                                    }
                                }}
                            >
                                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                                <span className="flex-1">{item.label}</span>
                                {item.label === "Dealer Requests" && pendingCount > 0 && (
                                    <span className="flex items-center justify-center bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                                        {pendingCount}
                                    </span>
                                )}
                                {item.label === "Dealer Orders" && pendingOrderCount > 0 && (
                                    <span className="flex items-center justify-center bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                                        {pendingOrderCount}
                                    </span>
                                )}
                                {item.label === "Dealer Quotations" && pendingQuotationCount > 0 && (
                                    <span className="flex items-center justify-center bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                                        {pendingQuotationCount}
                                    </span>
                                )}
                                {item.label === "Dealer Support" && openTicketCount > 0 && (
                                    <span className="flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                                        {openTicketCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sign Out */}
                <div className="relative z-10 px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 text-sm font-semibold py-2.5 px-3 rounded-xl transition-all w-full cursor-pointer"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.background = "rgba(239,68,68,0.12)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                            e.currentTarget.style.background = "";
                        }}
                    >
                        <LogOut size={15} strokeWidth={2} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Desktop sidebar always visible */}
            <style>{`@media (min-width: 768px) { aside { transform: translateX(0) !important; } }`}</style>

            {/* ── TopBar ── */}
            <header
                className="fixed top-0 right-0 h-[60px] flex items-center justify-between px-4 sm:px-6 z-20 transition-all"
                style={{
                    left: 0,
                    background: "#0A0A0A",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
            >
                <div className="flex items-center gap-3">
                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <Menu size={18} strokeWidth={2} className="text-white" />
                    </button>
                    {/* Spacer to align title past sidebar on desktop */}
                    <div className="hidden md:block w-64 flex-shrink-0" />
                    <h1 className="font-bold text-sm sm:text-base text-white">{getTitle()}</h1>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Admin chip with dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((v) => !v)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "#f98513" }}>
                                {adminInitial}
                            </div>
                            <span className="hidden sm:block text-sm font-semibold max-w-[120px] truncate text-white">{adminName}</span>
                            <ChevronDown
                                size={13}
                                className="hidden sm:block text-white/40 transition-transform"
                                style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                            />
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl overflow-hidden z-50"
                                style={{
                                    background: "#141414",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    top: "100%",
                                }}
                            >
                                <button
                                    onClick={handleChangePassword}
                                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold transition-all cursor-pointer"
                                    style={{ color: "rgba(255,255,255,0.75)" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                                >
                                    <KeyRound size={14} strokeWidth={2} className="text-orange-400" />
                                    Change Password
                                </button>
                                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 12px" }} />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold transition-all cursor-pointer"
                                    style={{ color: "#ef4444" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                >
                                    <LogOut size={14} strokeWidth={2} />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="pt-[60px] min-h-screen md:ml-64">
                <div className="p-4 sm:p-6">{children}</div>
            </main>

        </div>
    );
}
