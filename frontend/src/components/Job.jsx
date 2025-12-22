import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, IndianRupee, Briefcase } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1'>
            {/* Header */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden'>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                    <div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                            {job?.company?.name}
                        </h3>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <MapPin className='h-3.5 w-3.5' />
                            <span>{job?.location || 'India'}</span>
                        </div>
                    </div>
                </div>
                <button className='p-2 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors'>
                    <Bookmark className='h-5 w-5' />
                </button>
            </div>

            {/* Job Title & Description */}
            <div className='mb-4'>
                <h2 className='text-lg font-bold text-gray-900 mb-2 line-clamp-1'>{job?.title}</h2>
                <p className='text-gray-600 text-sm line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap items-center gap-2 mb-5'>
                <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 font-medium'>
                    <Briefcase className='h-3.5 w-3.5 mr-1' />
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 font-medium'>
                    <Clock className='h-3.5 w-3.5 mr-1' />
                    {job?.jobType}
                </Badge>
                <Badge className='bg-green-50 text-green-700 hover:bg-green-100 border-0 font-medium'>
                    <IndianRupee className='h-3.5 w-3.5 mr-1' />
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                <span className='text-xs text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Posted today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </span>
                <div className='flex items-center gap-2'>
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)} 
                        variant="ghost"
                        className='text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    >
                        Details
                    </Button>
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)} 
                        className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm'
                    >
                        Apply Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Job