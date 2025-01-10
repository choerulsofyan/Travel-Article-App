// src/components/organisms/AdminNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/hooks"; // Import useAppDispatch
import { logout } from "@/store/modules/auth/authSlice";
import { paths } from "@/routes/paths";

const AdminNavbar: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={paths.admin.dashboard}>
                    Admin Panel
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbarNav"
                    aria-controls="adminNavbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="adminNavbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={paths.admin.articles}>
                                Articles
                            </Link>
                        </li>
                        {/* Add more admin navigation links here */}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
