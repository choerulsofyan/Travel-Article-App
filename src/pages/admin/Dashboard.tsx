// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchAllArticlesWithComments } from "@/store/modules/articles/articlesSlice"; // Import the new thunk
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ArticleWithCommentsCount {
    articleTitle: string;
    commentCount: number;
}

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading } = useAppSelector((state) => state.articles);

    useEffect(() => {
        // Fetch all articles with comments when the component mounts
        dispatch(fetchAllArticlesWithComments());
    }, [dispatch]);

    // Calculate most commented articles directly in the component body
    const mostCommentedArticles = articles
        .map((article) => ({
            articleTitle: article.title,
            commentCount: article.comments ? article.comments.length : 0,
        }))
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 10);

    const chartData = {
        labels: mostCommentedArticles.map((article) => article.articleTitle),
        datasets: [
            {
                label: "Number of Comments",
                data: mostCommentedArticles.map((article) => article.commentCount),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div className="chart-container mb-4">
                <h2>Most Commented Articles</h2>
                {loading ? <p>Loading data...</p> : <Bar data={chartData} options={chartOptions} />}
            </div>

            {/* Other dashboard data and charts can go here */}
        </div>
    );
};

export default Dashboard;
