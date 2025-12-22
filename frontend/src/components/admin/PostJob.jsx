import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-3xl mx-auto px-4 py-12'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-2'>Post a New Job</h1>
                    <p className='text-blue-100'>Fill in the details to create a job listing</p>
                </div>
            </div>
            
            <div className='max-w-3xl mx-auto px-4 py-8 -mt-6'>
                <form onSubmit={submitHandler} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder='e.g. Frontend Developer'
                                className="h-11 rounded-lg border-gray-300"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder='e.g. Bangalore, Remote'
                                className="h-11 rounded-lg border-gray-300"
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
                            placeholder='Brief job description'
                            className="h-11 rounded-lg border-gray-300"
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <Label className='text-gray-700'>Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={changeEventHandler}
                            placeholder='e.g. React, Node.js, 2+ years experience'
                            className="h-11 rounded-lg border-gray-300"
                        />
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Salary (LPA)</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder='e.g. 8-12'
                                className="h-11 rounded-lg border-gray-300"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder='e.g. Full-time'
                                className="h-11 rounded-lg border-gray-300"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder='e.g. 2-4 years'
                                className="h-11 rounded-lg border-gray-300"
                            />
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label className='text-gray-700'>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="h-11 rounded-lg border-gray-300"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div className='space-y-2'>
                                <Label className='text-gray-700'>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="h-11 rounded-lg border-gray-300">
                                        <SelectValue placeholder="Choose a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    
                    {companies.length === 0 && (
                        <p className='text-sm text-red-600 bg-red-50 p-3 rounded-lg'>
                            Please register a company first before posting jobs
                        </p>
                    )}
                    
                    <Button 
                        type="submit" 
                        disabled={loading || companies.length === 0}
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Posting...
                            </>
                        ) : (
                            'Post Job'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default PostJob