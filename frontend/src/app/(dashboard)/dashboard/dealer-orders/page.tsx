"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, X, ShoppingCart, Clock, Truck, CheckCircle2, Package } from "lucide-react";
import { useDealerOrderStore, DealerOrder } from "@/store/dealerOrderStore";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "@/components/popup/DeleteConfirmPopup";

const avatarColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];
const avatarBgs    = [
    "rgba(249,133,19,0.15)", "rgba(59,130,246,0.15)", "rgba(34,197,94,0.15)",
    "rgba(168,85,247,0.15)", "rgba(239,68,68,0.15)",  "rgba(20,184,166,0.15)",
];

const STATUS_CONFIG = {
    pending:   { label: "Pending",   color: "#f98513", bg: "rgba(249,133,19,0.12)",  border: "rgba(249,133,19,0.25)",  icon: Clock },
    shipped:   { label: "Shipped",   color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  icon: Truck },
    delivered: { label: "Delivered", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)",   icon: CheckCircle2 },
};

const DealerOrdersPage = () => {
    const { isLoading, orders, getAllOrders, updateOrderStatus, deleteOrder } = useDealerOrderStore();
    const [searchTerm,   setSearchTerm]   = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => { getAllOrders(); }, [getAllOrders]);

    const filtered = orders.filter((o: DealerOrder) => {
        const matchSearch =
            o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === "All" || o.deliveryStatus === statusFilter;
        return matchSearch && matchStatus;
    });

    const pendingCount   = orders.filter(o => o.deliveryStatus === "pending").length;
    const shippedCount   = orders.filter(o => o.deliveryStatus === "shipped").length;
    const deliveredCount = orders.filter(o => o.deliveryStatus === "delivered").length;

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="space-y-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <ShoppingCart size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Dealer Orders</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading…" : `${orders.length} orders · ${pendingCount} pending · ${shippedCount} shipped · ${deliveredCount} delivered`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <option value="All"       className="bg-[#0A0A0A]">All Status</option>
                        <option value="pending"   className="bg-[#0A0A0A]">Pending</option>
                        <option value="shipped"   className="bg-[#0A0A0A]">Shipped</option>
                        <option value="delivered" className="bg-[#0A0A0A]">Delivered</option>
                    </select>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search name, company, product…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-white outline-none transition"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(249,133,19,0.5)")}
                            onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                style={{ color: "rgba(255,255,255,0.3)" }}>
                                <X size={13} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Quick Stats ── */}
            {!isLoading && orders.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Pending",   value: pendingCount,   color: "#f98513", bg: "rgba(249,133,19,0.08)", icon: Clock },
                        { label: "Shipped",   value: shippedCount,   color: "#3b82f6", bg: "rgba(59,130,246,0.08)", icon: Truck },
                        { label: "Delivered", value: deliveredCount, color: "#22c55e", bg: "rgba(34,197,94,0.08)",  icon: CheckCircle2 },
                    ].map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3"
                                style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
                                <Icon size={16} style={{ color: s.color, flexShrink: 0 }} strokeWidth={2} />
                                <div>
                                    <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Table ── */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {isLoading ? (
                    <div className="flex items-center justify-center py-24 gap-3">
                        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading orders…</span>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Package size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm || statusFilter !== "All" ? "No orders match your filters" : "No dealer orders yet"}
                        </p>
                        {(searchTerm || statusFilter !== "All") && (
                            <button onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                                className="text-xs text-orange-400 hover:text-orange-300 transition cursor-pointer">
                                Clear filters
                            </button>
                        )}
                    </div>

                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "Dealer", "Company", "Product", "Message", "Status", "Date", "Action"].map((h) => (
                                        <th key={h}
                                            className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((order: DealerOrder, index: number) => {
                                    const colorIdx = index % avatarColors.length;
                                    const sc       = STATUS_CONFIG[order.deliveryStatus] || STATUS_CONFIG.pending;
                                    const SIcon    = sc.icon;

                                    return (
                                        <tr key={order._id || index}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>

                                            {/* # */}
                                            <td className="px-5 py-4 text-xs font-mono"
                                                style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(index + 1).padStart(2, "0")}
                                            </td>

                                            {/* Dealer */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                                                        style={{ background: avatarBgs[colorIdx], color: avatarColors[colorIdx] }}>
                                                        {order.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white leading-tight">{order.name}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{order.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Company */}
                                            <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                                                {order.companyName}
                                            </td>

                                            {/* Product */}
                                            <td className="px-5 py-4">
                                                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                                                    style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                    {order.productName}
                                                </span>
                                            </td>

                                            {/* Message */}
                                            <td className="px-5 py-4 max-w-[180px]">
                                                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}
                                                    title={order.message}>
                                                    {order.message || <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full w-fit"
                                                        style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                                                        <SIcon size={9} strokeWidth={2.5} />
                                                        {sc.label}
                                                    </span>
                                                    <select
                                                        value={order.deliveryStatus}
                                                        onChange={(e) => updateOrderStatus(order._id as string, e.target.value)}
                                                        className="text-[10px] font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer"
                                                        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                                                    >
                                                        <option value="pending"   className="bg-[#141414]">Set Pending</option>
                                                        <option value="shipped"   className="bg-[#141414]">Set Shipped</option>
                                                        <option value="delivered" className="bg-[#141414]">Set Delivered</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs whitespace-nowrap"
                                                style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {formatDate(order.createdAt)}
                                            </td>

                                            {/* Delete */}
                                            <td className="px-5 py-4">
                                                <button
                                                    title="Delete Order"
                                                    onClick={() => openModal(
                                                        <DeleteConfirmPopup
                                                            title={`Order by ${order.name}`}
                                                            onClose={closeModal}
                                                            onDelete={() => deleteOrder(order._id as string)}
                                                        />
                                                    )}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                    style={{ color: "#ef4444" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                                                >
                                                    <Trash2 size={15} strokeWidth={2} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!isLoading && filtered.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filtered.length} of {orders.length} orders
                </p>
            )}
        </div>
    );
};

export default DealerOrdersPage;
