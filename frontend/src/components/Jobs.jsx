import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Footer from './shared/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const query = searchedQuery.toLowerCase();
                
                // Check if it's a salary filter (contains "LPA")
                if (searchedQuery.includes('LPA')) {
                    const salary = job.salary;
                    if (searchedQuery === '0-3 LPA') return salary >= 0 && salary <= 3;
                    if (searchedQuery === '3-6 LPA') return salary > 3 && salary <= 6;
                    if (searchedQuery === '6-10 LPA') return salary > 6 && salary <= 10;
                    if (searchedQuery === '10-20 LPA') return salary > 10 && salary <= 20;
                    if (searchedQuery === '20+ LPA') return salary > 20;
                }
                
                // Normal text search
                return job.title?.toLowerCase().includes(query) ||
                    job.description?.toLowerCase().includes(query) ||
                    job.location?.toLowerCase().includes(query) ||
                    job.jobType?.toLowerCase().includes(query) ||
                    job.company?.name?.toLowerCase().includes(query)
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-7xl mx-auto px-4 py-12'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-2'>Find Jobs</h1>
                    <p className='text-blue-100'>Discover {filterJobs.length} opportunities matching your criteria</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Sidebar Filter */}
                    <div className='lg:w-72 flex-shrink-0'>
                        <FilterCard />
                    </div>

                    {/* Jobs Grid */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100'>
                                <div className='p-4 rounded-2xl bg-gray-100 mb-4'>
                                    <Search className='h-8 w-8 text-gray-400' />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-900 mb-2'>No jobs found</h3>
                                <p className='text-gray-500 text-center max-w-sm'>
                                    Try adjusting your search or filter to find what you are looking for.
                                </p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Jobs