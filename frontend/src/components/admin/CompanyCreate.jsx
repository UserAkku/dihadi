import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-xl mx-auto px-4 py-12'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-2'>Create Company</h1>
                    <p className='text-blue-100'>Enter your company name to get started</p>
                </div>
            </div>

            <div className='max-w-xl mx-auto px-4 py-8 -mt-6'>
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="e.g. Google, Microsoft"
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='h-12 rounded-xl border-gray-200 focus:border-blue-500'
                            />
                        </div>
                        <div className='flex items-center gap-3 pt-4'>
                            <Button variant="outline" onClick={() => navigate("/admin/companies")} className='rounded-xl'>
                                Cancel
                            </Button>
                            <Button onClick={registerNewCompany} className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl'>
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate