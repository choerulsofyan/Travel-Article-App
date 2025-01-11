import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createArticle, updateArticle } from "@/store/modules/articles/articlesSlice";
import { fetchAllCategories } from "@/store/modules/categories/categoriesSlice";
import { Article, CreateArticlePayload, UpdateArticlePayload } from "@/types/articles";
import { Category } from "@/types/categories";
import ImageUpload from "./ImageUpload";
import { Image } from "@/types/upload";

interface ArticleFormProps {
    article?: Article;
    onSuccess: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSuccess }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories.categories);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<CreateArticlePayload["data"], "category"> | Omit<UpdateArticlePayload["data"], "category">>({
        title: article?.title || "",
        description: article?.description || "",
        cover_image_url: article?.cover_image_url || "",
    });

    const [category, setCategory] = useState<number>(article?.category?.id || 0);

    useEffect(() => {
        if (categories.length === 0) {
            setLoadingCategories(true);
            dispatch(fetchAllCategories())
                .unwrap()
                .then(() => setLoadingCategories(false))
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                    setError("Failed to fetch categories.");
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

    const handleImageUpload = (image: Image) => {
        setFormData({
            ...formData,
            cover_image_url: image.url,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const payload = {
            data: { ...formData, category: category },
        };

        if (article && article.documentId) {
            dispatch(
                updateArticle({
                    documentId: article.documentId,
                    payload: payload as UpdateArticlePayload,
                }),
            )
                .unwrap()
                .then(() => {
                    onSuccess();
                })
                .catch((error) => {
                    console.error("Error updating article:", error);
                    setError("Failed to update article. Please try again.");
                });
        } else {
            dispatch(createArticle(payload as CreateArticlePayload))
                .unwrap()
                .then(() => {
                    onSuccess();
                })
                .catch((error) => {
                    console.error("Error creating article:", error);
                    setError("Failed to create article. Please try again.");
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700">
                    Cover Image
                </label>
                <ImageUpload onImageUpload={handleImageUpload} />
                {formData.cover_image_url && <img src={formData.cover_image_url} alt="Cover Preview" className="mt-2 w-64" />}
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                {loadingCategories ? (
                    <div className="mt-1 text-sm text-gray-500">Loading categories...</div>
                ) : (
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value={0}>Select Category</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {article ? "Update" : "Create"} Article
            </button>
        </form>
    );
};

export default ArticleForm;
