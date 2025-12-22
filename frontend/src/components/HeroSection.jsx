import { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <div className='min-h-[calc(100vh-64px)] bg-gray-50'>
            {/* Gradient Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-4xl mx-auto px-6 py-20 text-center'>
                    <p className='text-blue-100 text-sm font-medium tracking-wide mb-4'>
                        INDIA&apos;S #1 JOB PLATFORM
                    </p>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4'>
                        Find Your Dream Job
                    </h1>
                    <p className='text-lg text-blue-100 max-w-xl mx-auto'>
                        Connect with top companies and discover opportunities that match your skills
                    </p>
                </div>
            </div>

            {/* Search Section */}
            <div className='max-w-2xl mx-auto px-6 -mt-8'>
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-4'>
                    <div className='flex flex-col sm:flex-row items-center gap-3'>
                        <div className='relative w-full'>
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                            <input
                                type="text"
                                placeholder='Job title, company, or keywords...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className='w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-800 placeholder:text-gray-400'
                            />
                        </div>
                        <Button 
                            onClick={searchJobHandler} 
                            className="w-full sm:w-auto px-8 py-3.5 h-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all"
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className='max-w-2xl mx-auto px-6 py-16'>
                <div className='grid grid-cols-3 gap-6 text-center'>
                    <div>
                        <p className='text-3xl md:text-4xl font-bold text-gray-900'>500+</p>
                        <p className='text-sm text-gray-500 mt-1'>Companies</p>
                    </div>
                    <div>
                        <p className='text-3xl md:text-4xl font-bold text-gray-900'>10K+</p>
                        <p className='text-sm text-gray-500 mt-1'>Active Jobs</p>
                    </div>
                    <div>
                        <p className='text-3xl md:text-4xl font-bold text-gray-900'>50K+</p>
                        <p className='text-sm text-gray-500 mt-1'>Job Seekers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection