import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  ChevronLeft, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  GraduationCap,
  Check,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Application {
  id: string;
  user_id: string;
  course_id: string;
  title: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  name_changed: boolean;
  gender: string;
  date_of_birth: string;
  email: string;
  mobile: string;
  high_school_qualification: string | null;
  high_school_name: string | null;
  high_school_country: string | null;
  high_school_completed: boolean | null;
  high_school_year_completed: number | null;
  high_school_language: string | null;
  tertiary_qualification: string | null;
  tertiary_institution: string | null;
  tertiary_country: string | null;
  in_australia: boolean;
  street_address: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  postal_address_different: boolean;
  postal_street_address: string | null;
  postal_address_line_2: string | null;
  postal_city: string | null;
  postal_state: string | null;
  postal_postal_code: string | null;
  postal_country: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    full_name: string;
    avatar_url: string | null;
  };
  course: {
    title: string;
    level: string;
    price: number;
  };
}

export default function ApplicationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (!id) return;

    async function fetchApplication() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('course_applications')
          .select(`
            *,
            user:user_id(full_name, avatar_url),
            course:course_id(title, level, price)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setApplication(data);
      } catch (error) {
        console.error('Error fetching application:', error);
        setError('Failed to load application details');
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  const handleApprove = async () => {
    if (!application) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      setProcessing(true);
      // Check if user has enough tokens
      const { data: walletData, error: walletError } = await supabase
        .from('user_wallets')
        .select('tokens')
        .eq('user_id', application.user_id)
        .single();
        
      if (walletError) throw walletError;
      
      if (walletData.tokens < application.course.price) {
        throw new Error(`User does not have enough tokens for this course. Has: ${walletData.tokens}, Needs: ${application.course.price}`);
      }      

      // Update application status
      const { error: applicationError } = await supabase
        .from('course_applications')
        .update({ status: 'approved' })
        .eq('id', application.id);

      if (applicationError) throw applicationError;

      // Deduct tokens from user's wallet
      const { error: walletUpdateError } = await supabase
        .from('user_wallets')
        .update({ tokens: walletData.tokens - application.course.price })
        .eq('user_id', application.user_id);

      if (walletUpdateError) throw walletUpdateError;

      // Fetch the created enrollment to confirm it worked
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('application_id', application.id)
        .maybeSingle();

      if (enrollmentError) {
        console.error('Error fetching enrollment:', enrollmentError);
        throw new Error('Failed to verify enrollment creation');
      }
      
      if (!enrollmentData) {
        console.warn('No enrollment found after application approval');
        throw new Error('Enrollment was not created after application approval');
      }

      setSuccess('Application approved and enrollment confirmed');

      // Refresh application data
      const { data: updatedData, error: refreshError } = await supabase
        .from('course_applications')
        .select(`
          *,
          user:user_id(full_name, avatar_url),
          course:course_id(title, level, price)
        `)
        .eq('id', id)
        .single();

      if (!refreshError) {
        setApplication(updatedData);
      }

      setTimeout(() => {
        navigate('/admin/crm');
      }, 2000);
    } catch (error: any) {
      console.error('Error approving application:', error);
      setError(error.message || 'Failed to approve application');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!application) return;
    
    try {
      setProcessing(true);
      setError(null);
      
      // Update application status
      const { error: applicationError } = await supabase
        .from('course_applications')
        .update({ status: 'rejected' })
        .eq('id', application.id);
        
      if (applicationError) throw applicationError;
      
      setSuccess('Application rejected');
      
      // Refresh application data
      const { data: updatedData, error: refreshError } = await supabase
        .from('course_applications')
        .select(`
          *,
          user:user_id(full_name, avatar_url),
          course:course_id(title, level, price)
        `)
        .eq('id', id)
        .single();
        
      if (!refreshError) {
        setApplication(updatedData);
      }
      
      setTimeout(() => {
        navigate('/admin/crm');
      }, 2000);
    } catch (error: any) {
      console.error('Error rejecting application:', error);
      setError(error.message || 'Failed to reject application');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application not found</h2>
        <p className="text-gray-600 mb-4">The application you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link
          to="/admin/crm"
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to CRM
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded shadow-lg animate-fade-in">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-lg animate-fade-in">
            <div className="flex">
              <Check className="h-5 w-5 text-green-400" />
              <p className="ml-3 text-green-700">{success}</p>
            </div>
          </div>
        )}
      </div>

      <Link
        to="/admin/crm"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to CRM
      </Link>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
              <p className="text-gray-600">
                Submitted on {new Date(application.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className={`
                px-3 py-1 text-sm rounded-full
                ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${application.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Course Information</h2>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{application.course.title}</h3>
                <span className={`
                  inline-block mt-1 px-2 py-1 text-xs rounded-full
                  ${application.course.level === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                  ${application.course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${application.course.level === 'advanced' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {application.course.level}
                </span>
              </div>
              <div className="text-lg font-semibold">
                {application.course.price} tokens
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Personal Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{application.title} {application.first_name} {application.middle_name || ''} {application.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name Changed</p>
              <p className="font-medium">{application.name_changed ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{application.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{new Date(application.date_of_birth).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-500" />
              Contact Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{application.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-medium">{application.mobile}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <School className="w-5 h-5 mr-2 text-blue-500" />
              High School Education
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Qualification</p>
              <p className="font-medium">{application.high_school_qualification || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">School Name</p>
              <p className="font-medium">{application.high_school_name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country/State</p>
              <p className="font-medium">{application.high_school_country || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="font-medium">{application.high_school_completed !== null ? (application.high_school_completed ? 'Yes' : 'No') : 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year Completed</p>
              <p className="font-medium">{application.high_school_year_completed || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Language of Instruction</p>
              <p className="font-medium">{application.high_school_language || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
              Tertiary Education
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Qualification</p>
              <p className="font-medium">{application.tertiary_qualification || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Institution</p>
              <p className="font-medium">{application.tertiary_institution || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country/State</p>
              <p className="font-medium">{application.tertiary_country || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              Location & Address
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Currently in Australia</p>
              <p className="font-medium">{application.in_australia ? 'Yes' : 'No'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 font-medium">Australian Address</p>
              <p className="font-medium">
                {application.street_address || 'Not provided'}
                {application.address_line_2 && <span>, {application.address_line_2}</span>}
                {application.city && <span>, {application.city}</span>}
                {application.state && <span>, {application.state}</span>}
                {application.postal_code && <span> {application.postal_code}</span>}
                {application.country && <span>, {application.country}</span>}
              </p>
            </div>
            
            {application.postal_address_different && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 font-medium">Postal Address</p>
                <p className="font-medium">
                  {application.postal_street_address || 'Not provided'}
                  {application.postal_address_line_2 && <span>, {application.postal_address_line_2}</span>}
                  {application.postal_city && <span>, {application.postal_city}</span>}
                  {application.postal_state && <span>, {application.postal_state}</span>}
                  {application.postal_postal_code && <span> {application.postal_postal_code}</span>}
                  {application.postal_country && <span>, {application.postal_country}</span>}
                </p>
              </div>
            )}
          </div>
        </div>

        {application.status === 'pending' && (
          <div className="p-6 flex justify-end space-x-4">
            <button
              onClick={handleReject}
              disabled={processing}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <X className="w-4 h-4 mr-2 inline" />
                  Reject Application
                </>
              )}
            </button>
            <button
              onClick={handleApprove}
              disabled={processing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2 inline" />
                  Approve & Enroll
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}