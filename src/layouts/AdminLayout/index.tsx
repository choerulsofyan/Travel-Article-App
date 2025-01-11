// src/layouts/AdminLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
// import Header from "@/components/organisms/Header";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";

const AdminLayout: React.FC = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-grow flex flex-col">
                    {/* <Header title="Travel Article App" /> */}
                    <div className="flex-grow p-4 pt-1">
                        <Breadcrumbs />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
