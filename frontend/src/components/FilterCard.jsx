import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, IndianRupee, Filter, X } from 'lucide-react'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"]
    },
    {
        filterType: "Industry",
        icon: Briefcase,
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer"]
    },
    {
        filterType: "Salary",
        icon: IndianRupee,
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-20 LPA", "20+ LPA"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    const clearFilter = () => {
        setSelectedValue('');
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            {/* Header */}
            <div className='p-5 border-b border-gray-100 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Filter className='h-5 w-5 text-blue-600' />
                    <h2 className='font-semibold text-gray-900'>Filter Jobs</h2>
                </div>
                {selectedValue && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilter}
                        className='text-gray-500 hover:text-red-600 h-8 px-2'
                    >
                        <X className='h-4 w-4 mr-1' />
                        Clear
                    </Button>
                )}
            </div>

            {/* Filters */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className='p-5 space-y-6'>
                {filterData.map((data, index) => {
                    const IconComponent = data.icon;
                    return (
                        <div key={index} className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <IconComponent className='h-4 w-4 text-gray-400' />
                                <h3 className='font-medium text-gray-700 text-sm'>{data.filterType}</h3>
                            </div>
                            <div className='space-y-2 pl-6'>
                                {data.array.map((item, idx) => {
                                    const itemId = `filter-${index}-${idx}`;
                                    return (
                                        <div 
                                            key={itemId}
                                            className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                                        >
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId}
                                                className='text-blue-600 border-gray-300'
                                            />
                                            <Label 
                                                htmlFor={itemId}
                                                className='text-gray-600 text-sm cursor-pointer flex-1'
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </RadioGroup>
        </div>
    )
}

export default FilterCard