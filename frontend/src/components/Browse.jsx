import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-7xl mx-auto px-4 py-12 md:py-16'>
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='p-2 rounded-xl bg-white/20'>
                            <Search className='h-5 w-5' />
                        </div>
                        <span className='text-blue-100'>Search Results</span>
                    </div>
                    <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                        {searchedQuery ? `Results for "${searchedQuery}"` : 'Browse All Jobs'}
                    </h1>
                    <p className='text-blue-100'>
                        Found {allJobs.length} {allJobs.length === 1 ? 'opportunity' : 'opportunities'} for you
                    </p>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className='max-w-7xl mx-auto px-4 py-10'>
                {allJobs.length <= 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100'>
                        <div className='p-4 rounded-2xl bg-gray-100 mb-4'>
                            <Sparkles className='h-8 w-8 text-gray-400' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>No jobs found</h3>
                        <p className='text-gray-500 text-center max-w-sm'>
                            We could not find any jobs matching your search. Try different keywords.
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs.map((job, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                key={job._id}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Browse