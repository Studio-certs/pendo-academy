import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Platform</h3>
            <p className="text-gray-600 mb-4">
              Empowering learners worldwide with quality education and community support.
            </p>
            <div className="flex space-x-4">
              <a href="https://m.facebook.com/pendoacademy/" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/pendoacademy?igsh=aXMwb2ZkcW03a29k" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/pendo-academy/" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-blue-600">Courses</Link>
              </li>
              <li>
                <Link to="/meetups" className="text-gray-600 hover:text-blue-600">Meetups</Link>
              </li>
              <li>
                <Link to="/my-learning" className="text-gray-600 hover:text-blue-600">My Learning</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-and-conditions" className="text-gray-600 hover:text-blue-600">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-600">123 Learning Street, Education City, 2000</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy;  Pendo Health Australia. All Rights Reserved 
          </p>
        </div>
      </div>
    </footer>
  );
}
