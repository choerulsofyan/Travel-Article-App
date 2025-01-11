import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchArticles, deleteArticle, resetArticles } from "@/store/modules/articles/articlesSlice";
import { paths } from "@/routes/paths";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatIndonesianDateTime } from "@/utils";
import { stringify } from "csv-stringify/browser/esm";
import { TrashIcon, PencilSquareIcon, EyeIcon, PlusIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import TableLoader from "@/components/TableLoader";
import ErrorDisplay from "@/components/ErrorDisplay";

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

    const handleDelete = (documentId: string) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            dispatch(deleteArticle(documentId))
                .unwrap()
                .then(() => {})
                .catch((error) => {
                    console.error("Error deleting article:", error);
                });
        }
    };

    const handleEdit = (article: any) => {
        if (article.documentId) {
            if (article.user.id === user?.id) {
                navigate(paths.admin.editArticle.replace(":documentId", article.documentId));
            } else {
            }
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
            {/* <Header title="Articles" /> */}

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center justify-content-between py-4">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Articles</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
                        <Link
                            to={paths.admin.createArticle}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <PlusIcon className="h-5 w-5 me-1" />
                            Create Article
                        </Link>
                        <button
                            onClick={exportToCSV}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <DocumentArrowDownIcon className="h-5 w-5 me-1" />
                            Export to CSV
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-10 pt-1 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <InfiniteScroll
                                    dataLength={articles.length}
                                    next={loadMoreArticles}
                                    hasMore={hasMore}
                                    loader={<TableLoader />}
                                    endMessage={<p className="text-center text-gray-600 py-4">No more articles to load.</p>}
                                >
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    No
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Comments
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Author
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Created At
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Published At
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {articles.map((article, index) => {
                                                const isAuthor = article.user.id === user?.id;
                                                return (
                                                    <tr key={index} className={index % 2 === 0 ? undefined : "bg-gray-50"}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {index + 1}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{article.title}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {article.category ? article.category.name : "N/A"}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {article.comments ? article.comments.length : 0}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {article.user ? article.user.username : "N/A"}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {renderDateTime(article.createdAt)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {renderDateTime(article.publishedAt)}
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                                                            <button
                                                                onClick={() => handleViewDetail(article.documentId || "")}
                                                                className="text-blue-500 hover:text-blue-700"
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleEdit(article)}
                                                                className={`text-yellow-500 hover:text-yellow-700 ${!isAuthor && "cursor-not-allowed"}`}
                                                                disabled={!isAuthor}
                                                            >
                                                                <PencilSquareIcon className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                className="text-red-500 hover:text-red-700"
                                                                onClick={() => {
                                                                    if (article.documentId) {
                                                                        handleDelete(article.documentId);
                                                                    }
                                                                }}
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && <ErrorDisplay message={error} />}
        </div>
    );
};

export default ArticleList;
