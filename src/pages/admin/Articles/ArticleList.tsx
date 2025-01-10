// src/pages/admin/Articles/ArticleList.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import { RootState } from "@/store/rootReducer";
import { useAppDispatch, useAppSelector } from "@/hooks";

const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading, error } = useAppSelector((state: RootState) => state.articles);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    if (loading) {
        return <div>Loading articles...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Articles</h1>
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
                                <Link to={paths.admin.editArticle.replace(":documentId", article.documentId)} className="btn btn-secondary">
                                    Edit
                                </Link>
                                {/* Add Delete button with confirmation and dispatch(deleteArticle(article.id)) */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
