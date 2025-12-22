import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, IndianRupee } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='bg-white rounded-2xl border border-gray-200 p-6 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all'
        >
            {/* Company & Location */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    {job?.company?.logo ? (
                        <img 
                            src={job?.company?.logo} 
                            alt={job?.company?.name}
                            className='w-12 h-12 rounded-xl object-cover border border-gray-100'
                        />
                    ) : (
                        <div className='w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg'>
                            {job?.company?.name?.charAt(0)}
                        </div>
                    )}
                    <div>
                        <h3 className='font-medium text-gray-900'>{job?.company?.name}</h3>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <MapPin className='h-3.5 w-3.5' />
                            <span>{job?.location || 'India'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Title */}
            <h2 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-1'>{job?.title}</h2>
            <p className='text-gray-500 text-sm line-clamp-2 mb-4'>{job?.description}</p>

            {/* Tags */}
            <div className='flex flex-wrap items-center gap-2'>
                <Badge variant="secondary" className='bg-gray-100 text-gray-700 font-normal'>
                    {job?.position} Positions
                </Badge>
                <Badge variant="secondary" className='bg-gray-100 text-gray-700 font-normal'>
                    <Clock className='h-3 w-3 mr-1' />
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className='bg-green-50 text-green-700 font-normal'>
                    <IndianRupee className='h-3 w-3 mr-1' />
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards