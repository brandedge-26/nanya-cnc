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
    name: string;
    email: string;
    password: string;
    avatar?: string;
    provider?: string;
    role: "user" | "admin";
}


interface UserState {

    isLoading: boolean;
    users: User[];

    getAllUsers: () => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;

}



// handle error
const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error?.response?.data?.message;
    const msg = serverMessage || error.message || "Request failed";

    return msg;
}


export const useUserStore = create<UserState>((set) => ({

    isLoading: false,
    users: [],


    // get all users action
    getAllUsers: async (): Promise<void> => {

        set({ isLoading: true });

        try {

            const response = await api.get("/users/all");
            const { success, data } = response.data;

            if (success) {
                set({ users: data });
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }

    },



    // delete user action
    deleteUser: async (userId: string): Promise<void> => {
        set({ isLoading: true });

        try {

            const response = await api.delete(`/users/${userId}/delete`);
            const { success, message } = response.data;

            if (success) {
                
                toast.success(message);

                set((state) => ({
                    users: state.users.filter((user: User) => user._id !== userId)
                }));

            } else {
                toast.error(message);
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    }
    

}));