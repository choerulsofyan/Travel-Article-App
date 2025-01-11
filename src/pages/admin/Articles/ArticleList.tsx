// src/pages/admin/Articles/ArticleList.tsx
import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchArticles, deleteArticle, resetArticles } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatIndonesianDateTime } from "@/utils";
import { Tooltip } from "bootstrap";
import { stringify } from "csv-stringify/browser/esm";

const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { articles, loading, error, hasMore, page, pageSize } = useAppSelector((state) => state.articles);
    const user = useAppSelector((state) => state.auth.user);

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

    const handleEdit = (documentId: string) => {
        navigate(paths.admin.editArticle.replace(":documentId", documentId));
    };

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

    const handleViewDetail = (documentId: string) => {
        navigate(paths.admin.articleDetail.replace(":documentId", documentId));
    };

    const renderDateTime = (dateTimeString: string) => {
        const { date, time } = formatIndonesianDateTime(dateTimeString);
        return (
            <>
                {date} <br />
                <small>{time}</small>
            </>
        );
    };

    const exportToCSV = () => {
        const csvColumns = ["No", "Title", "Category", "Comments", "Author", "Created At", "Published At"];

        const csvData = articles.map((article, index) => [
            index + 1,
            article.title,
            article.category ? article.category.name : "N/A",
            article.comments ? article.comments.length : 0,
            article.user ? article.user.username : "N/A",
            formatIndonesianDateTime(article.createdAt).date,
            formatIndonesianDateTime(article.publishedAt).date,
        ]);

        stringify([csvColumns, ...csvData], (err, output) => {
            if (err) {
                console.error("Error generating CSV:", err);
                return;
            }

            const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.setAttribute("download", "articles.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    return (
        <div>
            <h1>Articles</h1>
            <Link to={paths.admin.createArticle} className="btn btn-primary">
                Create Article
            </Link>
            <button className="btn btn-success" onClick={exportToCSV}>
                Export to CSV
            </button>
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
                            <th>No</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Comments</th>
                            <th>Author</th>
                            <th>Created At</th>
                            <th>Published At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => {
                            const isAuthor = article.user.id === user?.id;
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{article.title}</td>
                                    <td>{article.category ? article.category.name : "N/A"}</td>
                                    <td>{article.comments ? article.comments.length : 0}</td>
                                    <td>{article.user ? article.user.username : "N/A"}</td>
                                    <td>{renderDateTime(article.createdAt)}</td>
                                    <td>{renderDateTime(article.publishedAt)}</td>
                                    <td>
                                        <button onClick={() => handleViewDetail(article.documentId || "")} className="btn btn-info btn-sm">
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(article.documentId || "")}
                                            className={`btn btn-sm ms-2 ${isAuthor ? "btn-secondary" : "btn-outline-secondary disabled"}`}
                                            data-bs-toggle={!isAuthor ? "tooltip" : ""}
                                            data-bs-placement="right"
                                            data-bs-title={!isAuthor ? "You are not authorized to edit this article." : ""}
                                            // title={!isAuthor ? "You are not authorized to edit this article." : ""}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
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
                            );
                        })}
                    </tbody>
                </table>
            </InfiniteScroll>

            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default ArticleList;
