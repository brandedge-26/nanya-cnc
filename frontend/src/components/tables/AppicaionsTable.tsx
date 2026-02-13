"use client";

import { ApplicationType, useApplicationStore } from "@/store/applicationStore";
import { Loader, Trash2, Search, Eye } from "lucide-react"; // Eye icon add kiya
import { useEffect, useState } from "react";
import ApplicationDetailPopup from "../popup/ApplicationDetailPopup";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";

const ApplicationsTable = () => {

    const { isLoading, getAllApplications, applications, deleteApplication } = useApplicationStore();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        getAllApplications();
    }, [getAllApplications]);


    // filter logic
    const filteredApplications = applications.filter((application: ApplicationType) =>
        application.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // modal state
    const { openModal, closeModal } = useModal();


    // confirm popup
    const handleApplicationDelete = (app: ApplicationType) => {
        openModal(<DeleteConfirmPopup
            title={`${app.firstName}'s Application`}
            onClose={closeModal}
            onDelete={() => deleteApplication(app._id as string)}
        />)
    }


    return (
        <>
            <h1 className="mb-3 font-normal tracking-tighter text-[20px]">All Applications</h1>


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
            </div>


            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center p-10">
                        <Loader className="animate-spin text-orange-500" size={32} />
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-white/50">
                        <p className="text-lg">No applications found</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-white/70 uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#ID</th>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Company</th>
                                <th className="px-6 py-4 font-semibold">Message</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-white/90">
                            {filteredApplications.map((app: ApplicationType, index: number) => (
                                <tr key={app._id || index} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white/50 font-mono text-sm">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{app.firstName} {app.lastName}</span>
                                            <span className="text-[11px] text-white/40">{app.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/70">{app.companyName}</td>
                                    <td className="px-6 py-4 text-white/50 text-sm max-w-50">
                                        <p className="truncate" title={app.message}>
                                            {app.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">

                                            {/* Eye Button */}
                                            <button
                                                className="p-2 hover:bg-blue-500/20 rounded-full text-blue-400 transition-all cursor-pointer"
                                                title="View Details"
                                                onClick={() => openModal(
                                                    <ApplicationDetailPopup
                                                        application={app}
                                                        onClose={closeModal}
                                                    />
                                                )}
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                className="p-2 hover:bg-red-500/20 rounded-full text-red-400 transition-all cursor-pointer"
                                                title="Delete Application"
                                                onClick={() => handleApplicationDelete(app)}
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

export default ApplicationsTable;