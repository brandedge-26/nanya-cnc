"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useModal } from "@/context/ModalContext";

const ChangePasswordModal = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { changeAdminPassword, isLoading } = useAuthStore();
    const { closeModal } = useModal();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!oldPassword.trim() || !newPassword.trim()) return;

        const success = await changeAdminPassword({
            oldPassword: oldPassword.trim(),
            newPassword: newPassword.trim(),
        });

        if (success) closeModal();
    };

    return (
        <div className="p-6 w-100 max-w-full">
            <h2 className="text-xl font-semibold text-white mb-5">
                Change Password
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-400">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter old password"
                        className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-white/30 transition"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-400">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-white/30 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !oldPassword.trim() || !newPassword.trim()}
                    className="mt-2 bg-orange-500 text-black font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordModal;
