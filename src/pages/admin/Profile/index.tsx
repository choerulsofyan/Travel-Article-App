// src/pages/admin/Profile.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import usersApi from "@/api/modules/usersApi";
import { UserProfileResponse } from "@/types/users";
import { formatIndonesianDateTime } from "@/utils";
import Header from "@/components/organisms/Header";
import { Link } from "react-router-dom";
import { paths } from "@/routes/paths";
import ErrorDisplay from "@/components/ErrorDisplay";

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await usersApi.getMe();
                setUserProfile(response.data);
            } catch (error: any) {
                setError(error.response?.data?.message || "Failed to fetch user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [dispatch]);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return (
            <div>
                <ErrorDisplay message={error} />
            </div>
        );
    }

    if (!userProfile) {
        return <div>Profile not found.</div>;
    }

    return (
        <div>
            <Header title="User Profile" />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
                    <div className="space-y-4">
                        <div>
                            <span className="font-semibold">Username:</span> {userProfile.username}
                        </div>
                        <div>
                            <span className="font-semibold">Email:</span> {userProfile.email}
                        </div>
                        <div>{/* <span className="font-semibold">Role:</span> {userProfile.role.name} */}</div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Articles</h2>
                    {userProfile.articles.length > 0 ? (
                        <ul className="space-y-4">
                            {userProfile.articles.map((article) => (
                                <li key={article.id} className="border-b pb-4">
                                    <h3 className="text-xl font-semibold">
                                        <Link to={paths.admin.articleDetail.replace(":documentId", article.documentId || "")}>{article.title}</Link>
                                    </h3>
                                    {article.category && <p className="text-gray-600">Category: {article.category.name}</p>}
                                    <p className="text-sm text-gray-500">
                                        Published:{" "}
                                        {article.publishedAt ? (
                                            <>
                                                {formatIndonesianDateTime(article.publishedAt).date}{" "}
                                                <small>{formatIndonesianDateTime(article.publishedAt).time}</small>
                                            </>
                                        ) : (
                                            "N/A"
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No articles found.</p>
                    )}
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {userProfile.comments.length > 0 ? (
                        <ul className="space-y-4">
                            {userProfile.comments.map((comment) => (
                                <li key={comment.id} className="border-b pb-4">
                                    <p className="mb-2">{comment.content}</p>
                                    {comment.article && (
                                        <p className="text-gray-600">
                                            On:{" "}
                                            <Link to={paths.public.articleDetail.replace(":documentId", comment.article.documentId || "")}>
                                                {comment.article.title}
                                            </Link>
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        Posted: {formatIndonesianDateTime(comment.createdAt).date}{" "}
                                        <small>{formatIndonesianDateTime(comment.createdAt).time}</small>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
