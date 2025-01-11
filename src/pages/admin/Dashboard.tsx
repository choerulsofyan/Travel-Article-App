// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchAllArticlesWithComments } from "@/store/modules/articles/articlesSlice";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ArticleWithCommentsCount {
    articleTitle: string;
    commentCount: number;
}

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading } = useAppSelector((state) => state.articles);
    const [mostCommentedArticles, setMostCommentedArticles] = useState<ArticleWithCommentsCount[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null); // Ref for the chart container

    useEffect(() => {
        dispatch(fetchAllArticlesWithComments())
            .unwrap()
            .then(() => {
                setDataLoaded(true);
            })
            .catch((error) => {
                console.error("Failed to fetch articles with comments:", error);
            });
    }, [dispatch]);

    useEffect(() => {
        if (dataLoaded) {
            const articlesWithComments = articles.map((article) => ({
                articleTitle: article.title,
                commentCount: article.comments ? article.comments.length : 0,
            }));

            articlesWithComments.sort((a, b) => b.commentCount - a.commentCount);
            setMostCommentedArticles(articlesWithComments.slice(0, 10));
        }
    }, [articles, dataLoaded]);

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

    const handleExportToPdf = async () => {
        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current);
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("dashboard.pdf");
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div className="chart-container mb-4" ref={chartRef}>
                <h2>Most Commented Articles</h2>
                {dataLoaded && <Bar data={chartData} options={chartOptions} />}
            </div>

            <button onClick={handleExportToPdf} className="btn btn-primary">
                Export to PDF
            </button>
        </div>
    );
};

export default Dashboard;
