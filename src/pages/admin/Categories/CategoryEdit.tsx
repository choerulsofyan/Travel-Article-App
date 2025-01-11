// src/pages/admin/Categories/CategoryEdit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCategoryById, updateCategory } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";
import { UpdateCategoryPayload } from "@/types/categories";
import Header from "@/components/organisms/Header";
import ErrorDisplay from "@/components/ErrorDisplay";

const CategoryEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { documentId } = useParams<{ documentId: string }>();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<UpdateCategoryPayload["data"]>({
        name: "",
        description: null,
    });

    useEffect(() => {
        if (documentId) {
            dispatch(fetchCategoryById(documentId))
                .unwrap()
                .then((category) => {
                    setFormData({
                        name: category.name,
                        description: category.description,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching category:", error);
                    setError("Failed to fetch category data.");
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
        setError(null);

        if (documentId) {
            dispatch(
                updateCategory({
                    documentId,
                    payload: { data: formData },
                }),
            )
                .unwrap()
                .then(() => {
                    navigate(paths.admin.categories);
                })
                .catch((error) => {
                    console.error("Error updating category:", error);
                    setError("Failed to update category. Please try again.");
                });
        }
    };

    return (
        <div>
            <Header title="Edit Category" />
            <div className="p-4 bg-white rounded-lg shadow-md">
                {error && <ErrorDisplay message={error} />}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description (Optional)
                        </label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryEdit;
