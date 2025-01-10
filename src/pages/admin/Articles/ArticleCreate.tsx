// src/pages/admin/Articles/ArticleCreate.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "@/components/organisms/ArticleForm";
import { paths } from "@/routes/paths";

const ArticleCreate: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate(paths.admin.articles); // Redirect to articles list after successful create
    };

    return (
        <div>
            <h2>Create New Article</h2>
            <ArticleForm onSuccess={handleSuccess} />
        </div>
    );
};

export default ArticleCreate;
