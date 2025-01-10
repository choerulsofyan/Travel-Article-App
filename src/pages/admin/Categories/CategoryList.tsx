// src/pages/admin/Categories/CategoryList.tsx
import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCategories, deleteCategory, resetCategories } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";
import InfiniteScroll from "react-infinite-scroll-component";

const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error, hasMore, page, pageSize } = useAppSelector((state) => state.categories);

    const loadMoreCategories = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(fetchCategories({ page, pageSize }));
        }
    }, [dispatch, loading, hasMore, page, pageSize]);

    useEffect(() => {
        dispatch(resetCategories());
        dispatch(fetchCategories({ page: 1, pageSize }));
        return () => {
            dispatch(resetCategories());
        };
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

    return (
        <div>
            <h1>Categories</h1>
            <Link to={paths.admin.createCategory} className="btn btn-primary">
                Create Category
            </Link>
            <InfiniteScroll
                dataLength={categories.length}
                next={loadMoreCategories}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more categories to load.</p>}
            >
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
                                    <button className="btn btn-danger" onClick={() => handleDelete(category.documentId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>

            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default CategoryList;
