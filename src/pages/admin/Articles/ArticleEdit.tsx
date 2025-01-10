// src/pages/admin/Articles/ArticleEdit.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks"; // Import useAppDispatch and useAppSelector
import ArticleForm from "../../../components/organisms/ArticleForm";
import { fetchArticleById } from "../../../store/modules/articles/articlesSlice";
import { paths } from "../../../routes/paths";
import { Article } from "../../../types/articles";

const ArticleEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get article ID from URL params
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id))
                .unwrap()
                .then((article) => {
                    setCurrentArticle(article);
                })
                .catch((error) => {
                    console.error("Failed to fetch article:", error);
                    // Handle error, e.g., redirect to an error page or display an error message
                });
        }
    }, [dispatch, id]);

    const handleSuccess = () => {
        navigate(paths.admin.articles); // Redirect to articles list after successful update
    };

    return (
        <div>
            <h2>Edit Article</h2>
            {currentArticle ? <ArticleForm article={currentArticle} onSuccess={handleSuccess} /> : <div>Loading article...</div>}
        </div>
    );
};

export default ArticleEdit;
