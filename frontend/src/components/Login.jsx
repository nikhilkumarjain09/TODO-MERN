import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage("");

        if (!formData.email || !formData.password) {
            setError({ message: "Both fields are required." });
            setLoading(false);
            return;
        }

        try {
            const result = await axios.post("/user/login", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
            setSuccessMessage("Login successful! Redirecting...");
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError({ message: error.response?.data?.message || "Something went wrong. Please try again." });
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {userToken && <Navigate to="/" />}
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h1>
                {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error.message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none ${
                                error && !formData.email ? "border-red-600" : "border-gray-300"
                            }`}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-control block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none ${
                                error && !formData.password ? "border-red-600" : "border-gray-300"
                            }`}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="remember"
                                className="form-check-input mr-2 h-4 w-4"
                            />
                            <label htmlFor="remember" className="text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgotPassword" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
                            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-700">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
