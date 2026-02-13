"use client";


import { useEffect } from "react";
import { Users, FileText, ClipboardList, Handshake } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useUserStore } from "@/store/userStore";
import { useDealerStore } from "@/store/dealerStore";
import { useApplicationStore } from "@/store/applicationStore";
import { useBlogStore } from "@/store/blogStore";


const stats = [
    {
        label: "All Users",
        key: "users",
        icon: Users,
        color: "bg-blue-600/30",
        textColor: "text-blue-600",
    },
    {
        label: "Dealer Requests",
        key: "dealers",
        icon: Handshake,
        color: "bg-orange-600/30",
        textColor: "text-orange-600",
    },
    {
        label: "Applications",
        key: "applications",
        icon: ClipboardList,
        color: "bg-green-600/30",
        textColor: "text-green-600",
    },
    {
        label: "Blogs",
        key: "blogs",
        icon: FileText,
        color: "bg-purple-600/30",
        textColor: "text-purple-600",
    },
];



const DashboardPage = () => {

    const { users, getAllUsers } = useUserStore();
    const { dealerRequests, getAllDealerRequests } = useDealerStore();
    const { applications, getAllApplications } = useApplicationStore();
    const { blogs, getAllBlogs } = useBlogStore();

    useEffect(() => {
        getAllUsers();
        getAllDealerRequests();
        getAllApplications();
        getAllBlogs();
    }, [getAllUsers, getAllDealerRequests, getAllApplications, getAllBlogs]);


    const counts: Record<string, number> = {
        users: users.length,
        dealers: dealerRequests.length,
        applications: applications.length,
        blogs: blogs.length,
    };

    return (
        <div className="mt-5">

            <h1 className="text-3xl font-bold">Welcome Admin</h1>
            <p className="text-gray-500 mt-1">Here&#39;s an overview of your dashboard</p>


            {/* Overiew and count of states */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (

                        <div
                            key={item.key}
                            className="flex items-center gap-4  border border-gray-700 rounded-xl p-5 shadow-sm"
                        >
                            <div className={`${item.color} p-5 rounded-lg`}>
                                <Icon size={24} className={`${item.textColor}`} />
                            </div>

                            <div>
                                <p className="text-[20px] text-gray-200">{item.label}</p>
                                <p className="text-2xl font-bold">{counts[item.key]}</p>
                            </div>

                        </div>
                    );
                })}
            </div>


            {/* Bar Chart */}
            <div className="mt-10 border border-gray-700 rounded-xl p-6">

                <h2 className="text-xl font-semibold mb-6">Overview Stats</h2>

                <ResponsiveContainer width="100%" height={350}>

                    <BarChart
                        data={[
                            { name: "Users", count: counts.users, fill: "#2563eb" },
                            { name: "Dealers", count: counts.dealers, fill: "#ea580c" },
                            { name: "Applications", count: counts.applications, fill: "#16a34a" },
                            { name: "Blogs", count: counts.blogs, fill: "#9333ea" },
                        ]}
                    >

                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" allowDecimals={false} />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(75, 85, 99, 0.5)",
                                border: "1px solid #4b5563",
                                borderRadius: "8px",
                                color: "#f3f4f6",
                            }}
                            cursor={{ fill: "rgba(75, 85, 99, 0.2)" }}
                        />

                        <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={60}>
                            {[
                                { fill: "#2563eb" },
                                { fill: "#ea580c" },
                                { fill: "#16a34a" },
                                { fill: "#9333ea" },
                            ].map((entry, index) => (
                                <Cell key={index} fill={entry.fill} />
                            ))}
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
};

export default DashboardPage;