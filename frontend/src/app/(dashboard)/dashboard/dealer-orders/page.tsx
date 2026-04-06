"use client";

import { useEffect, useState } from "react";
import { Loader, Trash2, Search, Package } from "lucide-react";
import { useDealerOrderStore, DealerOrder } from "@/store/dealerOrderStore";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "@/components/popup/DeleteConfirmPopup";


const DealerOrdersPage = () => {

    const { isLoading, orders, getAllOrders, updateOrderStatus, deleteOrder } = useDealerOrderStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const { openModal, closeModal } = useModal();


    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);


    const filteredOrders = orders.filter((order: DealerOrder) => {
        const matchesSearch =
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.productName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || order.deliveryStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });


    const handleDelete = (order: DealerOrder) => {
        openModal(
            <DeleteConfirmPopup
                title={`Order by ${order.name}`}
                onClose={closeModal}
                onDelete={() => deleteOrder(order._id as string)}
            />
        );
    };


    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateOrderStatus(orderId, newStatus);
    };


    const getStatusStyles = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "shipped":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "delivered":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };


    return (
        <>
            <h1 className="mb-3 font-normal tracking-tighter text-[20px]">Dealer Orders</h1>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row my-5 gap-3 items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, company or product..."
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
                    <option value="shipped" className="bg-gray-900">Shipped</option>
                    <option value="delivered" className="bg-gray-900">Delivered</option>
                </select>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center p-10">
                        <Loader className="animate-spin text-orange-500" size={32} />
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-white/50">
                        <Package size={40} className="mb-3 opacity-30" />
                        <p className="text-lg">No dealer orders found</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-white/70 uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Company</th>
                                <th className="px-6 py-4 font-semibold">Product</th>
                                <th className="px-6 py-4 font-semibold">Message</th>
                                <th className="px-6 py-4 font-semibold">Delivery Status</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-white/90">
                            {filteredOrders.map((order: DealerOrder, index: number) => (
                                <tr key={order._id || index} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white/50 font-mono text-sm">
                                        {String(index + 1).padStart(2, "0")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.name}</span>
                                            <span className="text-[11px] text-white/40">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/70">{order.companyName}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-medium">
                                            {order.productName}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/50 text-sm max-w-[160px]">
                                        <p className="truncate" title={order.message}>
                                            {order.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.deliveryStatus}
                                            onChange={(e) => handleStatusChange(order._id as string, e.target.value)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border outline-none cursor-pointer transition-all ${getStatusStyles(order.deliveryStatus)}`}
                                        >
                                            <option value="pending" className="bg-gray-800">Pending</option>
                                            <option value="shipped" className="bg-gray-800">Shipped</option>
                                            <option value="delivered" className="bg-gray-800">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-white/40 text-xs">
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="p-2 hover:bg-red-500/20 rounded-full text-red-400 transition-all cursor-pointer"
                                                title="Delete Order"
                                                onClick={() => handleDelete(order)}
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

export default DealerOrdersPage;
