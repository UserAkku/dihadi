import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className='max-w-7xl mx-auto px-4 py-20'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
                <div>
                    <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                        Latest Job Openings
                    </h2>
                    <p className='text-gray-500'>
                        Discover the most recent opportunities from top companies
                    </p>
                </div>
                <Link to="/jobs">
                    <Button variant="outline" className='border-gray-300 text-gray-700 hover:bg-gray-50'>
                        View All Jobs
                        <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                </Link>
            </div>

            {/* Jobs Grid */}
            {allJobs.length <= 0 ? (
                <div className='text-center py-16 bg-gray-50 rounded-2xl'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-4'>
                        <Sparkles className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Jobs Available</h3>
                    <p className='text-gray-500'>Check back later for new opportunities.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {allJobs?.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default LatestJobs