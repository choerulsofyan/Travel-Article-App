// src/components/organisms/ArticleForm.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createArticle, updateArticle } from "@/store/modules/articles/articlesSlice";
import { Article, CreateArticlePayload, UpdateArticlePayload } from "@/types/articles";
import { Category } from "@/types/categories";
import { fetchAllCategories } from "@/store/modules/categories/categoriesSlice";
import ImageUpload from "./ImageUpload";
import { Image } from "@/types/upload";

interface ArticleFormProps {
    article?: Article; // Optional article prop for editing
    onSuccess: () => void; // Callback function to be called after successful create or update
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSuccess }) => {
    const dispatch = useAppDispatch();

    const handleImageUpload = (image: Image) => {
        setFormData({
            ...formData,
            cover_image_url: image.url,
        });
    };

    // Fetch categories from Redux store
    const categories = useAppSelector((state) => state.categories.categories);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);

    const [formData, setFormData] = useState<Omit<CreateArticlePayload["data"], "category"> | Omit<UpdateArticlePayload["data"], "category">>({
        title: article?.title || "",
        description: article?.description || "",
        cover_image_url: article?.cover_image_url || "",
    });

    const [category, setCategory] = useState<number>(article?.category?.id || 0);

    useEffect(() => {
        if (categories.length === 0) {
            setLoadingCategories(true);
            dispatch(fetchAllCategories()) // Use fetchAllCategories instead of fetchCategories
                .unwrap()
                .then(() => setLoadingCategories(false))
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                    setLoadingCategories(false);
                });
        }
    }, [dispatch, categories]);

    useEffect(() => {
        if (article) {
            setFormData({
                title: article.title,
                description: article.description,
                cover_image_url: article.cover_image_url,
            });
            setCategory(article.category?.id || 0);
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

        if (article && article.documentId) {
            // Update existing article
            dispatch(
                updateArticle({
                    documentId: article.documentId,
                    payload: {
                        data: { ...formData, category: category },
                    },
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
            dispatch(createArticle({ data: { ...formData, category: category } }))
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
            {/* <div className="mb-3">
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
            </div> */}
            <div className="mb-3">
                <label htmlFor="cover_image_url" className="form-label">
                    Cover Image
                </label>
                <ImageUpload onImageUpload={handleImageUpload} />
                {/* Display image preview if needed */}
                {formData.cover_image_url && <img src={formData.cover_image_url} alt="Cover Preview" style={{ width: "200px", marginTop: "10px" }} />}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>
                {loadingCategories ? (
                    <div>Loading categories...</div>
                ) : (
                    <select className="form-select" id="category" name="category" value={category} onChange={handleCategoryChange}>
                        <option value={0}>Select Category</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <button type="submit" className="btn btn-primary">
                {article ? "Update" : "Create"} Article
            </button>
        </form>
    );
};

export default ArticleForm;
