import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Shield, Clock } from 'lucide-react'
import { Button } from './ui/button'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />

      {/* How It Works - Simple 3 Steps */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-5xl mx-auto px-4'>
          <div className='text-center mb-14'>
            <h2 className='text-3xl font-bold text-gray-900 mb-3'>
              How Dhiadi Works
            </h2>
            <p className='text-gray-500'>
              Land your dream job in 3 simple steps
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl font-bold'>
                1
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Create Profile</h3>
              <p className='text-gray-500 text-sm'>Sign up and build your professional profile in minutes</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl font-bold'>
                2
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Search & Apply</h3>
              <p className='text-gray-500 text-sm'>Browse jobs and apply with a single click</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-2xl font-bold'>
                3
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Get Hired</h3>
              <p className='text-gray-500 text-sm'>Connect with recruiters and land your dream job</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean Grid */}
      <section className='py-20'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-14'>
            <h2 className='text-3xl font-bold text-gray-900 mb-3'>
              Why Job Seekers Love Dhiadi
            </h2>
            <p className='text-gray-500'>
              Everything you need to accelerate your career
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all'>
              <div className='w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4'>
                <Zap className='h-6 w-6 text-blue-600' />
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Quick Apply</h3>
              <p className='text-gray-500 text-sm'>Apply to multiple jobs with just one click</p>
            </div>
            <div className='p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all'>
              <div className='w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4'>
                <CheckCircle className='h-6 w-6 text-green-600' />
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Verified Jobs</h3>
              <p className='text-gray-500 text-sm'>All jobs are verified and from real companies</p>
            </div>
            <div className='p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all'>
              <div className='w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4'>
                <Shield className='h-6 w-6 text-purple-600' />
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Safe & Secure</h3>
              <p className='text-gray-500 text-sm'>Your data is protected with enterprise security</p>
            </div>
            <div className='p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all'>
              <div className='w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4'>
                <Clock className='h-6 w-6 text-orange-600' />
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Real-time Updates</h3>
              <p className='text-gray-500 text-sm'>Get notified instantly when recruiters respond</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Clean Numbers */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-5xl mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-1'>10K+</div>
              <div className='text-gray-500 text-sm'>Active Jobs</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-1'>500+</div>
              <div className='text-gray-500 text-sm'>Companies</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-1'>50K+</div>
              <div className='text-gray-500 text-sm'>Job Seekers</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-1'>95%</div>
              <div className='text-gray-500 text-sm'>Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Simple */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Ready to Find Your Dream Job?
          </h2>
          <p className='text-gray-500 mb-8 max-w-xl mx-auto'>
            Join thousands of professionals who found their perfect role through Dhiadi
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link to="/jobs">
              <Button size="lg" className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-8'>
                Browse All Jobs
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
            {!user && (
              <Link to="/signup">
                <Button size="lg" variant="outline" className='border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8'>
                  Create Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home