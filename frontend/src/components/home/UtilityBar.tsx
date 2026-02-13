"use client";


import { useModal } from "@/context/ModalContext";
import { useAuthStore } from "@/store/authStore";
import { Lock, UnlockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthPopup from "../popup/AuthPopup";

const UtilityBar = () => {


    // User from auth store
    const { user } = useAuthStore();

    // modal from modal context
    const { openModal } = useModal();


    // router 
    const router = useRouter();


    const handleDealerRequest = () => {
        if (!user) {
            router.replace("/");
            openModal(<AuthPopup />);
        } else {
            router.push("/dealer-request");
        }
    }

    return (

        <>

            {user?.role !== "admin" && <div
                className=" max-sm:hidden w-full h-8 px-7 bg-orange-500 flex items-center justify-between text-[14px] tracking-tight text-black">

                {/* Left */}
                <div className="flex items-center gap-6 font-medium">
                    <span>Email: nanyacnc@gmail.com</span>
                    <span>Phone: +92 495849589</span>
                </div>

                {/* Right */}
                <button
                    className=" flex items-center gap-2 font-semibold hover:underline transition cursor-pointer"
                    onClick={handleDealerRequest}
                >

                    {!user ? <Lock size={15} /> : <UnlockKeyhole size={15} />}

                    Dealer Portal
                </button>

            </div>}

        </>
    );
};

export default UtilityBar;
