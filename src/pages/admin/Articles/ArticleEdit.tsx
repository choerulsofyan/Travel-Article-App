// src/pages/admin/Articles/ArticleEdit.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import ArticleForm from "@/components/organisms/ArticleForm";
import { fetchArticleById } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import { Article } from "@/types/articles";
import Header from "@/components/organisms/Header";

const ArticleEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { documentId } = useParams<{ documentId: string }>();
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (documentId) {
            dispatch(fetchArticleById(documentId))
                .unwrap()
                .then((article) => {
                    setCurrentArticle(article);
                })
                .catch((error) => {
                    console.error("Failed to fetch article:", error);
                    navigate(paths.admin.articles);
                });
        }
    }, [dispatch, documentId]);

    const handleSuccess = () => {
        navigate(paths.admin.articles);
    };

    return (
        <div>
            <Header title="Edit Article" />
            <div className="p-4 bg-white rounded-lg shadow-md">
                {currentArticle ? <ArticleForm article={currentArticle} onSuccess={handleSuccess} /> : <div>Loading article...</div>}
            </div>
        </div>
    );
};

export default ArticleEdit;
