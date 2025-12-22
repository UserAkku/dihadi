import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search } from 'lucide-react'
import Footer from '../shared/Footer'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      {/* Header */}
      <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
        <div className='max-w-6xl mx-auto px-4 py-12'>
          <h1 className='text-3xl md:text-4xl font-bold mb-2'>Posted Jobs</h1>
          <p className='text-blue-100'>Manage your job postings and applicants</p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Search & Actions */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
          <div className='relative w-full sm:w-auto'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              className="pl-10 h-11 w-full sm:w-80 rounded-xl border-gray-200 focus:border-blue-500"
              placeholder="Search jobs..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className='bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6'
          >
            <Plus className='h-4 w-4 mr-2' />
            Post New Job
          </Button>
        </div>

        {/* Table */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
          <AdminJobsTable />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminJobs