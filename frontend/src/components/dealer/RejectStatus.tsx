import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RejectedStatus = () => {

    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Request Not Approved</h3>
                <p className="text-gray-400 mb-8">Unfortunately, we cannot process your dealer request at this time.</p>

                <div className="flex gap-4 justify-center">


                    <button
                        onClick={() => router.push('/')}
                        className="cursor-pointer px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 border border-white/20"
                    >
                        Back to Home
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="cursor-pointer px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300"
                    >
                        Resubmit Request
                    </button>

                </div>
            </div>
        </div>
    );
};


export default RejectedStatus;