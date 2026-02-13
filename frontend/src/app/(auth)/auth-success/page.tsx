import { Suspense } from "react";
import AuthSuccessContent from "./AuthSuccessContent";
import { Loader } from "lucide-react";

export default function AuthSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Loader className="animate-spin mx-auto mb-4 text-orange-500" size={30} />
                        <h2 className="text-xl font-normal tracking-tighter">Loading...</h2>
                    </div>
                </div>
            }
        >
            <AuthSuccessContent />
        </Suspense>
    );
}