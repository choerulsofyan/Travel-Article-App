import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/modules/auth/authSlice";
import { paths } from "@/routes/paths";
import { HomeIcon, DocumentTextIcon, UserCircleIcon, ChatBubbleLeftRightIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="flex flex-col bg-gray-800 text-white h-screen w-64 sticky top-0">
            <div className="p-4">
                <h1 className="text-lg font-bold">Travel Article App</h1>
                {user && <p className="mt-2 text-sm">Welcome, {user.username}</p>}
            </div>
            <nav className="flex-grow">
                <ul className="flex flex-col">
                    <li className="px-4 py-3">
                        <NavLink
                            to={paths.admin.dashboard}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 hover:bg-gray-700 rounded-md p-2 ${isActive ? "bg-gray-700" : ""}`
                            }
                            end
                        >
                            <HomeIcon className="w-5 h-5" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="px-4 py-3">
                        <NavLink
                            to={paths.admin.articles}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 hover:bg-gray-700 rounded-md p-2 ${isActive ? "bg-gray-700" : ""}`
                            }
                        >
                            <DocumentTextIcon className="w-5 h-5" />
                            <span>Articles</span>
                        </NavLink>
                    </li>
                    <li className="px-4 py-3">
                        <NavLink
                            to={paths.admin.categories}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 hover:bg-gray-700 rounded-md p-2 ${isActive ? "bg-gray-700" : ""}`
                            }
                        >
                            <ClipboardDocumentListIcon className="w-5 h-5" />
                            <span>Categories</span>
                        </NavLink>
                    </li>
                    <li className="px-4 py-3">
                        <NavLink
                            to={paths.admin.comments}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 hover:bg-gray-700 rounded-md p-2 ${isActive ? "bg-gray-700" : ""}`
                            }
                        >
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            <span>Comments</span>
                        </NavLink>
                    </li>
                    <li className="px-4 py-3">
                        <NavLink
                            to={paths.admin.profile}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 hover:bg-gray-700 rounded-md p-2 ${isActive ? "bg-gray-700" : ""}`
                            }
                        >
                            <UserCircleIcon className="w-5 h-5" />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    {/* Add more navigation links with icons here */}
                </ul>
            </nav>
            <div className="p-4">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
