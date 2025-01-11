import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchComments, deleteComment, resetComments } from "@/store/modules/comments/commentsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import TableLoader from "@/components/TableLoader";
import { TrashIcon } from "@heroicons/react/24/outline";
import Header from "@/components/organisms/Header";
import ErrorDisplay from "@/components/ErrorDisplay";

const CommentList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comments, loading, error, hasMore, page, pageSize } = useAppSelector((state) => state.comments);

    const loadMoreComments = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(fetchComments({ page, pageSize }));
        }
    }, [dispatch, loading, hasMore, page, pageSize]);

    useEffect(() => {
        dispatch(resetComments());
        dispatch(fetchComments({ page: 1, pageSize }));
        return () => {
            dispatch(resetComments());
        };
    }, [dispatch]);

    const handleDelete = (documentId: string) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            dispatch(deleteComment(documentId))
                .unwrap()
                .then(() => {})
                .catch((error) => {
                    console.error("Error deleting comment:", error);
                });
        }
    };

    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center justify-content-between py-4">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Comments</h1>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <InfiniteScroll
                                    dataLength={comments.length}
                                    next={loadMoreComments}
                                    hasMore={hasMore}
                                    loader={<TableLoader />}
                                    endMessage={<p className="text-center text-gray-600 py-4">No more comments to load.</p>}
                                >
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 w-16"
                                                >
                                                    No
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Content
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center w-32">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {comments.map((comment, index) => (
                                                <tr key={index} className={index % 2 === 0 ? undefined : "bg-gray-50"}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{comment.content}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 space-x-2 w-32">
                                                        {}
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDelete(comment.documentId)}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
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

export default CommentList;
