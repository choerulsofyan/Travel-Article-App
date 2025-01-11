import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "@/components/organisms/PublicNavbar";

const PublicLayout: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <PublicNavbar />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
