// src/components/Loader.tsx
import React from "react";
import { ClipLoader } from "react-spinners"; // Or any other spinner you prefer

const TableLoader: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <ClipLoader color="#3490dc" loading={true} size={20} />
            <span className="ml-2 text-gray-600">Loading data...</span>
        </div>
    );
};

export default TableLoader;
