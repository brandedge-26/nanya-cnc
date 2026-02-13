"use client";

import { useState } from "react";

const Login = () => {


    // const navigate = useNavigate();
    // const { user, setUser } = useAuthContext();

    // Form Data State
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    // handle change input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }



    // handle form submit
    // const handleSubmit = async (e) => {
    //      e.preventDefault();


    //      try {


    //           const data = await loginUser(formData);
    //           const { success, message } = data;

    //           if (success) {

    //                setUser(data.user);

    //                toast.success(message);

    //                setFormData({
    //                     email: "",
    //                     password: ""
    //                });

    //                if (data.user.role === "Admin") {
    //                     navigate("/dashboard");
    //                } else if (data.user.role === "Exhibitor") {
    //                     navigate("/dashboard/register-company");
    //                } else if (data.user.role === "Attendee") {
    //                     navigate("/dashboard/all-expo");
    //                }

    //           } else {
    //                toast.error(message);
    //           }


    //      } catch (err) {

    //           const serverMessage = err?.response?.data?.message;
    //           const msg = serverMessage || err.message || "Request failed";

    //           toast.error(msg);

    //      }

    // }


    return (<>

        <div className="">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-130 w-full">

                    <div className="p-6 sm:p-8 rounded-2x shadow-sm">
                        <h1 className="text-center text-3xl font-semibold tracking-tight">Admin Login</h1>
                        <form className="mt-12 space-y-6">

                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border-2 text-[18px] border-gray-800 outline-none px-4 py-3 rounded-lg  transition"
                            />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full border-2 text-[18px] border-gray-800 outline-none px-4 py-3 rounded-lg  transition"
                            />

                            <button className="primary-btn w-full">Login</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default Login;