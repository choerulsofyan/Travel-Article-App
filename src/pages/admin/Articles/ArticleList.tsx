// src/pages/admin/Articles/ArticleList.tsx
import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchArticles, deleteArticle, resetArticles } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import InfiniteScroll from "react-infinite-scroll-component";

const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading, error, hasMore, page, pageSize } = useAppSelector((state) => state.articles);

    const loadMoreArticles = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(fetchArticles({ page, pageSize }));
        }
    }, [dispatch, loading, hasMore, page, pageSize]);

    useEffect(() => {
        dispatch(resetArticles());
        dispatch(fetchArticles({ page: 1, pageSize }));
        return () => {
            dispatch(resetArticles());
        };
    }, [dispatch]);

    const handleDelete = (documentId: string) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            dispatch(deleteArticle(documentId))
                .unwrap()
                .then(() => {
                    // Optional: Display a success message
                })
                .catch((error) => {
                    console.error("Error deleting article:", error);
                    // Handle error (e.g., display an error message)
                });
        }
    };

    return (
        <div>
            <h1>Articles</h1>
            <Link to={paths.admin.createArticle} className="btn btn-primary">
                Create Article
            </Link>

            <InfiniteScroll
                dataLength={articles.length}
                next={loadMoreArticles}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more articles to load.</p>}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Document ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.documentId}>
                                <td>{article.documentId}</td>
                                <td>{article.title}</td>
                                <td>
                                    {article.documentId && (
                                        <>
                                            <Link
                                                to={article.documentId ? paths.admin.editArticle.replace(":documentId", article.documentId) : "#"}
                                                className="btn btn-secondary"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => {
                                                    if (article.documentId) {
                                                        handleDelete(article.documentId);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>

            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default ArticleList;
