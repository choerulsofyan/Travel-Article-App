// src/pages/admin/Comments/CommentCreate.tsx
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
        article: 0, // You'll need to handle selecting the article, possibly with a dropdown
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleArticleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            article: parseInt(e.target.value, 10),
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(createComment({ data: formData }))
            .unwrap()
            .then(() => {
                navigate(paths.admin.comments); // Redirect to comments list
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
                // Handle error (e.g., display an error message)
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
                    {/* Replace with a dropdown or another way to select an article */}
                    {/* <select className="form-select" id="article" name="article" value={formData.article} onChange={handleArticleChange}> */}
                    {/* <option value={0}>Select Article</option> */}
                    {/* Fetch articles from API and map them to options */}
                    {/* <option value={1}>Article 1</option>
            <option value={2}>Article 2</option> */}
                    {/* </select> */}
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CommentCreate;
