"use client";

import { useModal } from "@/context/ModalContext";
import { useUserStore, User } from "@/store/userStore";
import { Loader, Trash2, Search, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";


const UsersTable = () => {

    const { isLoading, getAllUsers, users, deleteUser } = useUserStore();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [providerFilter, setProviderFilter] = useState<string>("All");
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    const filteredUsers = users.filter((user: User) => {
        const name = user.name || "";
        const email = user.email || "";
        const provider = user.provider || "";

        const matchesSearch =
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProvider = providerFilter === "All" || provider === providerFilter;

        return matchesSearch && matchesProvider;
    });

    const handleUserDelete = (user: User) => {
        openModal(
            <DeleteConfirmPopup
                title={`${user.name} User`}
                onClose={closeModal}
                onDelete={() => deleteUser(user._id as string)}
            />
        );
    };

    const avatarColors = [
        "rgba(249,133,19,0.2)", "rgba(59,130,246,0.2)", "rgba(34,197,94,0.2)",
        "rgba(168,85,247,0.2)", "rgba(239,68,68,0.2)", "rgba(20,184,166,0.2)",
    ];
    const avatarTextColors = ["#f98513", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#14b8a6"];


    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>
                        <Users size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">All Users</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading..." : `${users.length} registered accounts`}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                            style={{ color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-white outline-none transition"
                            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                style={{ color: "rgba(255,255,255,0.3)" }}>
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    {/* Provider filter */}
                    <select
                        value={providerFilter}
                        onChange={(e) => setProviderFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer transition"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <option value="All" className="bg-[#0A0A0A]">All Providers</option>
                        <option value="google" className="bg-[#0A0A0A]">Google</option>
                        <option value="local" className="bg-[#0A0A0A]">Local</option>
                    </select>
                </div>
            </div>

            {/* Table Card */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20 gap-3">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading users…</span>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Users size={36} style={{ color: "rgba(255,255,255,0.15)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm || providerFilter !== "All" ? "No users match your filters" : "No users registered yet"}
                        </p>
                        {(searchTerm || providerFilter !== "All") && (
                            <button onClick={() => { setSearchTerm(""); setProviderFilter("All"); }}
                                className="text-xs text-blue-400 hover:text-blue-300 transition cursor-pointer">
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "User", "Email", "Login Method", "Action"].map((h) => (
                                        <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user: User, index: number) => {
                                    const colorIdx = index % avatarColors.length;
                                    const initial = (user.name || user.email || "?").charAt(0).toUpperCase();
                                    return (
                                        <tr key={user._id || index}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>

                                            {/* # */}
                                            <td className="px-5 py-4 text-xs font-mono"
                                                style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(index + 1).padStart(2, "0")}
                                            </td>

                                            {/* User */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                                        style={{ background: avatarColors[colorIdx], color: avatarTextColors[colorIdx] }}>
                                                        {initial}
                                                    </div>
                                                    <p className="text-sm font-semibold text-white">{user.name || "—"}</p>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                                {user.email}
                                            </td>

                                            {/* Provider */}
                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
                                                    style={user.provider === "google"
                                                        ? { background: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" }
                                                        : { background: "rgba(249,133,19,0.12)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }
                                                    }>
                                                    {user.provider || "local"}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="px-5 py-4">
                                                <button
                                                    title="Delete User"
                                                    onClick={() => handleUserDelete(user)}
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

            {/* Footer count */}
            {!isLoading && filteredUsers.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filteredUsers.length} of {users.length} users
                </p>
            )}

        </div>
    );
};

export default UsersTable;
