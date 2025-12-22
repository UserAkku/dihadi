import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-2xl mx-auto px-4 py-12'>
                    <div className='flex items-center gap-4'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" size="icon" className="rounded-xl bg-white/10 border-white/20 hover:bg-white/20 text-white">
                            <ArrowLeft className='h-4 w-4' />
                        </Button>
                        <div>
                            <h1 className='text-3xl font-bold'>Company Setup</h1>
                            <p className='text-blue-100 mt-1'>Update your company details</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='max-w-2xl mx-auto px-4 py-8 -mt-6'>
                <form onSubmit={submitHandler} className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className='h-11 rounded-lg border-gray-300'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className='h-11 rounded-lg border-gray-300'
                            />
                        </div>
                    </div>
                    
                    <div className='space-y-2'>
                        <Label className='text-gray-700'>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className='h-11 rounded-lg border-gray-300'
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <Label className='text-gray-700'>Website</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                            className='h-11 rounded-lg border-gray-300'
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <Label className='text-gray-700'>Logo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className='rounded-lg border-gray-300'
                        />
                    </div>
                    
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Updating...
                            </>
                        ) : (
                            'Update Company'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup