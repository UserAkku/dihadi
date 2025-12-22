import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { MapPin, Briefcase, IndianRupee, Clock, Users, Calendar, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            <div className='max-w-4xl mx-auto px-4 py-8'>
                {/* Back Button */}
                <Link to="/jobs" className='inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors'>
                    <ArrowLeft className='h-4 w-4' />
                    <span>Back to Jobs</span>
                </Link>

                {/* Job Header Card */}
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6'>
                    <div className='flex flex-col md:flex-row md:items-start justify-between gap-6'>
                        <div>
                            {/* Company Info */}
                            <div className='flex items-center gap-3 mb-4'>
                                {singleJob?.company?.logo ? (
                                    <img 
                                        src={singleJob?.company?.logo} 
                                        alt={singleJob?.company?.name}
                                        className='h-14 w-14 rounded-xl object-cover border border-gray-200'
                                    />
                                ) : (
                                    <div className='h-14 w-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center'>
                                        <Building2 className='h-7 w-7 text-white' />
                                    </div>
                                )}
                                <div>
                                    <h3 className='font-semibold text-gray-600'>{singleJob?.company?.name}</h3>
                                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                                        <MapPin className='h-3.5 w-3.5' />
                                        <span>{singleJob?.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Title */}
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>{singleJob?.title}</h1>

                            {/* Tags */}
                            <div className='flex flex-wrap items-center gap-2'>
                                <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 font-medium'>
                                    <Briefcase className='h-3.5 w-3.5 mr-1' />
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 font-medium'>
                                    <Clock className='h-3.5 w-3.5 mr-1' />
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-green-50 text-green-700 hover:bg-green-100 border-0 font-medium'>
                                    <IndianRupee className='h-3.5 w-3.5 mr-1' />
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`px-8 py-6 h-auto rounded-xl font-semibold text-lg transition-all duration-300 ${
                                isApplied 
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isApplied ? (
                                <>
                                    <CheckCircle2 className='h-5 w-5 mr-2' />
                                    Already Applied
                                </>
                            ) : (
                                'Apply Now'
                            )}
                        </Button>
                    </div>
                </div>

                {/* Job Details */}
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100'>
                        Job Description
                    </h2>

                    <div className='space-y-4'>
                        <div className='flex items-start gap-4 p-4 rounded-xl bg-gray-50'>
                            <Briefcase className='h-5 w-5 text-blue-600 mt-0.5' />
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Role</p>
                                <p className='text-gray-900 font-medium'>{singleJob?.title}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 p-4 rounded-xl bg-gray-50'>
                            <MapPin className='h-5 w-5 text-blue-600 mt-0.5' />
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Location</p>
                                <p className='text-gray-900 font-medium'>{singleJob?.location}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 p-4 rounded-xl bg-gray-50'>
                            <Clock className='h-5 w-5 text-blue-600 mt-0.5' />
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Experience Required</p>
                                <p className='text-gray-900 font-medium'>{singleJob?.experience} years</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 p-4 rounded-xl bg-gray-50'>
                            <IndianRupee className='h-5 w-5 text-blue-600 mt-0.5' />
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Salary</p>
                                <p className='text-gray-900 font-medium'>{singleJob?.salary} LPA</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 p-4 rounded-xl bg-gray-50'>
                            <Users className='h-5 w-5 text-blue-600 mt-0.5' />
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Total Applicants</p>
                                <p className='text-gray-900 font-medium'>{singleJob?.applications?.length}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 p-4 rounded-xl bg-gray-50'>
                            <Calendar className='h-5 w-5 text-blue-600 mt-0.5' />
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Posted Date</p>
                                <p className='text-gray-900 font-medium'>{singleJob?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className='pt-4'>
                            <h3 className='font-semibold text-gray-900 mb-3'>About the Role</h3>
                            <p className='text-gray-600 leading-relaxed'>{singleJob?.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default JobDescription