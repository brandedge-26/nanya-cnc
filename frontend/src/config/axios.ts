import axios from "axios";

const API_BASE_URL = "https://api.nanyacnc.com/api";



const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});


// axios intersceptors that runs before the request
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;

},
    (error) => {
        return Promise.reject(error);
    }
);


// response interceptor - auto logout on 401/403
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error?.response?.status;
//         const message = error?.response?.data?.message || "";

//         if (status === 401 || status === 403 || message === "Access denied - Admin only") {
//             localStorage.removeItem("accessToken");
//             window.location.href = "/admin-login";
//         }

//         return Promise.reject(error);
//     }
// );


export default api;