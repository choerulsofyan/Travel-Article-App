// src/components/organisms/PublicNavbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { paths } from "@/routes/paths";

const PublicNavbar: React.FC = () => {
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
                    <li>
                        <NavLink to={paths.login} className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : "text-gray-600"}`}>
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
                </ul>
            </div>
        </nav>
    );
};

export default PublicNavbar;
