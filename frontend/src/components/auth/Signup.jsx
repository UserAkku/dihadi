import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Upload } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    useEffect(() => {
        // Reset loading state when component mounts
        dispatch(setLoading(false));
    }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
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
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className='min-h-screen bg-white'>
            <Navbar />
            <div className='flex items-center justify-center px-4 py-8'>
                <div className='w-full max-w-sm'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-semibold text-gray-900'>Create your account</h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className='space-y-5'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                            <input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400'
                            />
                        </div>

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
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                            <input
                                type="tel"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="9876543210"
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
                                placeholder="Create a password"
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-3'>I want to</label>
                            <div className='flex gap-4'>
                                <button
                                    type="button"
                                    onClick={() => setInput({...input, role: 'student'})}
                                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${input.role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    Find a Job
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInput({...input, role: 'recruiter'})}
                                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${input.role === 'recruiter' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    Hire Talent
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Profile Photo <span className='text-gray-400 font-normal'>(Optional)</span>
                            </label>
                            <label className='flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-all'>
                                <Upload className='h-5 w-5 text-gray-400' />
                                <span className='text-sm text-gray-500 truncate'>
                                    {input.file ? input.file.name : 'Click to upload'}
                                </span>
                                <input accept="image/*" type="file" onChange={changeFileHandler} className="hidden" />
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className='mt-8 text-center text-gray-500'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-600 font-medium hover:underline'>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
