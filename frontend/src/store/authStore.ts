import api from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";



interface ApiErrorResponse {
    success?: boolean;
    message: string
}


// User state
export interface User {
    _id?: string;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    avatar?: string;
    role?: string;
}



interface AdminState {
    username: string;
    password: string;
}


// handle error
const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error?.response?.data?.message;
    const msg = serverMessage || error.message || "Request failed";

    return msg;
}



// Auth State
interface AuthState {

    user: User | null;
    isCheckingAuth: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;

    checkAuth: () => Promise<void>;
    setUser: (user: User) => void;
    loginWithGoogle: () => void;
    getGoogleClientId: () => Promise<string | null>;
    loginWithGoogleOneTap: (credential: string) => Promise<boolean>;
    register: (userData: User) => Promise<boolean>;
    login: (userData: User) => Promise<boolean>;
    adminLogin: (data: AdminState) => Promise<boolean>;
    logout: () => Promise<void>;
    changeAdminPassword: (data: { oldPassword: string; newPassword: string }) => Promise<boolean>;

}



export const useAuthStore = create<AuthState>((set) => ({


    user: null,
    isCheckingAuth: true,
    isAuthenticated: false,
    isLoading: false,


    // set user action
    setUser: (user: User) => {
        set({ user, isAuthenticated: true });
    },


    // check auth acction
    checkAuth: async (): Promise<void> => {

        set({ isCheckingAuth: true });

        try {


            const token = localStorage.getItem("accessToken");

            if (!token) {
                set({ user: null, isAuthenticated: false });
                return;
            }

            const response = await api.get("/auth/check-auth", {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            set({ user: response.data, isAuthenticated: true });

        } catch (err: unknown) {

            const msg = handleError(err);
            toast.error(msg);

        } finally {
            set({ isCheckingAuth: false });
        }
    },



    // Login with google
    loginWithGoogle: () => {
        window.location.href = "https://api.nanyacnc.com/api/auth/google"
    },



    // fetch google client id (for One Tap)
    getGoogleClientId: async (): Promise<string | null> => {
        try {

            const response = await api.get("/auth/google/client-id");
            const { success, clientId } = response.data;

            if (success && clientId) {
                return clientId;
            }

            console.log(clientId);

            return null;
        } catch {
            return null;
        }
    },


    // one tap login
    loginWithGoogleOneTap: async (credential: string): Promise<boolean> => {
        try {
            const response = await api.post("/auth/google/one-tap", { credential });
            const { success, accessToken, user } = response.data;

            if (!success || !accessToken || !user) {
                return false;
            }

            localStorage.setItem("accessToken", accessToken);
            set({ user, isAuthenticated: true });
            return true;
        } catch {
            return false;
        }
    },


    // register action
    register: async (userData: User): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.post("/auth/register", userData);
            const { success, message, user, accessToken } = response.data;

            if (success) {
                localStorage.setItem("accessToken", accessToken);
                set({ user, isAuthenticated: true });
                toast.success(message);
                return true;
            } else {
                toast.error(message);
                return false;
            }


        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },



    // login action
    login: async (userData: User): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.post("/auth/login", userData);
            const { success, message, user, accessToken } = response.data;

            if (success) {
                localStorage.setItem("accessToken", accessToken);
                set({ user, isAuthenticated: true });
                toast.success(message);
                return true;
            } else {
                toast.error(message);
                return false;
            }


        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },




    // logout action
    logout: async (): Promise<void> => {
        set({ user: null, isAuthenticated: false });

        try {

            const response = await api.post("/auth/logout");
            const { success, message } = response.data;

            if (success) {
                localStorage.removeItem("accessToken");
                toast.success(message);
            } else {
                toast.error(message);
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        }

    },




    // Admin login action
    adminLogin: async (data: AdminState): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.post("/auth/admin-login", data);
            const { success, message, user, accessToken } = response.data;

            if (success) {
                localStorage.setItem("accessToken", accessToken);
                set({ user, isAuthenticated: true });
                toast.success(message);
                return true;
            } else {
                toast.error(message);
                return false;
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },


    // Change admin password action
    changeAdminPassword: async (data: { oldPassword: string; newPassword: string }): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.put("/auth/change-admin-password", data);
            const { success, message } = response.data;

            if (success) {
                toast.success(message);
                return true;
            } else {
                toast.error(message);
                return false;
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },


}));
