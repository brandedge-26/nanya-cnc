import { PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";

const AcceptedStatus = () => {

    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PartyPopper className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Congratulations! 🎉</h3>
                <p className="text-gray-400 mb-8">Your dealer request has been approved. Welcome to our network!</p>

                <div className="flex gap-4 justify-center">


                    <button
                        onClick={() => router.push("/")}
                        className=" cursor-pointer px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 border border-white/20"
                    >
                        Back to Home
                    </button>

                    <button
                        onClick={() => router.push('/dealer-portal')}
                        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300 cursor-pointer"
                    >
                        Access Dealer Portal
                    </button>

                </div>
            </div>
        </div>
    );
};


export default AcceptedStatus;