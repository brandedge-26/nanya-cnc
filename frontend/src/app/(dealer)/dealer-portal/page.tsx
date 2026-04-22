"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import { useDealerQuotationStore } from "@/store/dealerQuotationStore";
import { useDealerSupportStore } from "@/store/dealerSupportStore";
import Link from "next/link";
import {
    ShoppingCart, PackageSearch, Box, HeadphonesIcon,
    ChevronRight, Clock, CheckCircle2, Truck, FileText,
    BookOpen, AlertCircle, RotateCcw,
} from "lucide-react";


const orderStatusConfig = {
    pending:   { label: "Pending",   color: "#f98513", bg: "rgba(249,133,19,0.1)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    shipped:   { label: "Shipped",   color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)",  icon: Truck },
    delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)",   icon: CheckCircle2 },
};

const supportStatusConfig = {
    "open":         { label: "Open",        color: "#f98513", bg: "rgba(249,133,19,0.1)",  icon: Clock },
    "in-progress":  { label: "In Progress", color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  icon: RotateCcw },
    "resolved":     { label: "Resolved",    color: "#22c55e", bg: "rgba(34,197,94,0.1)",   icon: CheckCircle2 },
};

const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";


const DealerOverview = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const { orders, getMyOrders, isLoading: ordersLoading } = useDealerOrderStore();
    const { quotations, getMyQuotations, isLoading: quotationsLoading } = useDealerQuotationStore();
    const { tickets, getMyTickets, isLoading: ticketsLoading } = useDealerSupportStore();

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    useEffect(() => {
        if (user?.role === "dealer") {
            getMyOrders();
            getMyQuotations();
            getMyTickets();
        }
    }, [user, getMyOrders, getMyQuotations, getMyTickets]);

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    const pendingOrders    = orders.filter(o => o.deliveryStatus === "pending").length;
    const shippedOrders    = orders.filter(o => o.deliveryStatus === "shipped").length;
    const pendingQuotations = quotations.filter(q => q.status === "pending").length;
    const openTickets      = tickets.filter(t => t.status === "open").length;

    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        .slice(0, 4);

    const quickActions = [
        { label: "Place Order",  desc: "Order CNC machines",     icon: ShoppingCart,   href: "/dealer-portal/place-order",  color: "#f98513" },
        { label: "My Orders",    desc: "Track your orders",       icon: PackageSearch,  href: "/dealer-portal/my-orders",    color: "#3b82f6" },
        { label: "Get Quote",    desc: "Request a price quote",   icon: FileText,       href: "/dealer-portal/quotation",    color: "#a855f7" },
        { label: "Products",     desc: "Browse CNC catalogue",    icon: Box,            href: "/dealer-portal/products",     color: "#14b8a6" },
        { label: "Catalogue",    desc: "Download product PDF",    icon: BookOpen,       href: "/dealer-portal/catalogue",    color: "#22c55e" },
        { label: "Support",      desc: "Get help & assistance",   icon: HeadphonesIcon, href: "/dealer-portal/support",      color: "#ef4444" },
    ];

    return (
        <div className="space-y-5">

            {/* Welcome Banner */}
            <div className="relative rounded-2xl overflow-hidden p-6 md:p-8"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.06) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }} />
                <div className="absolute top-0 left-0 right-0 h-full pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 25% 0%, rgba(249,133,19,0.16) 0%, transparent 65%)"
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
                            {(pendingOrders + openTickets) > 0
                                ? <>{pendingOrders > 0 && <><span className="text-orange-400 font-semibold">{pendingOrders} order{pendingOrders > 1 ? "s" : ""}</span> pending</>}{pendingOrders > 0 && openTickets > 0 ? " · " : ""}{openTickets > 0 && <><span className="text-red-400 font-semibold">{openTickets} ticket{openTickets > 1 ? "s" : ""}</span> open</>}</>
                                : "Manage your orders, browse products, and get support."
                            }
                        </p>
                    </div>
                    <Link
                        href="/dealer-portal/place-order"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                        <ShoppingCart size={15} strokeWidth={2.5} />
                        Place New Order
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Total Orders",    value: ordersLoading    ? "—" : orders.length,    color: "#f98513", bg: "rgba(249,133,19,0.08)",  border: "rgba(249,133,19,0.15)" },
                    { label: "Pending Orders",  value: ordersLoading    ? "—" : pendingOrders,    color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.15)" },
                    { label: "Quotations",      value: quotationsLoading? "—" : quotations.length, color: "#a855f7", bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.15)" },
                    { label: "Support Tickets", value: ticketsLoading   ? "—" : tickets.length,   color: "#22c55e", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.15)"  },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl px-4 py-3.5"
                        style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                        <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[11px] font-semibold mt-0.5 text-white">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Quick Actions</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {quickActions.map((a) => {
                        const Icon = a.icon;
                        return (
                            <Link key={a.href} href={a.href}
                                className="rounded-xl p-3.5 flex flex-col items-start gap-2.5 transition-all"
                                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${a.color}44`; e.currentTarget.style.background = `${a.color}06`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#0A0A0A"; }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: `${a.color}18`, color: a.color }}>
                                    <Icon size={15} strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white leading-tight">{a.label}</p>
                                    <p className="text-[10px] mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>{a.desc}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Orders + Recent Tickets */}
            <div className="grid lg:grid-cols-2 gap-5">

                {/* Recent Orders */}
                <div className="rounded-2xl overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between px-5 py-4"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-sm font-bold text-white">Recent Orders</p>
                        <Link href="/dealer-portal/my-orders"
                            className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold transition">
                            View all <ChevronRight size={12} strokeWidth={2.5} />
                        </Link>
                    </div>
                    {ordersLoading ? (
                        <div className="flex items-center justify-center py-10 gap-3">
                            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading…</span>
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                            <AlertCircle size={28} style={{ color: "rgba(255,255,255,0.1)" }} />
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>No orders yet</p>
                            <Link href="/dealer-portal/place-order" className="text-xs text-orange-400 hover:text-orange-300 transition">
                                Place your first order →
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {recentOrders.map((order, i) => {
                                const s    = orderStatusConfig[order.deliveryStatus] || orderStatusConfig.pending;
                                const Icon = s.icon;
                                return (
                                    <div key={order._id || i}
                                        className="flex items-center gap-3 px-5 py-3.5"
                                        style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: s.bg, color: s.color }}>
                                            <Icon size={14} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{order.productName}</p>
                                            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{formatDate(order.createdAt)}</p>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                                            style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Recent Support Tickets */}
                <div className="rounded-2xl overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between px-5 py-4"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-sm font-bold text-white">Support Tickets</p>
                        <Link href="/dealer-portal/support"
                            className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold transition">
                            View all <ChevronRight size={12} strokeWidth={2.5} />
                        </Link>
                    </div>
                    {ticketsLoading ? (
                        <div className="flex items-center justify-center py-10 gap-3">
                            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading…</span>
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                            <HeadphonesIcon size={28} style={{ color: "rgba(255,255,255,0.1)" }} />
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>No support tickets yet</p>
                            <Link href="/dealer-portal/support" className="text-xs text-orange-400 hover:text-orange-300 transition">
                                Submit a ticket →
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {tickets.slice(0, 4).map((ticket, i) => {
                                const sc   = supportStatusConfig[ticket.status] || supportStatusConfig.open;
                                const Icon = sc.icon;
                                return (
                                    <div key={ticket._id || i}
                                        className="flex items-center gap-3 px-5 py-3.5"
                                        style={{ borderBottom: i < Math.min(tickets.length, 4) - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: sc.bg, color: sc.color }}>
                                            <Icon size={14} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{ticket.subject}</p>
                                            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{ticket.topic}</p>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                                            style={{ background: sc.bg, color: sc.color }}>
                                            {sc.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DealerOverview;
