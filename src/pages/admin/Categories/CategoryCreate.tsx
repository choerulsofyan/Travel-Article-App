// src/pages/admin/Categories/CategoryCreate.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { createCategory } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";
import { CreateCategoryPayload } from "@/types/categories";
import Header from "@/components/organisms/Header";
import ErrorDisplay from "@/components/ErrorDisplay";

const CategoryCreate: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateCategoryPayload["data"]>({
        name: "",
        description: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        dispatch(createCategory({ data: formData }))
            .unwrap()
            .then(() => {
                navigate(paths.admin.categories);
            })
            .catch((error) => {
                console.error("Error creating category:", error);
                setError("Failed to create category. Please try again.");
            });
    };

    return (
        <div>
            <Header title="Create Category" />
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
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryCreate;
