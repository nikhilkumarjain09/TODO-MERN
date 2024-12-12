import React, { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from '../Axios/axios.js';
import TokenContext from '../context/TokenContext.js';

function Register() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('/user/register', formData);
            tokenDispatch({ type: 'SET_TOKEN', payload: result.data.token });
            userDispatch({ type: 'SET_USER', payload: result.data.user });
            localStorage.setItem('authToken', JSON.stringify(result.data.token));
            setSuccessMessage('Registration successful! Redirecting...');
        } catch (error) {
            console.log(error);
            setError({ message: error.response?.data?.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100">
            {userToken && <Navigate to="/" />}
            <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
                {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error.message}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                error && !formData.name ? 'border-red-600' : 'border-gray-300'
                            }`}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                error && !formData.email ? 'border-red-600' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password || ''}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                error && !formData.password ? 'border-red-600' : 'border-gray-300'
                            }`}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
                            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
