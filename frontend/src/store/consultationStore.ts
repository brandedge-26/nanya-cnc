import api from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


interface ApiErrorResponse {
    success?: boolean;
    message: string;
}

export type ConsultationType = {
    _id?: string;
    name: string;
    email: string;
    machine: string;
    message: string;
    createdAt?: string;
};

const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const msg = error?.response?.data?.message || error.message || "Request failed";
    return msg;
};

interface ConsultationState {
    isLoading: boolean;
    consultations: ConsultationType[];

    getAllConsultations: () => Promise<void>;
    submitConsultation: (data: Omit<ConsultationType, "_id" | "createdAt">) => Promise<boolean>;
    deleteConsultation: (id: string) => Promise<void>;
}

export const useConsultationStore = create<ConsultationState>((set) => ({
    isLoading: false,
    consultations: [],

    getAllConsultations: async () => {
        try {
            set({ isLoading: true });
            const response = await api.get("/consultations/get-all");
            const { success, data } = response.data;
            if (success) {
                set({ consultations: data });
            }
        } catch (err) {
            handleError(err);
        } finally {
            set({ isLoading: false });
        }
    },

    submitConsultation: async (data) => {
        set({ isLoading: true });
        try {
            const response = await api.post("/consultations/submit", data);
            const { success, message } = response.data;
            if (success) {
                toast.success(message);
                return true;
            }
            return false;
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteConsultation: async (id) => {
        try {
            const response = await api.delete(`/consultations/${id}/delete`);
            const { success, message } = response.data;
            if (success) {
                set((state) => ({
                    consultations: state.consultations.filter((c) => c._id !== id),
                }));
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        }
    },
}));
