// src/pages/admin/Categories/CategoryList.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCategories, deleteCategory } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";

const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (documentId: string) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategory(documentId))
                .unwrap()
                .then(() => {
                    // Optional: Display a success message
                })
                .catch((error) => {
                    console.error("Error deleting category:", error);
                    // Handle error (e.g., display an error message)
                });
        }
    };

    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Categories</h1>
            <Link to={paths.admin.createCategory} className="btn btn-primary">
                Create Category
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.documentId}>
                            <td>{category.documentId}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link to={paths.admin.editCategory.replace(":documentId", category.documentId)} className="btn btn-secondary">
                                    Edit
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.documentId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
