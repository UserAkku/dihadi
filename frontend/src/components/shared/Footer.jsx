import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className='flex items-center gap-2'>
              <div className='p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600'>
                <Briefcase className='h-5 w-5 text-white' />
              </div>
              <h1 className='text-xl font-bold text-white'>
                Dhiadi
              </h1>
            </Link>
            <p className='text-gray-400 leading-relaxed'>
              Find your dream job with us. We connect talented individuals with top companies worldwide.
            </p>
            <div className='flex items-center gap-4'>
              <a href="https://facebook.com" className="p-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition-colors duration-200">
                <Facebook className='h-5 w-5' />
              </a>
              <a href="https://twitter.com" className="p-2 rounded-lg bg-gray-800 hover:bg-sky-500 transition-colors duration-200">
                <Twitter className='h-5 w-5' />
              </a>
              <a href="https://linkedin.com" className="p-2 rounded-lg bg-gray-800 hover:bg-blue-700 transition-colors duration-200">
                <Linkedin className='h-5 w-5' />
              </a>
              <a href="https://instagram.com" className="p-2 rounded-lg bg-gray-800 hover:bg-pink-600 transition-colors duration-200">
                <Instagram className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold text-lg mb-6'>Quick Links</h3>
            <ul className='space-y-4'>
              <li>
                <Link to="/jobs" className='hover:text-blue-400 transition-colors duration-200'>Browse Jobs</Link>
              </li>
              <li>
                <Link to="/browse" className='hover:text-blue-400 transition-colors duration-200'>Companies</Link>
              </li>
              <li>
                <Link to="/profile" className='hover:text-blue-400 transition-colors duration-200'>My Profile</Link>
              </li>
              <li>
                <Link to="/login" className='hover:text-blue-400 transition-colors duration-200'>Login</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-white font-semibold text-lg mb-6'>Resources</h3>
            <ul className='space-y-4'>
              <li>
                <a href="#" className='hover:text-blue-400 transition-colors duration-200'>Career Advice</a>
              </li>
              <li>
                <a href="#" className='hover:text-blue-400 transition-colors duration-200'>Resume Tips</a>
              </li>
              <li>
                <a href="#" className='hover:text-blue-400 transition-colors duration-200'>Interview Guide</a>
              </li>
              <li>
                <a href="#" className='hover:text-blue-400 transition-colors duration-200'>Salary Calculator</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='text-white font-semibold text-lg mb-6'>Contact Us</h3>
            <ul className='space-y-4'>
              <li className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-blue-400' />
                <span>123 Business Street, Mumbai</span>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-blue-400' />
                <span>contact@dhiadi.com</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-blue-400' />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-gray-500 text-sm'>
            © {new Date().getFullYear()} JobHunt. All rights reserved.
          </p>
          <div className='flex items-center gap-6 text-sm'>
            <a href="#" className='text-gray-500 hover:text-blue-400 transition-colors'>Privacy Policy</a>
            <a href="#" className='text-gray-500 hover:text-blue-400 transition-colors'>Terms of Service</a>
            <a href="#" className='text-gray-500 hover:text-blue-400 transition-colors'>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;