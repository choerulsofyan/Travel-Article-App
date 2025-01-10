// src/pages/auth/Login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks"; // Import useAppDispatch and useAppSelector
import { login, clearError } from "@/store/modules/auth/authSlice";
import { LoginCredentials } from "@/types/auth";
import { paths } from "@/routes/paths";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const error = useAppSelector((state) => state.auth.error);

    // Get the "from" state to know where the user came from
    const from = (location.state as { from: string })?.from || paths.admin.dashboard;

    const [formData, setFormData] = useState<LoginCredentials>({
        identifier: "",
        password: "",
    });

    useEffect(() => {
        // If user is authenticated, redirect to admin dashboard
        if (isAuthenticated) {
            // navigate(paths.admin.dashboard);
            navigate(from, { replace: true }); // Redirect to intended page or admin dashboard
        }
    }, [isAuthenticated, navigate, from]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="identifier" className="form-label">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
