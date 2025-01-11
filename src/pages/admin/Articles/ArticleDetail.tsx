import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchArticleById, clearArticleDetail } from "@/store/modules/articles/articlesSlice";
import { formatIndonesianDateTime } from "@/utils";
import Header from "@/components/organisms/Header";
import ErrorDisplay from "@/components/ErrorDisplay";
import CommentForm from "@/components/organisms/CommentForm";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const ArticleDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { documentId } = useParams<{ documentId: string }>();
    const article = useAppSelector((state) => state.articles.articleDetail);
    const loading = useAppSelector((state) => state.articles.loading);
    const error = useAppSelector((state) => state.articles.error);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (documentId) {
            dispatch(fetchArticleById(documentId));
        }
        return () => {
            dispatch(clearArticleDetail());
        };
    }, [dispatch, documentId]);

    const handleCommentSubmitted = () => {
        if (documentId) {
            dispatch(fetchArticleById(documentId));
        }
    };

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
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back
                </button>
                {article.cover_image_url && (
                    <img src={article.cover_image_url} alt={article.title} className="w-52 h-auto object-cover rounded-lg mb-6" />
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
                    {user && <CommentForm articleId={article.id} onCommentSubmitted={handleCommentSubmitted} />}
                    {article.comments.length > 0 ? (
                        <ul className="space-y-4 mt-8">
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
