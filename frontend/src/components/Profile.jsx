import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Briefcase, ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Profile Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600'>
                <div className='max-w-4xl mx-auto px-4 pt-12 pb-24'>
                    <h1 className='text-2xl md:text-3xl font-bold text-white'>My Profile</h1>
                    <p className='text-blue-100 mt-2'>Manage your profile and view your applications</p>
                </div>
            </div>

            {/* Profile Card */}
            <div className='max-w-4xl mx-auto px-4 -mt-16'>
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8'>
                    <div className='flex flex-col md:flex-row md:items-start justify-between gap-6'>
                        {/* Profile Info */}
                        <div className='flex flex-col sm:flex-row items-start gap-6'>
                            <Avatar className="h-24 w-24 rounded-2xl ring-4 ring-white shadow-lg">
                                <AvatarImage 
                                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                    alt="profile" 
                                    className='rounded-2xl'
                                />
                            </Avatar>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>{user?.fullname}</h2>
                                <p className='text-gray-600 mt-1 max-w-md'>{user?.profile?.bio || 'No bio added yet'}</p>
                                
                                {/* Contact Info */}
                                <div className='flex flex-wrap gap-4 mt-4'>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Mail className='h-4 w-4 text-gray-400' />
                                        <span className='text-sm'>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Contact className='h-4 w-4 text-gray-400' />
                                        <span className='text-sm'>{user?.phoneNumber || 'Not added'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Edit Button */}
                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline"
                            className='rounded-xl border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                        >
                            <Pen className='h-4 w-4 mr-2' />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Skills */}
                    <div className='mt-8 pt-6 border-t border-gray-100'>
                        <h3 className='text-sm font-medium text-gray-500 mb-3 flex items-center gap-2'>
                            <Briefcase className='h-4 w-4' />
                            Skills
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                            {user?.profile?.skills?.length > 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge 
                                        key={index}
                                        className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 px-3 py-1'
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className='text-gray-500 text-sm'>No skills added yet</span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className='mt-6 pt-6 border-t border-gray-100'>
                        <h3 className='text-sm font-medium text-gray-500 mb-3 flex items-center gap-2'>
                            <FileText className='h-4 w-4' />
                            Resume
                        </h3>
                        {isResume && user?.profile?.resume ? (
                            <a 
                                target='_blank' 
                                rel='noopener noreferrer'
                                href={user?.profile?.resume} 
                                className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors'
                            >
                                <FileText className='h-4 w-4' />
                                {user?.profile?.resumeOriginalName || 'View Resume'}
                                <ExternalLink className='h-3.5 w-3.5' />
                            </a>
                        ) : (
                            <span className='text-gray-500 text-sm'>No resume uploaded</span>
                        )}
                    </div>
                </div>

                {/* Applied Jobs */}
                <div className='mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                    <div className='p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-bold text-gray-900'>Applied Jobs</h2>
                        <p className='text-gray-500 text-sm mt-1'>Track your job applications</p>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>

            <div className='mt-16'>
                <Footer />
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile