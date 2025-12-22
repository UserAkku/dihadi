import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Briefcase, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const CompanyJobs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
    const { allAdminJobs } = useSelector(store => store.job);
    
    useGetAllAdminJobs();
    useGetAllCompanies();
    
    const [company, setCompany] = useState(null);
    const [companyJobs, setCompanyJobs] = useState([]);

    useEffect(() => {
        // Find company
        const foundCompany = companies.find(c => c._id === id);
        setCompany(foundCompany);

        // Filter jobs for this company
        const jobs = allAdminJobs.filter(job => job?.company?._id === id);
        setCompanyJobs(jobs);
    }, [id, companies, allAdminJobs]);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className='flex items-center gap-4 mb-8'>
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate('/admin/companies')}
                        className="rounded-xl"
                    >
                        <ArrowLeft className='h-5 w-5' />
                    </Button>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900'>
                            {company?.name || 'Company'} - Jobs
                        </h1>
                        <p className='text-gray-500'>Manage jobs for this company</p>
                    </div>
                </div>

                {/* Jobs Table */}
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    {companyJobs.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-16'>
                            <Briefcase className='h-16 w-16 text-gray-300 mb-4' />
                            <h3 className='text-lg font-medium text-gray-600 mb-2'>No Jobs Posted</h3>
                            <p className='text-gray-400 mb-6'>Create your first job for this company</p>
                            <Button 
                                onClick={() => navigate('/admin/jobs/create')}
                                className='bg-gradient-to-r from-blue-600 to-indigo-600'
                            >
                                Post a Job
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableCaption>Jobs posted for {company?.name}</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Positions</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companyJobs.map((job) => (
                                    <TableRow 
                                        key={job._id} 
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                    >
                                        <TableCell className="font-medium">{job?.title}</TableCell>
                                        <TableCell>{job?.jobType}</TableCell>
                                        <TableCell>{job?.position}</TableCell>
                                        <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                            <div className='flex items-center justify-end gap-2'>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="rounded-lg"
                                                >
                                                    <Users className='h-4 w-4 mr-1' />
                                                    Applicants
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompanyJobs
