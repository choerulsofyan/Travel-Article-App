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
        createComment: "/admin/comments/create",
        editComment: "/admin/comments/:documentId/edit",
        articleDetail: "/admin/article/:documentId",
        profile: "/admin/profile",
    },
};
