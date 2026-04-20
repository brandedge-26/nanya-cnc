import api from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


interface ApiErrorResponse {
    success?: boolean;
    message: string;
}

const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error?.response?.data?.message;
    return serverMessage || error.message || "Request failed";
};


export interface DealerQuotation {
    _id?: string;
    userId?: string;
    name: string;
    email: string;
    productName: string;
    productId?: string;
    message?: string;
    status: "pending" | "reviewed" | "sent";
    createdAt?: string;
}

export interface QuotationFormData {
    productName: string;
    productId?: string;
    message?: string;
}


interface DealerQuotationState {
    isLoading: boolean;
    quotations: DealerQuotation[];
    submitted: boolean;

    submitQuotation: (data: QuotationFormData) => Promise<boolean>;
    getMyQuotations: () => Promise<void>;
    getAllQuotations: () => Promise<void>;
    updateQuotationStatus: (id: string, status: string) => Promise<boolean>;
    deleteQuotation: (id: string) => Promise<boolean>;
    resetSubmitted: () => void;
}


export const useDealerQuotationStore = create<DealerQuotationState>((set) => ({

    isLoading: false,
    quotations: [],
    submitted: false,


    submitQuotation: async (data: QuotationFormData): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.post("/dealer-quotations/submit", data);
            const { success, message } = response.data;
            if (success) {
                toast.success(message || "Quotation submitted!");
                set({ submitted: true });
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


    getMyQuotations: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await api.get("/dealer-quotations/my-quotations");
            const { success, data } = response.data;
            if (success) set({ quotations: data });
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    getAllQuotations: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await api.get("/dealer-quotations/all");
            const { success, data } = response.data;
            if (success) set({ quotations: data });
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    updateQuotationStatus: async (id: string, status: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.put(`/dealer-quotations/${id}/update-status`, { status });
            const { success, data } = response.data;
            if (success) {
                set((state) => ({
                    quotations: state.quotations.map((q) =>
                        q._id === id ? { ...q, status: data.status } : q
                    )
                }));
                toast.success("Status updated");
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


    deleteQuotation: async (id: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.delete(`/dealer-quotations/${id}/delete`);
            const { success } = response.data;
            if (success) {
                set((state) => ({
                    quotations: state.quotations.filter((q) => q._id !== id)
                }));
                toast.success("Quotation deleted");
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


    resetSubmitted: () => set({ submitted: false }),

}));
