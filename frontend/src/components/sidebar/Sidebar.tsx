"use client";

import {
    User,
    FileText,
    ClipboardList,
    Users,
    LogOut,
    PlusCircle,
    LayoutDashboard,
    Settings,
    KeyRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDealerStore } from "@/store/dealerStore";
import { useAuthStore } from "@/store/authStore";
import { useModal } from "@/context/ModalContext";
import { useEffect, useRef, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";


const menuItems = [
    {
        label: "Overview",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Dealer Requests",
        path: "/dashboard/dealer-requests",
        icon: Users,
    },
    {
        label: "All Users",
        path: "/dashboard/all-users",
        icon: Users,
    },
    {
        label: "All Applications",
        path: "/dashboard/all-applications",
        icon: ClipboardList,
    },
    {
        label: "Add Blog",
        path: "/dashboard/add-blog",
        icon: PlusCircle,
    },
    {
        label: "All Blogs",
        path: "/dashboard/all-blogs",
        icon: FileText,
    },
];



const Sidebar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const { pendingCount, getPendingRequestCount } = useDealerStore();
    const { logout } = useAuthStore();
    const { openModal } = useModal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        getPendingRequestCount();
    }, [getPendingRequestCount]);



    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);



    const handleLogout = async () => {
        setIsMenuOpen(false);
        await logout();
        router.push("/admin-login");
    };


    const handleChangePassword = () => {
        setIsMenuOpen(false);
        openModal(<ChangePasswordModal />);
    };


    return (


        <div className="flex flex-col justify-between h-screen bg-black border-r border-gray-800 text-white px-5 py-6 transition-all duration-300
      w-72 max-sm:w-20 max-xs:w-16">

            {/* Top Section */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 max-sm:justify-center">
                    <User size={24} className="hidden max-sm:block" />
                    <span className="text-[20px] font-semibold max-sm:hidden">
                        Dashboard
                    </span>
                </div>
            </div>

            {/* Middle Menu */}
            <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`
                flex items-center gap-3 p-2 px-3 rounded-lg transition
                max-sm:justify-center
                ${isActive
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300 hover:bg-gray-700"
                                }
              `}
                        >
                            <Icon size={20} />
                            <span className="max-sm:hidden max-xs:text-xs">
                                {item.label}
                            </span>
                            {item.label === "Dealer Requests" && pendingCount > 0 && (
                                <span className="flex items-center justify-center bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full max-sm:hidden">
                                    {pendingCount}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom - Settings */}
            <div className="relative" ref={menuRef}>
                {/* Popup Menu */}
                {isMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-full bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 px-2 py-1.5">
                        <button
                            onClick={handleChangePassword}
                            className="flex items-center gap-3 w-full p-2.5 px-3 text-gray-300 hover:bg-gray-700 hover:text-white transition cursor-pointer rounded-lg"
                        >
                            <KeyRound size={18} />
                            <span className="max-sm:hidden text-sm">Change Password</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full p-2.5 px-3 text-gray-300 hover:bg-red-600/50 hover:text-white transition cursor-pointer rounded-lg"
                        >
                            <LogOut size={18} />
                            <span className="max-sm:hidden text-sm">Logout</span>
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-3 p-2 px-3 rounded-lg hover:bg-gray-700 transition max-sm:justify-center cursor-pointer w-full text-gray-300"
                >
                    <Settings size={20} />
                    <span className="max-sm:hidden max-xs:text-xs">Settings</span>
                </button>
            </div>

        </div>
    );
};

export default Sidebar;
