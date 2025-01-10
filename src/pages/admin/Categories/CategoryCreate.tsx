// src/pages/admin/Categories/CategoryCreate.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { createCategory } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";
import { CreateCategoryPayload } from "@/types/categories";

const CategoryCreate: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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

        dispatch(createCategory({ data: formData }))
            .unwrap()
            .then(() => {
                navigate(paths.admin.categories); // Redirect to categories list
            })
            .catch((error) => {
                console.error("Error creating category:", error);
                // Handle error (e.g., display an error message)
            });
    };

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description (Optional)
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CategoryCreate;
