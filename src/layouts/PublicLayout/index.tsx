// src/layouts/PublicLayout/index.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "@/components/organisms/PublicNavbar";

const PublicLayout: React.FC = () => {
    return (
        <div className="public-layout">
            <PublicNavbar />
            <main>
                <div className="container mt-4">
                    <Outlet /> {/* Render nested routes here */}
                </div>
            </main>
        </div>
    );
};

export default PublicLayout;
