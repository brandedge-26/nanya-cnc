"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import Link from "next/link";
import {
    ShoppingCart,
    PackageSearch,
    Box,
    HeadphonesIcon,
    ChevronRight,
    Clock,
    CheckCircle2,
    Truck,
    AlertCircle,
} from "lucide-react";


const statusConfig = {
    pending:   { label: "Pending",   color: "#f98513", bg: "rgba(249,133,19,0.1)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    shipped:   { label: "Shipped",   color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)",  icon: Truck },
    delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)",   icon: CheckCircle2 },
};


const DealerOverview = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const { orders, getMyOrders, isLoading } = useDealerOrderStore();

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    useEffect(() => {
        if (user?.role === "dealer") getMyOrders();
    }, [user, getMyOrders]);

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    const myOrders = orders;
    const pendingCount   = myOrders.filter((o) => o.deliveryStatus === "pending").length;
    const shippedCount   = myOrders.filter((o) => o.deliveryStatus === "shipped").length;
    const recentOrders   = [...myOrders]
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        .slice(0, 5);

    const formatDate = (d?: string) => d
        ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "—";

    const quickActions = [
        { label: "Place Order",  desc: "Order CNC machines",    icon: ShoppingCart,   href: "/dealer-portal/place-order", color: "#f98513" },
        { label: "My Orders",    desc: "Track your orders",      icon: PackageSearch,  href: "/dealer-portal/my-orders",   color: "#3b82f6" },
        { label: "Products",     desc: "Browse catalog",         icon: Box,            href: "/dealer-portal/products",    color: "#a855f7" },
        { label: "Support",      desc: "Get help & assistance",  icon: HeadphonesIcon, href: "/dealer-portal/support",     color: "#22c55e" },
    ];

    return (
        <div className="space-y-6">

            {/* Welcome Banner */}
            <div className="relative rounded-2xl overflow-hidden p-6 md:p-8"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.06) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }} />
                <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 30% 0%, rgba(249,133,19,0.18) 0%, transparent 70%)"
                }} />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.4), #f98513, transparent)"
                }} />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1">Dealer Portal</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Welcome back, <span className="text-orange-400">{user.name || "Dealer"}</span>
                        </h1>
                        <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Manage your orders, browse products, and get support.
                        </p>
                    </div>
                    <Link
                        href="/dealer-portal/place-order"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}
                    >
                        <ShoppingCart size={15} strokeWidth={2.5} />
                        Place New Order
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { label: "Total Orders", value: myOrders.length, color: "#f98513" },
                    { label: "Pending",      value: pendingCount,    color: "#f98513" },
                    { label: "Shipped",      value: shippedCount,    color: "#3b82f6" },
                ].map((s) => (
                    <div key={s.label} className="rounded-2xl p-5" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
                        <p className="text-3xl font-bold" style={{ color: s.color }}>
                            {isLoading ? "—" : s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Quick Actions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickActions.map((a) => {
                        const Icon = a.icon;
                        return (
                            <Link key={a.href} href={a.href}
                                className="rounded-2xl p-4 flex items-center gap-3.5 transition-all"
                                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${a.color}44`; e.currentTarget.style.background = `${a.color}08`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#0A0A0A"; }}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${a.color}18`, color: a.color }}>
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white">{a.label}</p>
                                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{a.desc}</p>
                                </div>
                                <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.2)" }} className="flex-shrink-0" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Orders */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Recent Orders</h2>
                    <Link href="/dealer-portal/my-orders" className="text-xs text-orange-400 hover:text-orange-300 transition">View all →</Link>
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12 gap-3">
                            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading orders…</span>
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 gap-3">
                            <AlertCircle size={32} style={{ color: "rgba(255,255,255,0.12)" }} />
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>No orders yet</p>
                            <Link href="/dealer-portal/place-order" className="text-xs text-orange-400 hover:text-orange-300 transition">
                                Place your first order →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                        {["Product", "Company", "Status", "Date"].map((h) => (
                                            <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                                style={{ color: "rgba(255,255,255,0.35)" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, i) => {
                                        const s = statusConfig[order.deliveryStatus] || statusConfig.pending;
                                        const Icon = s.icon;
                                        return (
                                            <tr key={order._id || i}
                                                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                                <td className="px-5 py-3.5 text-sm font-semibold text-white">{order.productName}</td>
                                                <td className="px-5 py-3.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{order.companyName}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                                                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                                                        <Icon size={9} strokeWidth={2.5} />
                                                        {s.label}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                                                    {formatDate(order.createdAt)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DealerOverview;
