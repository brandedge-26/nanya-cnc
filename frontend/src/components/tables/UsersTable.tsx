"use client";

import { useModal } from "@/context/ModalContext";
import { useUserStore, User } from "@/store/userStore";
import { Loader, Trash2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";

const UsersTable = () => {

    const { isLoading, getAllUsers, users, deleteUser } = useUserStore();


    // filter states
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [providerFilter, setProviderFilter] = useState<string>("All");


    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);


    // Filter Logic
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



    // modal state
    const { openModal, closeModal } = useModal();


    // confirm popup
    const handleUserDelete = (user: User) => {
        openModal(<DeleteConfirmPopup
            title={`${user.name} User`}
            onClose={closeModal}
            onDelete={() => deleteUser(user._id as string)}
        />)
    }



    return (
        <>

            {/* Heading */}
            <h1 className="mb-3 font-normal tracking-tighter text-[20px]">All Users</h1>


            {/* Search bar */}
            <div className="flex flex-col md:flex-row my-5 gap-3 items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full bg-black/20 border border-gray-700 outline-none pl-10 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-500 transition text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="w-full md:w-48 bg-black/20 border border-gray-700 outline-none px-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-500 text-white cursor-pointer"
                    value={providerFilter}
                    onChange={(e) => setProviderFilter(e.target.value)}
                >
                    <option value="All" className="bg-gray-900">All Providers</option>
                    <option value="google" className="bg-gray-900">Google</option>
                    <option value="local" className="bg-gray-900">Local</option>
                </select>
            </div>



            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col">

                {isLoading ? (

                    <div className="flex-1 flex items-center justify-center p-10">
                        <Loader className="animate-spin text-orange-500" size={32} />
                    </div>

                ) : filteredUsers.length === 0 ? (

                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-white/50">
                        <p className="text-lg">No users found</p>
                    </div>

                ) : (

                    <table className="w-full text-left border-collapse">

                        {/* Table Header */}
                        <thead className="bg-white/5 text-white/70 uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#ID</th>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Login With</th>
                                <th className="px-6 py-4 font-semibold text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table body */}
                        <tbody className="divide-y divide-white/5 text-white/90">
                            {filteredUsers.map((user: User, index: number) => (

                                <tr key={user._id || index} className="hover:bg-white/5 transition-colors">

                                    <td className="px-6 py-2 text-white/50 font-mono text-sm">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>

                                    <td className="px-6 py-2 font-medium">{user.name}</td>
                                    <td className="px-6 py-2 text-white/70">{user.email}</td>
                                    <td className="px-6 py-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${user.provider === 'google'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                            }`}>
                                            {user.provider}
                                        </span>
                                    </td>

                                    <td className="px-6 py-2">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="p-2 hover:bg-red-500/20 rounded-full text-red-400 transition-all cursor-pointer"
                                                title="Delete User"
                                                onClick={() => handleUserDelete(user)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default UsersTable;
