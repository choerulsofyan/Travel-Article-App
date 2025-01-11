import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "@/components/organisms/ArticleForm";
import { paths } from "@/routes/paths";
import Header from "@/components/organisms/Header";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const ArticleCreate: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate(paths.admin.articles);
    };

    return (
        <div>
            <Header title="Create New Article" />
            <div className="p-4 bg-white rounded-lg shadow-md">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back
                </button>
                <ArticleForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
};

export default ArticleCreate;
