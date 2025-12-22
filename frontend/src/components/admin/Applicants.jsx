import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id]);
    
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <div className='max-w-6xl mx-auto px-4 py-12'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                        Applicants ({applicants?.applications?.length || 0})
                    </h1>
                    <p className='text-blue-100'>Review and manage job applications</p>
                </div>
            </div>
            
            <div className='max-w-6xl mx-auto px-4 py-8'>
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants