import { Dealer } from "@/store/dealerStore";
import { X } from "lucide-react";



type DealerDetailPopupProps = {
    dealer: Dealer;
    onClose: () => void;
};


const DealerDetailPopup = ({ dealer, onClose }: DealerDetailPopupProps) => {
    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           
            <div className="bg-linear-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">Dealer Request Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="text-white/70" size={24} />
                    </button>
                </div>


                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-white/50 text-sm">Name</label>
                            <p className="text-white font-medium">{dealer.name}</p>
                        </div>
                        <div>
                            <label className="text-white/50 text-sm">Email</label>
                            <p className="text-white font-medium">{dealer.email}</p>
                        </div>
                        <div>
                            <label className="text-white/50 text-sm">Company Name</label>
                            <p className="text-white font-medium">{dealer.companyName}</p>
                        </div>
                        <div>
                            <label className="text-white/50 text-sm">Company Email</label>
                            <p className="text-white font-medium">{dealer.companyEmail}</p>
                        </div>
                        <div>
                            <label className="text-white/50 text-sm">Status</label>
                            <p className={`font-medium capitalize ${dealer.status === "pending" || dealer.status === "idle"
                                ? "text-yellow-400"
                                : dealer.status === "accept"
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}>
                                {dealer.status === "idle" ? "pending" : dealer.status}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="text-white/50 text-sm">Message</label>
                        <p className="text-white bg-white/5 p-4 rounded-lg mt-2">
                            {dealer.message}
                        </p>
                    </div>
                </div>


                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>

                
            </div>
        </div>
    );
};

export default DealerDetailPopup;