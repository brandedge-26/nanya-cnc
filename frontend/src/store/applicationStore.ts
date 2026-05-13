import api from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";





interface ApiErrorResponse {
    success?: boolean;
    message: string
}



// application type
export type ApplicationType = {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyEmail: string;
    companyAddress: string;
    message: string;
}



// handle error
const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error?.response?.data?.message;
    const msg = serverMessage || error.message || "Request failed";

    return msg;
}


// application store state
interface ApplicationState {

    isLoading: boolean;
    applications: ApplicationType[] | [];

    getAllApplications: () => Promise<void>;
    submitApplication: (applicationData: ApplicationType) => Promise<boolean>;
    deleteApplication: (id: string) => Promise<void>;

}



// application store
export const useApplicationStore = create<ApplicationState>((set) => ({

    isLoading: false,
    applications: [],


    // get all application action
    getAllApplications: async (): Promise<void> => {
        try {

            const response = await api.get("/applications/get-all");
            const { success, data } = response.data;

            if (success) {
                set({ applications: data });
            }

        } catch (err) {
            handleError(err);
        } finally {
            set({ isLoading: false });
        }
    },


    // submit application action
    submitApplication: async (applicationData: ApplicationType): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.post("/applications/submit", applicationData);
            const { success, message } = response.data;

            if (success) {
                toast.success(message);
                return true;
            } else {
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


    // delete application action
    deleteApplication: async (id: string): Promise<void> => {
        try {

            const response = await api.delete(`/applications/${id}/delete`);
            const { success, message } = response.data;

            if (success) {

                set((state) => ({
                    applications: state.applications.filter((app) => app._id !== id)
                }));

                toast.success(message);

            } else {
                toast.error(message)
            }

        } catch (err) {
            handleError(err);
        } finally {
            set({ isLoading: false });
        }
    }


}));