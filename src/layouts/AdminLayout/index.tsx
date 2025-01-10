// src/layouts/AdminLayout/index.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/organisms/AdminNavbar";

const AdminLayout: React.FC = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <AdminNavbar />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 content">
                    <div className="container">
                        <Outlet /> {/* Render nested routes here */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
