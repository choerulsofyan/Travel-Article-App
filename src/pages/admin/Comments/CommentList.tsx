// src/pages/admin/Comments/CommentList.tsx
import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchComments, deleteComment, resetComments } from "@/store/modules/comments/commentsSlice";
import InfiniteScroll from "react-infinite-scroll-component";

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
                .then(() => {
                    // Optional: Display a success message
                })
                .catch((error) => {
                    console.error("Error deleting comment:", error);
                    // Handle error (e.g., display an error message)
                });
        }
    };

    return (
        <div>
            <h1>Comments</h1>

            <InfiniteScroll
                dataLength={comments.length}
                next={loadMoreComments}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more comments to load.</p>}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Document ID</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.documentId}>
                                <td>{comment.documentId}</td>
                                <td>{comment.content}</td>
                                <td>
                                    {/* Add an Edit button here if needed */}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(comment.documentId)}>
                                        Delete
                                    </button>
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

export default CommentList;
