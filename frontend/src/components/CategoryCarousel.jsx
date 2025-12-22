import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Database, Palette, Layers, Server, Smartphone, BarChart3, PenTool } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code },
    { name: "Backend Developer", icon: Server },
    { name: "Full Stack Developer", icon: Layers },
    { name: "Data Science", icon: BarChart3 },
    { name: "Mobile Developer", icon: Smartphone },
    { name: "UI/UX Designer", icon: Palette },
    { name: "Graphic Designer", icon: PenTool },
    { name: "Database Admin", icon: Database },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='bg-gray-50 py-12 md:py-16'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* Header */}
                <div className='text-center mb-10'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
                        Browse by Category
                    </h2>
                    <p className='text-gray-500'>
                        Find your perfect role in popular categories
                    </p>
                </div>

                {/* Carousel */}
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <Button 
                                        onClick={() => searchJobHandler(category.name)} 
                                        variant="outline" 
                                        className="w-full h-auto py-6 px-4 rounded-2xl border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 flex flex-col items-center gap-3 group"
                                    >
                                        <div className='p-3 rounded-xl bg-gray-100 group-hover:bg-blue-100 transition-colors'>
                                            <IconComponent className='h-6 w-6 text-gray-600 group-hover:text-blue-600' />
                                        </div>
                                        <span className='font-medium text-sm text-center leading-tight'>
                                            {category.name}
                                        </span>
                                    </Button>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className='hidden md:flex -left-12 bg-white shadow-lg border-0 hover:bg-blue-50 hover:text-blue-600' />
                    <CarouselNext className='hidden md:flex -right-12 bg-white shadow-lg border-0 hover:bg-blue-50 hover:text-blue-600' />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel