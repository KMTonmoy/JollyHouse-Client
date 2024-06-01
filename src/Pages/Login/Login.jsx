import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Swal from 'sweetalert2'
const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            Swal.fire({
                title: 'Login Successful',
                text: 'You have successfully logged in.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 4000);
        } catch (error) {
            Swal.fire({
                title: 'Login Failed',
                text: 'Invalid email or password. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen  ">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-purple-700">Welcome Back!</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                        >
                            {showPassword ? (
                                <FaRegEye className='text-2xl mt-7' />

                            ) : (
                                <FaRegEyeSlash className='text-2xl mt-7' />

                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-pink-600 rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-700 focus:outline-none focus:bg-gradient-to-r focus:from-pink-500 focus:to-pink-700"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        <FaGoogle></FaGoogle>
                        <span className='ml-2'>Login with Google</span>
                    </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
