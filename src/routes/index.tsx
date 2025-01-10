import { createBrowserRouter } from "react-router-dom";

// Import the layouts
import AdminLayout from "@/layouts/AdminLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Import the pages
import Home from "@/pages/public/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/admin/Dashboard";
import ArticleList from "@/pages/admin/Articles/ArticleList";
import ArticleCreate from "@/pages/admin/Articles/ArticleCreate";
import ArticleEdit from "@/pages/admin/Articles/ArticleEdit";

// import paths
import { paths } from "./paths";

// Import ProtectedRoute
import ProtectedRoute from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: paths.home,
                element: <Home />,
            },
            {
                path: paths.login,
                element: <Login />,
            },
            {
                path: paths.register,
                element: <Register />,
            },
        ],
    },
    {
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: paths.admin.dashboard,
                element: <Dashboard />,
            },
            {
                path: paths.admin.articles,
                element: <ArticleList />,
            },
            {
                path: paths.admin.createArticle,
                element: <ArticleCreate />,
            },
            {
                path: paths.admin.editArticle,
                element: <ArticleEdit />,
            },
        ],
    },
]);
