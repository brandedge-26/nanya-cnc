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


export interface DealerOrder {
    _id?: string;
    userId?: string;
    name: string;
    email: string;
    companyName: string;
    companyEmail: string;
    productName: string;
    productId?: string;
    message: string;
    deliveryStatus: "pending" | "shipped" | "delivered";
    createdAt?: string;
}

export interface DealerOrderFormData {
    name: string;
    email: string;
    companyName: string;
    companyEmail: string;
    productName: string;
    productId?: string;
    message: string;
}


interface DealerOrderState {
    isLoading: boolean;
    orders: DealerOrder[];
    orderPlaced: boolean;
    pendingOrderCount: number;

    submitOrder: (data: DealerOrderFormData) => Promise<boolean>;
    getMyOrders: () => Promise<void>;
    getAllOrders: () => Promise<void>;
    updateOrderStatus: (id: string, deliveryStatus: string) => Promise<boolean>;
    deleteOrder: (id: string) => Promise<boolean>;
    resetOrderPlaced: () => void;
    getPendingOrderCount: () => Promise<void>;
}


export const useDealerOrderStore = create<DealerOrderState>((set) => ({

    isLoading: false,
    orders: [],
    orderPlaced: false,
    pendingOrderCount: 0,


    // Submit dealer order
    submitOrder: async (data: DealerOrderFormData): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.post("/dealer-orders/submit", data);
            const { success } = response.data;

            if (success) {
                set({ orderPlaced: true });
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


    // Get orders for logged-in dealer
    getMyOrders: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await api.get("/dealer-orders/my-orders");
            const { success, data } = response.data;
            if (success) {
                set({ orders: data });
            }
        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    // Get all orders (admin)
    getAllOrders: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await api.get("/dealer-orders/all");
            const { success, data } = response.data;

            if (success) {
                set({ orders: data });
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    // Update order delivery status (admin)
    updateOrderStatus: async (id: string, deliveryStatus: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.put(`/dealer-orders/${id}/update-status`, { deliveryStatus });
            const { success, data } = response.data;

            if (success) {
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order._id === id ? { ...order, deliveryStatus: data.deliveryStatus } : order
                    )
                }));
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


    // Delete order (admin)
    deleteOrder: async (id: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
            const response = await api.delete(`/dealer-orders/${id}/delete`);
            const { success } = response.data;

            if (success) {
                set((state) => ({
                    orders: state.orders.filter((order) => order._id !== id)
                }));
                toast.success("Order deleted successfully");
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


    resetOrderPlaced: () => set({ orderPlaced: false }),

    getPendingOrderCount: async (): Promise<void> => {
        try {
            const response = await api.get("/dealer-orders/all");
            const { success, data } = response.data;
            if (success) {
                const count = (data as DealerOrder[]).filter(o => o.deliveryStatus === "pending").length;
                set({ pendingOrderCount: count });
            }
        } catch {
            // silent
        }
    },

}));
