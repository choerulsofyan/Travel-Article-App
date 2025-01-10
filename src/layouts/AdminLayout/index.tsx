// src/layouts/AdminLayout/index.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/organisms/AdminNavbar";

const AdminLayout: React.FC = () => {
    return (
        <div className="admin-layout">
            <AdminNavbar />
            <main>
                <div className="container mt-4">
                    <Outlet /> {/* Render nested routes here */}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
