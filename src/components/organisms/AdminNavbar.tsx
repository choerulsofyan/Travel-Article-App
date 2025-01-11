// src/components/organisms/AdminNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks"; // Import useAppDispatch
import { logout } from "@/store/modules/auth/authSlice";
import { paths } from "@/routes/paths";

const AdminNavbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="col-md-2 d-none d-md-block sidebar">
            <h5>{user ? `Welcome, ${user.username}` : ""}</h5>
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="navbar-brand" to={paths.admin.dashboard}>
                            <i className="fas fa-tachometer-alt"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={paths.admin.categories}>
                            <i className="fas fa-file-alt"></i>
                            Categories
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={paths.admin.articles}>
                            <i className="fas fa-file-alt"></i>
                            Articles
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={paths.admin.comments}>
                            <i className="fas fa-file-alt"></i>
                            Comments
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={paths.admin.profile}>
                            <i className="fas fa-file-alt"></i>
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout}>
                            <i className="fas fa-th"></i>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNavbar;
