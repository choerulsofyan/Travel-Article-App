// src/pages/admin/Comments/CommentEdit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { fetchCommentById, updateComment } from "@/store/modules/comments/commentsSlice";
import { paths } from "@/routes/paths";
import { UpdateCommentPayload } from "@/types/comments";

const CommentEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { documentId } = useParams<{ documentId: string }>();

    const [formData, setFormData] = useState<UpdateCommentPayload["data"]>({
        content: "",
    });

    useEffect(() => {
        if (documentId) {
            dispatch(fetchCommentById(documentId))
                .unwrap()
                .then((comment) => {
                    setFormData({
                        content: comment.content,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching comment:", error);
                    // Handle error (e.g., display an error message or redirect)
                });
        }
    }, [dispatch, documentId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (documentId) {
            dispatch(
                updateComment({
                    documentId,
                    payload: { data: formData },
                }),
            )
                .unwrap()
                .then(() => {
                    navigate(paths.admin.comments); // Redirect to comments list
                })
                .catch((error) => {
                    console.error("Error updating comment:", error);
                    // Handle error (e.g., display an error message)
                });
        }
    };

    return (
        <div>
            <h1>Edit Comment</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content
                    </label>
                    <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange} required />
                </div>
                {/* You might not need an Article field here for editing */}
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default CommentEdit;
