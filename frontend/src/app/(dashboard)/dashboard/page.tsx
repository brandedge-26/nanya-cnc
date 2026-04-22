"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
    Users, FileText, ClipboardList, Handshake,
    ArrowRight, Clock, CheckCircle2, XCircle,
    ShoppingCart, HeadphonesIcon, MessageSquare,
    ArrowUpRight, Truck,
} from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useDealerStore } from "@/store/dealerStore";
import { useApplicationStore } from "@/store/applicationStore";
import { useBlogStore } from "@/store/blogStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import { useDealerQuotationStore } from "@/store/dealerQuotationStore";
import { useDealerSupportStore } from "@/store/dealerSupportStore";


const dealerStatusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    pending:  { label: "Pending",  color: "#f98513", bg: "rgba(249,133,19,0.12)",  icon: Clock },
    idle:     { label: "Pending",  color: "#f98513", bg: "rgba(249,133,19,0.12)",  icon: Clock },
    accept:   { label: "Accepted", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   icon: CheckCircle2 },
    reject:   { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.12)",   icon: XCircle },
};

const orderStatusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    pending:   { label: "Pending",   color: "#f98513", bg: "rgba(249,133,19,0.12)", icon: Clock },
    shipped:   { label: "Shipped",   color: "#3b82f6", bg: "rgba(59,130,246,0.12)", icon: Truck },
    delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.12)",  icon: CheckCircle2 },
};

const avatarColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs    = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];


const DashboardPage = () => {

    const { users, getAllUsers }                             = useUserStore();
    const { dealerRequests, getAllDealerRequests }           = useDealerStore();
    const { applications, getAllApplications }               = useApplicationStore();
    const { blogs, getAllBlogs }                             = useBlogStore();
    const { orders, getAllOrders }                           = useDealerOrderStore();
    const { quotations, getAllQuotations }                   = useDealerQuotationStore();
    const { tickets, getAllTickets }                         = useDealerSupportStore();

    useEffect(() => {
        getAllUsers();
        getAllDealerRequests();
        getAllApplications();
        getAllBlogs();
        getAllOrders();
        getAllQuotations();
        getAllTickets();
    }, [getAllUsers, getAllDealerRequests, getAllApplications, getAllBlogs, getAllOrders, getAllQuotations, getAllTickets]);

    const pendingDealers   = dealerRequests.filter(d => d.status === "pending" || d.status === "idle").length;
    const pendingOrders    = orders.filter(o => o.deliveryStatus === "pending").length;
    const pendingQuotations = quotations.filter(q => q.status === "pending").length;
    const openTickets      = tickets.filter(t => t.status === "open").length;

    const recentDealers    = useMemo(() => [...dealerRequests].slice(0, 4), [dealerRequests]);
    const recentOrders     = useMemo(() => [...orders].slice(0, 4), [orders]);

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";

    const stats = [
        { label: "Total Users",      value: users.length,           sub: "Registered accounts", icon: Users,          color: "#3b82f6", bg: "rgba(59,130,246,0.12)"  },
        { label: "Dealer Requests",  value: dealerRequests.length,  sub: `${pendingDealers} pending`, icon: Handshake, color: "#f98513", bg: "rgba(249,133,19,0.12)", alert: pendingDealers > 0 },
        { label: "Dealer Orders",    value: orders.length,          sub: `${pendingOrders} pending`,  icon: ShoppingCart, color: "#a855f7", bg: "rgba(168,85,247,0.12)", alert: pendingOrders > 0 },
        { label: "Quotations",       value: quotations.length,      sub: `${pendingQuotations} pending`, icon: FileText, color: "#14b8a6", bg: "rgba(20,184,166,0.12)", alert: pendingQuotations > 0 },
        { label: "Applications",     value: applications.length,    sub: "Consultation requests", icon: ClipboardList, color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
        { label: "Support Tickets",  value: tickets.length,         sub: `${openTickets} open`,  icon: HeadphonesIcon, color: "#ef4444", bg: "rgba(239,68,68,0.12)",  alert: openTickets > 0  },
    ];

    return (
        <div className="space-y-5">

            {/* ── Welcome Banner ── */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.08) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }} />
                <div className="absolute top-0 left-0 right-0 h-full pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 20% 0%, rgba(249,133,19,0.18) 0%, transparent 60%)"
                }} />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.5), #f98513, transparent)"
                }} />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1">Admin Dashboard</p>
                        <h2 className="text-2xl font-bold text-white mb-1.5">
                            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}
                        </h2>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                            {(pendingDealers + pendingOrders + openTickets) > 0
                                ? <>You have <span className="font-bold text-orange-400">{pendingDealers + pendingOrders + openTickets} items</span> requiring attention.</>
                                : "Everything is up to date. Have a great day!"
                            }
                        </p>
                    </div>
                    <div className="flex gap-2.5 flex-wrap">
                        <Link href="/dashboard/dealer-requests"
                            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-black"
                            style={{ background: "#f98513" }}>
                            <Handshake size={14} strokeWidth={2.5} />
                            Dealer Requests
                        </Link>
                        <Link href="/dashboard/dealer-orders"
                            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}>
                            <ShoppingCart size={14} strokeWidth={2} />
                            Orders
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="rounded-2xl p-4"
                            style={{
                                background: "#0A0A0A",
                                border: s.alert ? `1px solid ${s.color}44` : "1px solid rgba(255,255,255,0.07)",
                            }}>
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                                style={{ background: s.bg, color: s.color }}>
                                <Icon size={15} strokeWidth={2} />
                            </div>
                            <p className="text-2xl font-bold text-white">{s.value}</p>
                            <p className="text-[11px] font-semibold text-white mt-0.5 truncate">{s.label}</p>
                            <p className="text-[10px] mt-0.5 truncate" style={{ color: s.alert ? s.color : "rgba(255,255,255,0.35)" }}>
                                {s.sub}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* ── Two-column activity section ── */}
            <div className="grid xl:grid-cols-2 gap-5">

                {/* Recent Dealer Requests */}
                <div className="rounded-2xl overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between px-5 py-4"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                                <Handshake size={13} strokeWidth={2} />
                            </div>
                            <p className="text-sm font-bold text-white">Recent Dealer Requests</p>
                        </div>
                        <Link href="/dashboard/dealer-requests"
                            className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition">
                            View all <ArrowUpRight size={11} strokeWidth={2.5} />
                        </Link>
                    </div>
                    {recentDealers.length === 0 ? (
                        <div className="flex items-center justify-center py-10">
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No dealer requests yet</p>
                        </div>
                    ) : (
                        <div>
                            {recentDealers.map((dealer, i) => {
                                const sKey = dealer.status === "idle" ? "pending" : dealer.status;
                                const sc   = dealerStatusConfig[sKey] || dealerStatusConfig.pending;
                                const Icon = sc.icon;
                                return (
                                    <div key={dealer._id || i}
                                        className="flex items-center gap-3 px-5 py-3.5"
                                        style={{ borderBottom: i < recentDealers.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                                            style={{ background: avatarBgs[i % avatarBgs.length], color: avatarColors[i % avatarColors.length] }}>
                                            {dealer.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{dealer.name}</p>
                                            <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{dealer.companyName}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                                            style={{ background: sc.bg, color: sc.color }}>
                                            <Icon size={8} strokeWidth={2.5} />
                                            {sc.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Recent Orders */}
                <div className="rounded-2xl overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between px-5 py-4"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}>
                                <ShoppingCart size={13} strokeWidth={2} />
                            </div>
                            <p className="text-sm font-bold text-white">Recent Dealer Orders</p>
                        </div>
                        <Link href="/dashboard/dealer-orders"
                            className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition">
                            View all <ArrowUpRight size={11} strokeWidth={2.5} />
                        </Link>
                    </div>
                    {recentOrders.length === 0 ? (
                        <div className="flex items-center justify-center py-10">
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No orders yet</p>
                        </div>
                    ) : (
                        <div>
                            {recentOrders.map((order, i) => {
                                const sc   = orderStatusConfig[order.deliveryStatus] || orderStatusConfig.pending;
                                const Icon = sc.icon;
                                return (
                                    <div key={order._id || i}
                                        className="flex items-center gap-3 px-5 py-3.5"
                                        style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                                            style={{ background: avatarBgs[i % avatarBgs.length], color: avatarColors[i % avatarColors.length] }}>
                                            {order.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{order.productName}</p>
                                            <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{order.name} · {formatDate(order.createdAt)}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                                            style={{ background: sc.bg, color: sc.color }}>
                                            <Icon size={8} strokeWidth={2.5} />
                                            {sc.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Three-column module status ── */}
            <div className="grid sm:grid-cols-3 gap-4">
                {[
                    {
                        label: "Consultations",
                        value: applications.length,
                        icon: MessageSquare,
                        color: "#22c55e",
                        bg: "rgba(34,197,94,0.08)",
                        href: "/dashboard/consultations",
                        sub: "Total requests",
                    },
                    {
                        label: "Support Tickets",
                        value: tickets.length,
                        icon: HeadphonesIcon,
                        color: "#ef4444",
                        bg: "rgba(239,68,68,0.08)",
                        href: "/dashboard/dealer-support",
                        sub: `${openTickets} open`,
                        alert: openTickets > 0,
                    },
                    {
                        label: "Blog Posts",
                        value: blogs.length,
                        icon: FileText,
                        color: "#a855f7",
                        bg: "rgba(168,85,247,0.08)",
                        href: "/dashboard/all-blogs",
                        sub: `${blogs.filter(b => b.featuredOnHome).length} featured`,
                    },
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.label} href={item.href}
                            className="rounded-2xl p-5 flex items-center gap-4 transition-all"
                            style={{ background: item.bg, border: `1px solid ${item.color}22` }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${item.color}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${item.color}22`; }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${item.color}18`, color: item.color }}>
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-2xl font-bold text-white">{item.value}</p>
                                <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                                <p className="text-[11px] mt-0.5" style={{ color: item.alert ? item.color : "rgba(255,255,255,0.4)" }}>
                                    {item.sub}
                                </p>
                            </div>
                            <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        </Link>
                    );
                })}
            </div>

            {/* ── Recent Applications ── */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
                            <ClipboardList size={13} strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Recent Applications</p>
                            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>Latest consultation requests</p>
                        </div>
                    </div>
                    <Link href="/dashboard/all-applications"
                        className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition">
                        View all <ArrowRight size={11} strokeWidth={2.5} />
                    </Link>
                </div>

                {applications.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>No applications yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "Name", "Email", "Company", "Message"].map((h) => (
                                        <th key={h} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {applications.slice(0, 5).map((app, i) => (
                                    <tr key={app._id ?? i}
                                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                        <td className="px-5 py-3.5 text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                                                    style={{ background: avatarBgs[i % avatarBgs.length], color: avatarColors[i % avatarColors.length] }}>
                                                    {app.firstName.charAt(0).toUpperCase()}
                                                </div>
                                                <p className="text-sm font-semibold text-white whitespace-nowrap">{app.firstName} {app.lastName}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{app.email}</td>
                                        <td className="px-5 py-3.5 text-xs whitespace-nowrap" style={{ color: "rgba(255,255,255,0.5)" }}>{app.companyName}</td>
                                        <td className="px-5 py-3.5 text-xs max-w-[200px] truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                                            {app.message}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default DashboardPage;
