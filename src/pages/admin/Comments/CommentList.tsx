// src/pages/admin/Comments/CommentList.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchComments, deleteComment } from "@/store/modules/comments/commentsSlice";
import { Link } from "react-router-dom";
import { paths } from "@/routes/paths";

const CommentList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comments, loading, error } = useAppSelector((state) => state.comments);

    useEffect(() => {
        dispatch(fetchComments());
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

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Comments</h1>
            <Link to={paths.admin.createComment} className="btn btn-primary">
                Create Comment
            </Link>
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
                                <Link to={paths.admin.editComment.replace(":documentId", comment.documentId)} className="btn btn-secondary">
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(comment.documentId)}>
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

export default CommentList;
