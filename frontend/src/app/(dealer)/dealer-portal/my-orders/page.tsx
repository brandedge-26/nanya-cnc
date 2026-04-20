"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import Link from "next/link";
import { Clock, CheckCircle2, Truck, PackageSearch, ShoppingCart } from "lucide-react";


const statusConfig = {
    pending:   { label: "Pending",   color: "#f98513", bg: "rgba(249,133,19,0.1)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    shipped:   { label: "Shipped",   color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)",  icon: Truck },
    delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)",   icon: CheckCircle2 },
};


const MyOrdersPage = () => {

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

    const myOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    const formatDate = (d?: string) => d
        ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "—";

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>
                        <PackageSearch size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">My Orders</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading..." : `${myOrders.length} orders placed`}
                        </p>
                    </div>
                </div>
                <Link href="/dealer-portal/place-order"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black"
                    style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                    <ShoppingCart size={14} strokeWidth={2.5} />
                    New Order
                </Link>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                {isLoading ? (
                    <div className="flex items-center justify-center py-20 gap-3">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading orders…</span>
                    </div>
                ) : myOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <PackageSearch size={36} style={{ color: "rgba(255,255,255,0.12)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>No orders yet</p>
                        <Link href="/dealer-portal/place-order" className="text-xs text-orange-400 hover:text-orange-300 transition">
                            Place your first order →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "Product", "Company", "Status", "Date"].map((h) => (
                                        <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map((order, i) => {
                                    const s = statusConfig[order.deliveryStatus] || statusConfig.pending;
                                    const Icon = s.icon;
                                    return (
                                        <tr key={order._id || i}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                                            <td className="px-5 py-4 text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(i + 1).padStart(2, "0")}
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-white">{order.productName}</p>
                                                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{order.message?.slice(0, 50)}{order.message?.length > 50 ? "…" : ""}</p>
                                            </td>
                                            <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{order.companyName}</td>
                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                                                    style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                                                    <Icon size={9} strokeWidth={2.5} />
                                                    {s.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-xs whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
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

            {!isLoading && myOrders.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {myOrders.length} total orders
                </p>
            )}
        </div>
    );
};

export default MyOrdersPage;
