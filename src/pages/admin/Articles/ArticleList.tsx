// src/pages/admin/Articles/ArticleList.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles, deleteArticle } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import { RootState } from "@/store/rootReducer";
import { useAppDispatch, useAppSelector } from "@/hooks";

const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading, error } = useAppSelector((state: RootState) => state.articles);

    useEffect(() => {
        dispatch(fetchArticles());
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

    if (loading) {
        return <div>Loading articles...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Article List</h1>
            </div>
            <Link to={paths.admin.createArticle} className="btn btn-primary">
                Create Article
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>
                                <Link to={paths.admin.editArticle.replace(":documentId", article.documentId as string)} className="btn btn-secondary">
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
