import api from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


interface ApiErrorResponse {
    success?: boolean;
    message: string
}


// handle error
const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error?.response?.data?.message;
    const msg = serverMessage || error.message || "Request failed";

    return msg;
}



export interface Dealer {
    _id?: string;
    name: string;
    email: string;
    companyName: string;
    companyEmail: string;
    message: string;
    status: "idle" | "pending" | "accept" | "reject"
}



interface DealerState {

    isLoading: boolean;
    dealerStatus: "idle" | "pending" | "accept" | "reject";
    dealerRequests: Dealer[],
    pendingCount: number;

    getDealerStatus: () => Promise<void>;
    getAllDealerRequests: () => Promise<void>;
    updateDealerStatus: (id: string, status: string) => Promise<boolean>;
    deleteDealerRequest: (id: string) => Promise<boolean>;
    getPendingRequestCount: () => Promise<void>;
    submitRequest: (data: Dealer) => Promise<boolean>;

}




export const useDealerStore = create<DealerState>((set) => ({

    isLoading: false,
    dealerStatus: "idle",
    dealerRequests: [],
    pendingCount: 0,


    // dealer status  action
    getDealerStatus: async (): Promise<void> => {
        set({ isLoading: true });
        try {

            const response = await api.get("/dealers/get-status");
            const { success, data } = response.data;

            if (success) {
                set({ dealerStatus: data.status });
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },



    // GET ALL DEALER REQUESTS
    getAllDealerRequests: async (): Promise<void> => {

        set({ isLoading: true });

        try {

            const response = await api.get("/dealers/all-requests");
            const { success, data } = response.data;

            if (success) {
                set({ dealerRequests: data });
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    // UPDATE DEALER STATUS
    updateDealerStatus: async (id: string, status: string): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.put(`/dealers/${id}/update-status`, { status });
            const { success, data } = response.data;

            if (success) {
                set((state) => {

                    const oldRequest = state.dealerRequests.find((req) => req._id === id);
                    const wasPending = oldRequest?.status === "pending";
                    const nowPending = data.status === "pending";

                    let countChange = 0;
                    if (wasPending && !nowPending) countChange = -1;
                    if (!wasPending && nowPending) countChange = 1;

                    return {
                        dealerRequests: state.dealerRequests.map((req) =>
                            req._id === id ? { ...req, status: data.status } : req
                        ),
                        pendingCount: Math.max(0, state.pendingCount + countChange)
                    };
                });
                toast.success("Status updated successfully");
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


    // DELETE DEALER REQUEST
    deleteDealerRequest: async (id: string): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.delete(`/dealers/${id}/delete`);
            const { success } = response.data;

            if (success) {
                set((state) => ({
                    dealerRequests: state.dealerRequests.filter((req) => req._id !== id)
                }));
                toast.success("Dealer request deleted successfully");
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


    // GET PENDING REQUEST COUNT
    getPendingRequestCount: async (): Promise<void> => {

        try {

            const response = await api.get("/dealers/pending-count");
            const { success, data } = response.data;

            if (success) {
                set({ pendingCount: data.count });
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        }
    },


    // submit request action
    submitRequest: async (data: Dealer): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.post("/dealers/request", data);
            const { success } = response.data;


            if (!success) {
                toast.error("Something went wrong!");
                return false;
            }

            set((state) => ({
                dealerStatus: state.dealerStatus = "pending",
                pendingCount: state.pendingCount + 1
            }));

            return success;

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },


}));