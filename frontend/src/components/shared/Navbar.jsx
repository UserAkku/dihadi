import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const NavLinks = () => (
        <>
            {user && user.role === 'recruiter' ? (
                <>
                    <Link to="/admin/companies" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Companies</Link>
                    <Link to="/admin/jobs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Jobs</Link>
                </>
            ) : (
                <>
                    <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Home</Link>
                    <Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Jobs</Link>
                    <Link to="/browse" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Browse</Link>
                </>
            )}
        </>
    );

    return (
        <nav className='bg-white border-b border-gray-100'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-6'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-2'>
                    <div className='p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600'>
                        <Briefcase className='h-5 w-5 text-white' />
                    </div>
                    <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                        Dhiadi
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <NavLinks />
                </div>

                {/* Desktop Auth Buttons */}
                <div className='hidden md:flex items-center gap-3'>
                    {!user ? (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-blue-100 hover:ring-blue-300 transition-all duration-200">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4 shadow-xl border-0 rounded-2xl animate-scale-in">
                                <div className='flex items-center gap-3 pb-4 border-b border-gray-100'>
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
                                        {user?.role === 'student' && (
                                            <p className='text-sm text-gray-500 line-clamp-1'>{user?.profile?.bio || 'No bio added'}</p>
                                        )}
                                        {user?.role === 'recruiter' && (
                                            <p className='text-sm text-gray-500'>Recruiter</p>
                                        )}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 pt-3'>
                                    {user && user.role === 'student' && (
                                        <Link to="/profile" className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                                            <User2 className='h-4 w-4 text-gray-500' />
                                            <span className='text-gray-700 font-medium'>View Profile</span>
                                        </Link>
                                    )}
                                    <button 
                                        onClick={logoutHandler} 
                                        className='flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition-colors text-left w-full'
                                    >
                                        <LogOut className='h-4 w-4 text-red-500' />
                                        <span className='text-red-600 font-medium'>Logout</span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden bg-white border-t border-gray-100 animate-fade-in'>
                    <div className='flex flex-col p-4 gap-4'>
                        <div className='flex flex-col gap-3'>
                            <NavLinks />
                        </div>
                        <hr className='border-gray-100' />
                        {!user ? (
                            <div className='flex flex-col gap-2'>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Get Started</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-3 p-2'>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500'>{user?.email}</p>
                                    </div>
                                </div>
                                {user.role === 'student' && (
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <User2 className='h-4 w-4' /> View Profile
                                        </Button>
                                    </Link>
                                )}
                                <Button onClick={logoutHandler} variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:bg-red-50">
                                    <LogOut className='h-4 w-4' /> Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar