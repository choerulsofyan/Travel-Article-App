// src/components/organisms/CommentForm.tsx
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { createComment } from "@/store/modules/comments/commentsSlice";

interface CommentFormProps {
    articleId: number;
    onCommentSubmitted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentSubmitted }) => {
    const dispatch = useAppDispatch();
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await dispatch(createComment({ data: { content, article: articleId } })).unwrap();
            setContent(""); // Clear the form
            onCommentSubmitted(); // Notify parent component
        } catch (err: any) {
            setError(err.response?.data?.error?.message || "Failed to create comment");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <textarea
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows={3}
                    placeholder="Add a comment..."
                    value={content}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
