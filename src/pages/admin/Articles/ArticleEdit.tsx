import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import ArticleForm from "@/components/organisms/ArticleForm";
import { fetchArticleById } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import { Article } from "@/types/articles";
import Header from "@/components/organisms/Header";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

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
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back
                </button>
                {currentArticle ? <ArticleForm article={currentArticle} onSuccess={handleSuccess} /> : <div>Loading article...</div>}
            </div>
        </div>
    );
};

export default ArticleEdit;
