// src/pages/admin/Profile.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import usersApi from "@/api/modules/usersApi";
import { UserProfileResponse } from "@/types/users";
import { formatIndonesianDateTime } from "@/utils";

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
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Profile not found.</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>

            <div>
                <h2>Details</h2>
                <p>
                    <strong>Username:</strong> {userProfile.username}
                </p>
                <p>
                    <strong>Email:</strong> {userProfile.email}
                </p>
            </div>

            <div>
                <h2>Articles</h2>
                {userProfile.articles.length > 0 ? (
                    <ul>
                        {userProfile.articles.map((article) => (
                            <li key={article.id}>
                                <h3>{article.title}</h3>
                                <p>Category: {article.category ? article.category.name : "N/A"}</p>
                                <p>
                                    Published At: {formatIndonesianDateTime(article.publishedAt).date}{" "}
                                    <small>{formatIndonesianDateTime(article.publishedAt).time}</small>
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No articles found.</p>
                )}
            </div>

            <div>
                <h2>Comments</h2>
                {userProfile.comments.length > 0 ? (
                    <ul>
                        {userProfile.comments.map((comment) => (
                            <li key={comment.id}>
                                <p>{comment.content}</p>
                                {comment.article && <p>Article: {comment.article ? comment.article.title : "N/A"}</p>}
                                <p>
                                    <small>
                                        Posted at: {formatIndonesianDateTime(comment.createdAt).date}{" "}
                                        {formatIndonesianDateTime(comment.createdAt).time}
                                    </small>
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
