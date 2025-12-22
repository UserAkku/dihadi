import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { FileX, CheckCircle2, Clock, XCircle } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return (
                    <Badge className='bg-green-50 text-green-700 hover:bg-green-100 border-0 font-medium'>
                        <CheckCircle2 className='h-3.5 w-3.5 mr-1' />
                        Accepted
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge className='bg-red-50 text-red-700 hover:bg-red-100 border-0 font-medium'>
                        <XCircle className='h-3.5 w-3.5 mr-1' />
                        Rejected
                    </Badge>
                );
            default:
                return (
                    <Badge className='bg-amber-50 text-amber-700 hover:bg-amber-100 border-0 font-medium'>
                        <Clock className='h-3.5 w-3.5 mr-1' />
                        Pending
                    </Badge>
                );
        }
    };

    if (allAppliedJobs.length <= 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16 px-4'>
                <div className='p-4 rounded-2xl bg-gray-100 mb-4'>
                    <FileX className='h-8 w-8 text-gray-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>No Applications Yet</h3>
                <p className='text-gray-500 text-center max-w-sm'>
                    You have not applied to any jobs yet. Start exploring opportunities!
                </p>
            </div>
        );
    }

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-gray-50 hover:bg-gray-50'>
                        <TableHead className='font-semibold text-gray-700'>Date</TableHead>
                        <TableHead className='font-semibold text-gray-700'>Job Role</TableHead>
                        <TableHead className='font-semibold text-gray-700'>Company</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id} className='hover:bg-gray-50'>
                            <TableCell className='text-gray-600'>
                                {appliedJob?.createdAt?.split("T")[0]}
                            </TableCell>
                            <TableCell className='font-medium text-gray-900'>
                                {appliedJob.job?.title}
                            </TableCell>
                            <TableCell className='text-gray-600'>
                                {appliedJob.job?.company?.name}
                            </TableCell>
                            <TableCell className="text-right">
                                {getStatusBadge(appliedJob.status)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable