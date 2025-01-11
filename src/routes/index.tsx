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
import CategoryList from "@/pages/admin/Categories/CategoryList";
import CategoryCreate from "@/pages/admin/Categories/CategoryCreate";
import CategoryEdit from "@/pages/admin/Categories/CategoryEdit";
import CommentList from "@/pages/admin/Comments/CommentList";
import CommentCreate from "@/pages/admin/Comments/CommentCreate";
import CommentEdit from "@/pages/admin/Comments/CommentEdit";
import ArticleDetail from "@/pages/admin/Articles/ArticleDetail";
import Profile from "@/pages/admin/Profile";
import NotFound from "@/pages/NotFound";

// import paths
import { paths } from "@/routes/paths";

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
            {
                path: "*",
                element: <NotFound />,
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
            {
                path: paths.admin.articleDetail,
                element: <ArticleDetail />,
            },
            {
                path: paths.admin.categories,
                element: <CategoryList />,
            },
            {
                path: paths.admin.createCategory,
                element: <CategoryCreate />,
            },
            {
                path: paths.admin.editCategory,
                element: <CategoryEdit />,
            },
            {
                path: paths.admin.comments,
                element: <CommentList />,
            },
            {
                path: paths.admin.createComment,
                element: <CommentCreate />,
            },
            {
                path: paths.admin.editComment,
                element: <CommentEdit />,
            },
            {
                path: paths.admin.profile,
                element: <Profile />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
