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


export interface DealerSupportTicket {
    _id?: string;
    userId?: string;
    name: string;
    email: string;
    topic: string;
    subject: string;
    message: string;
    status: "open" | "in-progress" | "resolved";
    createdAt?: string;
}

export interface DealerSupportFormData {
    topic: string;
    subject: string;
    message: string;
}


interface DealerSupportState {
    isLoading: boolean;
    tickets: DealerSupportTicket[];
    submitted: boolean;
    openTicketCount: number;

    submitTicket: (data: DealerSupportFormData) => Promise<boolean>;
    getMyTickets: () => Promise<void>;
    getAllTickets: () => Promise<void>;
    updateTicketStatus: (id: string, status: string) => Promise<boolean>;
    deleteTicket: (id: string) => Promise<boolean>;
    resetSubmitted: () => void;
    getOpenTicketCount: () => Promise<void>;
}


export const useDealerSupportStore = create<DealerSupportState>((set) => ({

    isLoading: false,
    tickets: [],
    submitted: false,
    openTicketCount: 0,


    submitTicket: async (data: DealerSupportFormData): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.post("/dealer-support/submit", data);
            const { success, message } = response.data;
            if (success) {
                toast.success(message || "Support ticket submitted!");
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


    getMyTickets: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await api.get("/dealer-support/my-tickets");
            const { success, data } = response.data;
            if (success) set({ tickets: data });
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    getAllTickets: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await api.get("/dealer-support/all");
            const { success, data } = response.data;
            if (success) set({ tickets: data });
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    updateTicketStatus: async (id: string, status: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.put(`/dealer-support/${id}/update-status`, { status });
            const { success, data } = response.data;
            if (success) {
                set((state) => ({
                    tickets: state.tickets.map((t) =>
                        t._id === id ? { ...t, status: data.status } : t
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


    deleteTicket: async (id: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.delete(`/dealer-support/${id}/delete`);
            const { success } = response.data;
            if (success) {
                set((state) => ({
                    tickets: state.tickets.filter((t) => t._id !== id)
                }));
                toast.success("Ticket deleted");
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

    getOpenTicketCount: async (): Promise<void> => {
        try {
            const response = await api.get("/dealer-support/all");
            const { success, data } = response.data;
            if (success) {
                const count = (data as DealerSupportTicket[]).filter(t => t.status === "open").length;
                set({ openTicketCount: count });
            }
        } catch {
            // silent
        }
    },

}));
