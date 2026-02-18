"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";



const ONE_TAP_SCRIPT_ID = "google-one-tap-script";
const ONE_TAP_DISMISSED_KEY = "google_one_tap_dismissed";


type CredentialResponse = {
    credential?: string;
};


type PromptMomentNotification = {
    isDismissedMoment?: () => boolean;
    isSkippedMoment?: () => boolean;
};


type GoogleAccounts = {
    id: {
        initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            itp_support?: boolean;
        }) => void;
        prompt: (callback?: (notification: PromptMomentNotification) => void) => void;
        cancel: () => void;
    };
};



declare global {
    interface Window {
        google?: {
            accounts: GoogleAccounts;
        };
    }
}


const GoogleOneTap = () => {

    const initializedRef = useRef(false);

    const {
        isAuthenticated,
        isCheckingAuth,
        getGoogleClientId,
        loginWithGoogleOneTap
    } = useAuthStore();

    useEffect(() => {
        let isMounted = true;

        if (isCheckingAuth) {
            return;
        }

        if (isAuthenticated) {
            window.google?.accounts.id.cancel();
            return;
        }

        if (sessionStorage.getItem(ONE_TAP_DISMISSED_KEY) === "1") {
            return;
        }

        const promptOneTap = async () => {
            if (initializedRef.current) {
                return;
            }

            const clientId = await getGoogleClientId();
            if (!clientId || !isMounted) {
                return;
            }

            const handleCredential = async (response: CredentialResponse) => {
                if (!response.credential) {
                    return;
                }

                const success = await loginWithGoogleOneTap(response.credential);
                if (success) {
                    toast.success("Google login successful");
                    window.google?.accounts.id.cancel();
                }
            };

            const init = () => {
                if (!window.google?.accounts?.id) {
                    return;
                }

                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleCredential,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    itp_support: true
                });

                window.google.accounts.id.prompt((notification: PromptMomentNotification) => {
                    const dismissed = notification.isDismissedMoment?.() ?? false;
                    const skipped = notification.isSkippedMoment?.() ?? false;

                    if (dismissed || skipped) {
                        sessionStorage.setItem(ONE_TAP_DISMISSED_KEY, "1");
                    }
                });

                initializedRef.current = true;
            };

            const existingScript = document.getElementById(ONE_TAP_SCRIPT_ID) as HTMLScriptElement | null;
            if (existingScript) {
                if (window.google?.accounts?.id) {
                    init();
                } else {
                    existingScript.addEventListener("load", init, { once: true });
                }
                return;
            }

            const script = document.createElement("script");
            script.id = ONE_TAP_SCRIPT_ID;
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.addEventListener("load", init, { once: true });
            document.head.appendChild(script);
        };

        void promptOneTap();

        return () => {
            isMounted = false;
        };
    }, [getGoogleClientId, isAuthenticated, isCheckingAuth, loginWithGoogleOneTap]);

    return null;
};

export default GoogleOneTap;
