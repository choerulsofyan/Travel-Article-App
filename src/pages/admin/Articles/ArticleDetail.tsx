// src/pages/public/Articles/ArticleDetail.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchArticleById, clearArticleDetail } from "@/store/modules/articles/articlesSlice";
import { formatIndonesianDateTime } from "@/utils";
import { Article } from "@/types/articles";
import Header from "@/components/organisms/Header";
import ErrorDisplay from "@/components/ErrorDisplay";

const ArticleDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { documentId } = useParams<{ documentId: string }>();
    const article = useAppSelector((state) => state.articles.articleDetail);
    const loading = useAppSelector((state) => state.articles.loading);
    const error = useAppSelector((state) => state.articles.error);

    useEffect(() => {
        if (documentId) {
            dispatch(fetchArticleById(documentId));
        }
        return () => {
            dispatch(clearArticleDetail());
        };
    }, [dispatch, documentId]);

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading article details...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorDisplay message={error} />
            </div>
        );
    }

    if (!article) {
        return <div className="container mx-auto px-4 py-8">Article not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Header title={article.title} />
            <div className="bg-white shadow rounded-lg p-6">
                {article.cover_image_url && (
                    <img src={article.cover_image_url} alt={article.title} className="w-full h-auto object-cover rounded-lg mb-6" />
                )}

                <div className="prose prose-lg">
                    <p>{article.description}</p>
                </div>

                <div className="mt-6">
                    <p className="text-gray-600">
                        <span className="font-semibold">Author:</span> {article.user.username} ({article.user.email})
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Category:</span> {article.category ? article.category.name : "N/A"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Created At:</span> {formatIndonesianDateTime(article.createdAt).date}{" "}
                        <small>{formatIndonesianDateTime(article.createdAt).time}</small>
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Updated At:</span> {formatIndonesianDateTime(article.updatedAt).date}{" "}
                        <small>{formatIndonesianDateTime(article.updatedAt).time}</small>
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Published At:</span>{" "}
                        {article.publishedAt ? (
                            <>
                                {formatIndonesianDateTime(article.publishedAt).date}{" "}
                                <small>{formatIndonesianDateTime(article.publishedAt).time}</small>
                            </>
                        ) : (
                            "N/A"
                        )}
                    </p>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {article.comments.length > 0 ? (
                        <ul className="space-y-4">
                            {article.comments.map((comment) => (
                                <li key={comment.id} className="border-b pb-4">
                                    <p className="mb-2">{comment.content}</p>
                                    <p className="text-sm text-gray-500">
                                        Posted at: {formatIndonesianDateTime(comment.createdAt).date}{" "}
                                        <small>{formatIndonesianDateTime(comment.createdAt).time}</small>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
