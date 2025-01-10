// src/components/organisms/ArticleForm.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { createArticle, updateArticle } from "@/store/modules/articles/articlesSlice";
import { Article, CreateArticlePayload, UpdateArticlePayload } from "@/types/articles";

interface ArticleFormProps {
    article?: Article; // Optional article prop for editing
    onSuccess: () => void; // Callback function to be called after successful create or update
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSuccess }) => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<Omit<CreateArticlePayload["data"], "category"> | Omit<UpdateArticlePayload["data"], "category">>({
        title: article?.title || "",
        description: article?.description || "",
        cover_image_url: article?.cover_image_url || "",
    });

    const [category, setCategory] = useState<number>(article?.category?.id || 4);

    useEffect(() => {
        if (article) {
            setFormData({
                title: article.title,
                description: article.description,
                cover_image_url: article.cover_image_url,
            });
            setCategory(article.category?.id || 4);
        }
    }, [article]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(parseInt(e.target.value, 10));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const categoryId = category || 0;

        if (article && article.documentId) {
            // Update existing article
            dispatch(
                updateArticle({
                    documentId: article.documentId,
                    payload: { data: { ...formData, category: categoryId } },
                }),
            )
                .unwrap()
                .then(() => {
                    onSuccess(); // Call the success callback
                })
                .catch((error) => {
                    console.error("Error updating article:", error);
                    // Handle update error (e.g., display error message)
                });
        } else {
            // Create new article
            dispatch(createArticle({ data: { ...formData, category: categoryId } }))
                .unwrap()
                .then(() => {
                    onSuccess(); // Call the success callback
                })
                .catch((error) => {
                    console.error("Error creating article:", error);
                    // Handle create error (e.g., display error message)
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="cover_image_url" className="form-label">
                    Cover Image URL
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cover_image_url"
                    name="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>
                <select className="form-select" id="category" name="category" value={formData.category} onChange={handleCategoryChange}>
                    <option value={0}>Select Category</option>
                    {/* Fetch categories from API and map them to options */}
                    {/* <option value={1}>Category 1</option>
          <option value={2}>Category 2</option> */}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                {article ? "Update" : "Create"} Article
            </button>
        </form>
    );
};

export default ArticleForm;
