export const paths = {
    home: "/",
    login: "/login",
    register: "/register",
    admin: {
        dashboard: "/admin",
        articles: "/admin/articles",
        createArticle: "/admin/articles/create",
        editArticle: "/admin/articles/:documentId/edit",
        categories: "/admin/categories",
        createCategory: "/admin/categories/create",
        editCategory: "/admin/categories/:documentId/edit",
        comments: "/admin/comments",
        createComment: "/admin/comments/create", // Add create path
        editComment: "/admin/comments/:documentId/edit", // Add edit path
        articleDetail: "/admin/article/:documentId",
    },
};
