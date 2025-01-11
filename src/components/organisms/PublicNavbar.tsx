import React from "react";
import { NavLink } from "react-router-dom";
import { paths } from "@/routes/paths";
import { useAppSelector } from "@/hooks";

const PublicNavbar: React.FC = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <NavLink to={paths.home} className="text-lg font-bold text-gray-800">
                    Travel Article App
                </NavLink>
                <ul className="flex space-x-6">
                    <li>
                        <NavLink to={paths.home} className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : "text-gray-600"}`}>
                            Home
                        </NavLink>
                    </li>
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <NavLink
                                    to={paths.login}
                                    className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : "text-gray-600"}`}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={paths.register}
                                    className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : "text-gray-600"}`}
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink
                                to={paths.admin.dashboard}
                                className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : "text-gray-600"}`}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default PublicNavbar;
