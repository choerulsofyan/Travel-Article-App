// src/pages/admin/Categories/CategoryList.tsx
import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCategories, deleteCategory, resetCategories } from "@/store/modules/categories/categoriesSlice";
import { paths } from "@/routes/paths";
import InfiniteScroll from "react-infinite-scroll-component";
import TableLoader from "@/components/TableLoader";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Header from "@/components/organisms/Header";
import ErrorDisplay from "@/components/ErrorDisplay";

const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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

    const handleEdit = (documentId: string) => {
        navigate(paths.admin.editCategory.replace(":documentId", documentId));
    };

    return (
        <div>
            {/* <Header title="Categories" /> */}
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center justify-content-between py-4">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
                        <Link
                            to={paths.admin.createCategory}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Create Category
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <InfiniteScroll
                                    dataLength={categories.length}
                                    next={loadMoreCategories}
                                    hasMore={hasMore}
                                    loader={<TableLoader />}
                                    endMessage={<p className="text-center text-gray-600 py-4">No more categories to load.</p>}
                                >
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 w-16"
                                                >
                                                    No
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Name
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {categories.map((category, index) => (
                                                <tr key={category.documentId} className={index % 2 === 0 ? undefined : "bg-gray-50"}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.name}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 space-x-2 w-32">
                                                        <button
                                                            onClick={() => handleEdit(category.documentId)}
                                                            className="text-yellow-500 hover:text-yellow-700"
                                                        >
                                                            <PencilSquareIcon className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDelete(category.documentId)}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <ErrorDisplay message={error} />}
        </div>
    );
};

export default CategoryList;
