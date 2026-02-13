import { Trash2, AlertTriangle } from "lucide-react";

interface Props {
    title: string;
    onDelete: () => void;
    onClose: () => void;
}

const DeleteConfirmPopup = ({ title, onDelete, onClose }: Props) => {
    return (

        <div className="p-6 text-white text-center">

            {/* Warning Icon */}
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
            <p className="text-white/60 text-sm mb-6 px-4">
                You are about to delete <span className="text-white font-semibold">{title}</span>. This action cannot be undone.
            </p>

            <div className="flex gap-3">
                {/* Cancel Button */}
                <button
                    onClick={onClose}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all border border-white/10 cursor-pointer"
                >
                    Cancel
                </button>

                {/* Confirm Delete Button */}
                <button
                    onClick={() => {
                        onDelete();
                        onClose();
                    }}
                    className="cursor-pointer flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                >
                    <Trash2 size={18} />
                    Delete Now
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmPopup;
