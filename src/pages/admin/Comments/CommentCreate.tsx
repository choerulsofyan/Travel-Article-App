import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { createComment } from "@/store/modules/comments/commentsSlice";
import { paths } from "@/routes/paths";
import { CreateCommentPayload } from "@/types/comments";

const CommentCreate: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateCommentPayload["data"]>({
        content: "",
        article: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(createComment({ data: formData }))
            .unwrap()
            .then(() => {
                navigate(paths.admin.comments);
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
            });
    };

    return (
        <div>
            <h1>Create Comment</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content
                    </label>
                    <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="article" className="form-label">
                        Article
                    </label>
                    <input type="text" id="article" name="article" value={formData.article} onChange={handleChange} className="form-control" />
                    {}
                    {}
                    {}
                    {}
                    {}
                    {}
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CommentCreate;
