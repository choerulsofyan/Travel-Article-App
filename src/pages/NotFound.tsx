// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
            <p className="text-gray-500 mt-2">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
