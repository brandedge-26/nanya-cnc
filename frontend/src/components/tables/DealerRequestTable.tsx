"use client";

import { Loader, Trash2, Search, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { Dealer, useDealerStore } from "@/store/dealerStore";
import DealerDetailPopup from "../popup/DealerDetailPopup";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";



const DealerRequestTable = () => {


    const { isLoading, getAllDealerRequests, dealerRequests, updateDealerStatus, deleteDealerRequest } = useDealerStore();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");


    useEffect(() => {
        getAllDealerRequests();
    }, [getAllDealerRequests]);


    // Filter logic
    const filteredRequests = dealerRequests.filter((request: Dealer) => {

        const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.companyName.toLowerCase().includes(searchTerm.toLowerCase());


        const matchesStatus = statusFilter === "All" || request.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    // Modal state
    const { openModal, closeModal } = useModal();


    // Confirm popup
    const handleDealerDelete = (dealer: Dealer) => {
        openModal(
            <DeleteConfirmPopup
                title={`${dealer.name}'s Dealer Request`}
                onClose={closeModal}
                onDelete={() => deleteDealerRequest(dealer._id as string)}
            />
        );
    };

    // Status change handler
    const handleStatusChange = (dealerId: string, newStatus: string) => {
        updateDealerStatus(dealerId, newStatus);
    };

    return (
        <>
            <h1 className="mb-3 font-normal tracking-tighter text-[20px]">All Dealer Requests</h1>

            {/* Search bar */}
            <div className="flex flex-col md:flex-row my-5 gap-3 items-center">
                <div className="relative w-full">

                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or company..."
                        className="w-full bg-black/20 border border-gray-700 outline-none pl-10 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-500 transition text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                <select
                    className="w-full md:w-48 bg-black/20 border border-gray-700 outline-none px-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-500 text-white cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All" className="bg-gray-900">All</option>
                    <option value="pending" className="bg-gray-900">Pending</option>
                    <option value="accept" className="bg-gray-900">Accepted</option>
                    <option value="reject" className="bg-gray-900">Rejected</option>
                </select>

            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center p-10">
                        <Loader className="animate-spin text-orange-500" size={32} />
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-white/50">
                        <p className="text-lg">No dealer requests found</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-white/70 uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#ID</th>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Company</th>
                                <th className="px-6 py-4 font-semibold">Message</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-white/90">
                            {filteredRequests.map((dealer: Dealer, index: number) => (
                                <tr key={dealer._id || index} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white/50 font-mono text-sm">
                                        {String(index + 1).padStart(2, "0")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{dealer.name}</span>
                                            <span className="text-[11px] text-white/40">{dealer.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/70">{dealer.companyName}</td>
                                    <td className="px-6 py-4 text-white/50 text-sm max-w-50">
                                        <p className="truncate" title={dealer.message}>
                                            {dealer.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={dealer.status === "idle" ? "pending" : dealer.status}
                                            onChange={(e) => handleStatusChange(dealer._id as string, e.target.value)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border outline-none cursor-pointer transition-all
                                                    ${dealer.status === "pending" || dealer.status === "idle"
                                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                    : dealer.status === "accept"
                                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                        : "bg-red-500/20 text-red-400 border-red-500/30"
                                                }`}
                                        >
                                            <option value="pending" className="bg-gray-800">Pending</option>
                                            <option value="accept" className="bg-gray-800">Accepted</option>
                                            <option value="reject" className="bg-gray-800">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* Eye Button */}
                                            <button
                                                className="p-2 hover:bg-blue-500/20 rounded-full text-blue-400 transition-all cursor-pointer"
                                                title="View Details"
                                                onClick={() =>
                                                    openModal(
                                                        <DealerDetailPopup
                                                            dealer={dealer}
                                                            onClose={closeModal}
                                                        />
                                                    )
                                                }
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                className="p-2 hover:bg-red-500/20 rounded-full text-red-400 transition-all cursor-pointer"
                                                title="Delete Request"
                                                onClick={() => handleDealerDelete(dealer)}
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

export default DealerRequestTable;