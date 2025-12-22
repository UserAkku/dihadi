import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        // Reset loading state when component mounts
        dispatch(setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className='min-h-screen bg-white'>
            <Navbar />
            <div className='flex items-center justify-center px-4' style={{ minHeight: 'calc(100vh - 64px)' }}>
                <div className='w-full max-w-sm'>
                    {/* Header */}
                    <div className='text-center mb-10'>
                        <h1 className='text-2xl font-semibold text-gray-900'>Sign in to Dhiadi</h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                            <input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                            <input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-3'>Continue as</label>
                            <div className='flex gap-4'>
                                <button
                                    type="button"
                                    onClick={() => setInput({...input, role: 'student'})}
                                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${input.role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    Job Seeker
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInput({...input, role: 'recruiter'})}
                                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${input.role === 'recruiter' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    Recruiter
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className='mt-8 text-center text-gray-500'>
                        New to Dhiadi?{' '}
                        <Link to="/signup" className='text-blue-600 font-medium hover:underline'>
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
