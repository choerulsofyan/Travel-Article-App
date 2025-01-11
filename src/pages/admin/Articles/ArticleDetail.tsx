// src/pages/public/Articles/ArticleDetail.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchArticleById, clearArticleDetail } from "@/store/modules/articles/articlesSlice";
import { formatIndonesianDateTime } from "@/utils";
import { Article } from "@/types/articles";

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
        return <div>Loading article details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            {article.cover_image_url && <img className="w-25" src={article.cover_image_url} alt={article.title} style={{ maxWidth: "100%" }} />}
            <p>{article.description}</p>

            <p>
                <strong>Author:</strong> {article.user.username} ({article.user.email})
            </p>
            <p>
                <strong>Category:</strong> {article.category ? article.category.name : "N/A"}
            </p>

            <p>
                <strong>Created At:</strong> {formatIndonesianDateTime(article.createdAt).date}{" "}
                <small>{formatIndonesianDateTime(article.createdAt).time}</small>
            </p>
            <p>
                <strong>Updated At:</strong> {formatIndonesianDateTime(article.updatedAt).date}{" "}
                <small>{formatIndonesianDateTime(article.updatedAt).time}</small>
            </p>
            <p>
                <strong>Published At:</strong> {formatIndonesianDateTime(article.publishedAt).date}{" "}
                <small>{formatIndonesianDateTime(article.publishedAt).time}</small>
            </p>

            <h2>Comments</h2>
            {article.comments.length > 0 ? (
                <ul>
                    {article.comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.content}</p>
                            <p>
                                <small>
                                    Posted at: {formatIndonesianDateTime(comment.createdAt).date} {formatIndonesianDateTime(comment.createdAt).time}
                                </small>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default ArticleDetail;
