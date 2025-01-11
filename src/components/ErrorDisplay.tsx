// src/components/ErrorDisplay.tsx
import React from "react";

interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default ErrorDisplay;