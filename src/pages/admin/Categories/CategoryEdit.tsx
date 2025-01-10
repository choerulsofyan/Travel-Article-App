// src/pages/admin/Categories/CategoryEdit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCategoryById, updateCategory } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";
import { UpdateCategoryPayload, Category } from "@/types/categories";

const CategoryEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { documentId } = useParams<{ documentId: string }>();

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
                    // Handle error (e.g., display an error message)
                });
        }
    };

    return (
        <div>
            <h1>Edit Category</h1>
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
                    Update
                </button>
            </form>
        </div>
    );
};

export default CategoryEdit;
