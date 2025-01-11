import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchAllArticlesWithComments } from "@/store/modules/articles/articlesSlice";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "@/components/organisms/Header";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ArticleWithCommentsCount {
    articleTitle: string;
    commentCount: number;
}

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { articles, loading, error } = useAppSelector((state) => state.articles);
    const [mostCommentedArticles, setMostCommentedArticles] = useState<ArticleWithCommentsCount[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

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
        if (dataLoaded && articles.length) {
            const articlesWithComments = articles.map((article) => ({
                articleTitle: article.title,
                commentCount: article.comments ? article.comments.length : 0,
            }));

            articlesWithComments.sort((a, b) => b.commentCount - a.commentCount);
            setMostCommentedArticles(articlesWithComments.slice(0, 10));
        }
    }, [dataLoaded, articles]);

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
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const handleExportToPdf = async () => {
        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("dashboard.pdf");
        }
    };

    return (
        <div>
            <Header title="Admin Dashboard" />
            <button onClick={handleExportToPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                <DocumentArrowDownIcon className="h-5 w-5 inline-block me-1" />
                Export to PDF
            </button>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow rounded-lg p-6 mb-8" ref={chartRef}>
                    <h2 className="text-2xl font-bold mb-4">Most Commented Articles</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">Error loading data</div>
                    ) : (
                        dataLoaded && <Bar data={chartData} options={chartOptions} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
