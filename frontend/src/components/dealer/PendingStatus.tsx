import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PendingStatus = () => {

    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Request Submitted!</h3>
                <p className="text-gray-400 mb-8">Our team will review and get back to you within 12 hours.</p>
                
                <button 
                    onClick={() => router.push("/")}
                    className="cursor-pointer px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 border border-white/20"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PendingStatus;