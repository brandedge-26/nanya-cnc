import { ApplicationType } from "@/store/applicationStore";
import { X, Building2, Mail, MapPin, MessageSquare, User } from "lucide-react";

interface Props {
    application: ApplicationType;
    onClose: () => void;
}

const ApplicationDetailPopup = ({ application, onClose }: Props) => {
    return (

        <div className="p-6 text-white relative">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
                <X size={20} className="text-white/50" />
            </button>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="text-orange-500" size={24} />
                Application Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Applicant Name</label>
                        <p className="text-lg font-medium">{application.firstName} {application.lastName}</p>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Personal Email</label>
                        <div className="flex items-center gap-2 text-white/80">
                            <Mail size={14} className="text-orange-500/70" />
                            <span>{application.email}</span>
                        </div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Company Name</label>
                        <div className="flex items-center gap-2 text-lg font-medium">
                            <Building2 size={18} className="text-orange-500" />
                            <span>{application.companyName}</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Company Email</label>
                        <p className="text-white/80">{application.companyEmail}</p>
                    </div>
                </div>
            </div>

            {/* Address */}
            <div className="mt-6">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Location / Address</label>
                <div className="flex items-start gap-2 mt-1 text-white/80">
                    <MapPin size={16} className="text-orange-500 mt-1 shrink-0" />
                    <span>{application.companyAddress}</span>
                </div>
            </div>

            {/* Message Box */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">
                    <MessageSquare size={14} /> Message
                </label>
                <p className="text-sm leading-relaxed text-white/90  wrap-break-word">
                    {application.message}
                </p>
            </div>

            {/* Footer Button */}
            <button
                onClick={onClose}
                className="w-full mt-4 cursor-pointer px-4 h-9.5 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
            >
                Close Preview
            </button>
        </div>
    );
};

export default ApplicationDetailPopup;
