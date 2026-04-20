"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
    Users, FileText, ClipboardList, Handshake,
    TrendingUp, ArrowRight, ArrowUpRight, Clock,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useUserStore } from "@/store/userStore";
import { useDealerStore } from "@/store/dealerStore";
import { useApplicationStore } from "@/store/applicationStore";
import { useBlogStore } from "@/store/blogStore";


const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DashboardPage = () => {

    const { users, getAllUsers } = useUserStore();
    const { dealerRequests, getAllDealerRequests } = useDealerStore();
    const { applications, getAllApplications } = useApplicationStore();
    const { blogs, getAllBlogs } = useBlogStore();

    useEffect(() => {
        getAllUsers();
        getAllDealerRequests();
        getAllApplications();
        getAllBlogs();
    }, [getAllUsers, getAllDealerRequests, getAllApplications, getAllBlogs]);

    const counts = {
        users: users.length,
        dealers: dealerRequests.length,
        applications: applications.length,
        blogs: blogs.length,
    };

    const pendingDealers = dealerRequests.filter(d => d.status === "pending").length;

    // Monthly applications breakdown
    const year = new Date().getFullYear();
    const monthlyData = useMemo(() =>
        MONTHS.map((_, i) => ({
            month: MONTHS[i],
            count: 0, // placeholder — real data would need createdAt on ApplicationType
        })),
        []
    );

    // Recent applications (last 5)
    const recentApplications = useMemo(() =>
        [...applications].slice(0, 5),
        [applications]
    );

    // Recent dealer requests (last 3)
    const recentDealers = useMemo(() =>
        [...dealerRequests].slice(0, 3),
        [dealerRequests]
    );

    const stats = [
        {
            label: "Total Users",
            value: counts.users,
            sub: "Registered accounts",
            icon: Users,
            iconBg: "rgba(59,130,246,0.15)",
            iconColor: "#3b82f6",
        },
        {
            label: "Dealer Requests",
            value: counts.dealers,
            sub: `${pendingDealers} pending`,
            icon: Handshake,
            iconBg: "rgba(249,133,19,0.15)",
            iconColor: "#f98513",
            highlight: pendingDealers > 0,
        },
        {
            label: "Applications",
            value: counts.applications,
            sub: "Consultation requests",
            icon: ClipboardList,
            iconBg: "rgba(34,197,94,0.15)",
            iconColor: "#22c55e",
        },
        {
            label: "Blog Posts",
            value: counts.blogs,
            sub: "Published articles",
            icon: FileText,
            iconBg: "rgba(168,85,247,0.15)",
            iconColor: "#a855f7",
        },
    ];

    const chartData = [
        { name: "Users",        count: counts.users,        fill: "#3b82f6" },
        { name: "Dealers",      count: counts.dealers,      fill: "#f98513" },
        { name: "Applications", count: counts.applications, fill: "#22c55e" },
        { name: "Blogs",        count: counts.blogs,        fill: "#a855f7" },
    ];

    const statusColor: Record<string, string> = {
        pending:  "rgba(249,133,19,0.15)",
        accept:   "rgba(34,197,94,0.15)",
        reject:   "rgba(239,68,68,0.15)",
        idle:     "rgba(255,255,255,0.1)",
    };
    const statusText: Record<string, string> = {
        pending:  "#f98513",
        accept:   "#22c55e",
        reject:   "#ef4444",
        idle:     "rgba(255,255,255,0.5)",
    };

    return (
        <div className="space-y-5">

            {/* ── Welcome Banner ── */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(249,133,19,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(249,133,19,0.12) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }} />
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(249,133,19,0.22) 0%, transparent 65%)"
                }} />
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                    background: "linear-gradient(90deg, transparent, #f98513, rgba(255,255,255,0.5), #f98513, transparent)"
                }} />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Welcome back,</p>
                        <h2 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h2>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {pendingDealers > 0
                                ? <><span className="font-bold text-orange-400">{pendingDealers} dealer {pendingDealers === 1 ? "request" : "requests"}</span> awaiting your review.</>
                                : "Everything is up to date. Have a great day!"
                            }
                        </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Link
                            href="/dashboard/dealer-requests"
                            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-black transition-all hover:opacity-90"
                            style={{ background: "#f98513" }}
                        >
                            <Handshake size={15} />
                            Dealer Requests
                        </Link>
                        <Link
                            href="/dashboard/all-applications"
                            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                            style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                            <ClipboardList size={15} />
                            Applications
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div
                            key={s.label}
                            className="rounded-2xl p-5"
                            style={{
                                background: "#0A0A0A",
                                border: s.highlight ? "1px solid rgba(249,133,19,0.35)" : "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
                                    <p className="text-3xl font-bold text-white">{s.value}</p>
                                    <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.sub}</p>
                                </div>
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: s.iconBg, color: s.iconColor }}
                                >
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Charts Row ── */}
            <div className="grid xl:grid-cols-3 gap-5">

                {/* Bar Chart */}
                <div
                    className="xl:col-span-2 rounded-2xl p-5"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-sm font-bold text-white">Overview Stats</p>
                            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Total counts by category</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                            <TrendingUp size={14} strokeWidth={2.5} />
                            {counts.users + counts.dealers + counts.applications + counts.blogs} total
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                            <YAxis stroke="rgba(255,255,255,0.3)" allowDecimals={false} tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#141414",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    color: "#f3f4f6",
                                }}
                                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                            />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={60}>
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Dealer Requests */}
                <div
                    className="rounded-2xl p-5"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-white">Recent Dealers</p>
                        <Link href="/dashboard/dealer-requests" className="flex items-center gap-1 text-xs font-semibold hover:opacity-70 text-orange-400">
                            All <ArrowRight size={12} strokeWidth={2.5} />
                        </Link>
                    </div>

                    {recentDealers.length === 0 ? (
                        <p className="text-xs text-center py-8" style={{ color: "rgba(255,255,255,0.3)" }}>No dealer requests yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentDealers.map((dealer) => (
                                <div
                                    key={dealer._id}
                                    className="flex items-center gap-3 p-3 rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                        style={{ background: "#f98513" }}
                                    >
                                        {dealer.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{dealer.name}</p>
                                        <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{dealer.companyName}</p>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold px-2 py-1 rounded-full capitalize flex-shrink-0"
                                        style={{ background: statusColor[dealer.status], color: statusText[dealer.status] }}
                                    >
                                        {dealer.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {recentDealers.length > 0 && (
                        <Link
                            href="/dashboard/dealer-requests"
                            className="flex items-center justify-center gap-1.5 w-full mt-4 py-2 rounded-xl text-xs font-semibold transition-all"
                            style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}
                        >
                            View All Requests <ArrowUpRight size={12} />
                        </Link>
                    )}
                </div>
            </div>

            {/* ── Recent Applications ── */}
            <div
                className="rounded-2xl p-5"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-bold text-white">Recent Applications</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Latest consultation requests</p>
                    </div>
                    <Link href="/dashboard/all-applications" className="flex items-center gap-1 text-xs font-semibold hover:opacity-70 text-orange-400">
                        View all <ArrowRight size={12} strokeWidth={2.5} />
                    </Link>
                </div>

                {recentApplications.length === 0 ? (
                    <div className="flex items-center justify-center py-12 gap-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                        <Clock size={20} />
                        <p className="text-sm">No applications yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                                    {["Name", "Email", "Company", "Message"].map((h) => (
                                        <th key={h} className="text-left text-xs font-semibold pb-3 pr-4" style={{ color: "rgba(255,255,255,0.4)" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentApplications.map((app, i) => (
                                    <tr key={app._id ?? i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                                                    style={{ background: "rgba(249,133,19,0.2)", color: "#f98513" }}
                                                >
                                                    {app.firstName.charAt(0).toUpperCase()}
                                                </div>
                                                <p className="text-sm font-medium text-white">{app.firstName} {app.lastName}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{app.email}</td>
                                        <td className="py-3 pr-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{app.companyName}</td>
                                        <td className="py-3 pr-4 text-xs max-w-[200px] truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{app.message}</td>
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
