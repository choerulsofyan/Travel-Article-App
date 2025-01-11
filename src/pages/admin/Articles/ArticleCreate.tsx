// src/pages/admin/Articles/ArticleCreate.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "@/components/organisms/ArticleForm";
import { paths } from "@/routes/paths";
import Header from "@/components/organisms/Header";

const ArticleCreate: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate(paths.admin.articles);
    };

    return (
        <div>
            <Header title="Create New Article" />
            <div className="p-4 bg-white rounded-lg shadow-md">
                <ArticleForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
};

export default ArticleCreate;
