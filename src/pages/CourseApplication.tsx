import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { 
  ChevronLeft, 
  AlertCircle, 
  Check, 
  Loader2, 
  BookOpen,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  School,
  GraduationCap
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  thumbnail_url: string;
}

export default function CourseApplication() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [existingApplication, setExistingApplication] = useState<any | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    nameChanged: false,
    gender: 'Male',
    dateOfBirth: '',
    email: '',
    mobile: '',
    highSchoolQualification: '',
    highSchoolName: '',
    highSchoolCountry: '',
    highSchoolCompleted: true,
    highSchoolYearCompleted: '',
    highSchoolLanguage: '',
    tertiaryQualification: '',
    tertiaryInstitution: '',
    tertiaryCountry: '',
    inAustralia: true,
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Australia',
    postalAddressDifferent: false,
    postalStreetAddress: '',
    postalAddressLine2: '',
    postalCity: '',
    postalState: '',
    postalPostalCode: '',
    postalCountry: 'Australia'
  });

  useEffect(() => {
    if (!user || !courseId) {
      navigate('/login');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch course details
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('id, title, description, level, thumbnail_url')
          .eq('id', courseId)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData);

        // Check if user already has an application for this course
        const { data: applicationData, error: applicationError } = await supabase
          .from('course_applications')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .maybeSingle();

        if (applicationError) throw applicationError;
        
        if (applicationData) {
          setExistingApplication(applicationData);
          // Populate form with existing data
          setFormData({
            title: applicationData.title || 'Mr.',
            firstName: applicationData.first_name || '',
            middleName: applicationData.middle_name || '',
            lastName: applicationData.last_name || '',
            nameChanged: applicationData.name_changed || false,
            gender: applicationData.gender || 'Male',
            dateOfBirth: applicationData.date_of_birth ? new Date(applicationData.date_of_birth).toISOString().split('T')[0] : '',
            email: applicationData.email || '',
            mobile: applicationData.mobile || '',
            highSchoolQualification: applicationData.high_school_qualification || '',
            highSchoolName: applicationData.high_school_name || '',
            highSchoolCountry: applicationData.high_school_country || '',
            highSchoolCompleted: applicationData.high_school_completed || true,
            highSchoolYearCompleted: applicationData.high_school_year_completed?.toString() || '',
            highSchoolLanguage: applicationData.high_school_language || '',
            tertiaryQualification: applicationData.tertiary_qualification || '',
            tertiaryInstitution: applicationData.tertiary_institution || '',
            tertiaryCountry: applicationData.tertiary_country || '',
            inAustralia: applicationData.in_australia || true,
            streetAddress: applicationData.street_address || '',
            addressLine2: applicationData.address_line_2 || '',
            city: applicationData.city || '',
            state: applicationData.state || '',
            postalCode: applicationData.postal_code || '',
            country: applicationData.country || 'Australia',
            postalAddressDifferent: applicationData.postal_address_different || false,
            postalStreetAddress: applicationData.postal_street_address || '',
            postalAddressLine2: applicationData.postal_address_line_2 || '',
            postalCity: applicationData.postal_city || '',
            postalState: applicationData.postal_state || '',
            postalPostalCode: applicationData.postal_postal_code || '',
            postalCountry: applicationData.postal_country || 'Australia'
          });
        } else {
          // Pre-fill email from user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', user.id)
            .single();

          if (profileData) {
            // Split full name into parts if available
            let firstName = '', lastName = '';
            if (profileData.full_name) {
              const nameParts = profileData.full_name.split(' ');
              if (nameParts.length > 0) {
                firstName = nameParts[0];
                if (nameParts.length > 1) {
                  lastName = nameParts[nameParts.length - 1];
                }
              }
            }

            setFormData(prev => ({
              ...prev,
              email: profileData.email || '',
              firstName,
              lastName
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load course information');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, courseId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !courseId) return;
    
    try {
      setSubmitting(true);
      setError(null);
      
      const applicationData = {
        user_id: user.id,
        course_id: courseId,
        title: formData.title,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        name_changed: formData.nameChanged,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        email: formData.email,
        mobile: formData.mobile,
        high_school_qualification: formData.highSchoolQualification,
        high_school_name: formData.highSchoolName,
        high_school_country: formData.highSchoolCountry,
        high_school_completed: formData.highSchoolCompleted,
        high_school_year_completed: formData.highSchoolYearCompleted ? parseInt(formData.highSchoolYearCompleted) : null,
        high_school_language: formData.highSchoolLanguage,
        tertiary_qualification: formData.tertiaryQualification,
        tertiary_institution: formData.tertiaryInstitution,
        tertiary_country: formData.tertiaryCountry,
        in_australia: formData.inAustralia,
        street_address: formData.streetAddress,
        address_line_2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        country: formData.country,
        postal_address_different: formData.postalAddressDifferent,
        postal_street_address: formData.postalAddressDifferent ? formData.postalStreetAddress : null,
        postal_address_line_2: formData.postalAddressDifferent ? formData.postalAddressLine2 : null,
        postal_city: formData.postalAddressDifferent ? formData.postalCity : null,
        postal_state: formData.postalAddressDifferent ? formData.postalState : null,
        postal_postal_code: formData.postalAddressDifferent ? formData.postalPostalCode : null,
        postal_country: formData.postalAddressDifferent ? formData.postalCountry : null,
        status: 'pending',
        updated_at: new Date().toISOString()
      };

      if (existingApplication) {
        // Update existing application
        const { error } = await supabase
          .from('course_applications')
          .update(applicationData)
          .eq('id', existingApplication.id);

        if (error) throw error;
        setSuccess('Application updated successfully!');
      } else {
        // Create new application
        const { error } = await supabase
          .from('course_applications')
          .insert(applicationData);

        if (error) throw error;
        setSuccess('Application submitted successfully!');
      }

      // Redirect to course details after a short delay
      setTimeout(() => {
        navigate(`/courses/${courseId}`);
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      setError(error.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to={`/courses/${courseId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Course
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Form</h1>
              <p className="text-gray-600">{course.title}</p>
              <div className="mt-1">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${course.level === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                  ${course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${course.level === 'advanced' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {course.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Personal Information
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                <div className="sm:col-span-1">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Have you ever changed your name?</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="nameChangedYes"
                        name="nameChanged"
                        type="radio"
                        checked={formData.nameChanged === true}
                        onChange={() => setFormData(prev => ({ ...prev, nameChanged: true }))}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="nameChangedYes" className="ml-2 block text-sm text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="nameChangedNo"
                        name="nameChanged"
                        type="radio"
                        checked={formData.nameChanged === false}
                        onChange={() => setFormData(prev => ({ ...prev, nameChanged: false }))}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="nameChangedNo" className="ml-2 block text-sm text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="genderMale"
                        name="gender"
                        type="radio"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="genderMale" className="ml-2 block text-sm text-gray-700">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="genderFemale"
                        name="gender"
                        type="radio"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="genderFemale" className="ml-2 block text-sm text-gray-700">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="genderOther"
                        name="gender"
                        type="radio"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="genderOther" className="ml-2 block text-sm text-gray-700">
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <div className="mt-1 flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                Contact Information
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="mt-1 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <School className="w-5 h-5 mr-2 text-blue-500" />
                High School Education
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                <div className="sm:col-span-3">
                  <label htmlFor="highSchoolQualification" className="block text-sm font-medium text-gray-700">Name of Qualification</label>
                  <input
                    type="text"
                    id="highSchoolQualification"
                    name="highSchoolQualification"
                    value={formData.highSchoolQualification}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="highSchoolName" className="block text-sm font-medium text-gray-700">Name of School</label>
                  <input
                    type="text"
                    id="highSchoolName"
                    name="highSchoolName"
                    value={formData.highSchoolName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="highSchoolCountry" className="block text-sm font-medium text-gray-700">Country/State</label>
                  <input
                    type="text"
                    id="highSchoolCountry"
                    name="highSchoolCountry"
                    value={formData.highSchoolCountry}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Completed</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="highSchoolCompletedYes"
                        name="highSchoolCompleted"
                        type="radio"
                        checked={formData.highSchoolCompleted === true}
                        onChange={() => setFormData(prev => ({ ...prev, highSchoolCompleted: true }))}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="highSchoolCompletedYes" className="ml-2 block text-sm text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="highSchoolCompletedNo"
                        name="highSchoolCompleted"
                        type="radio"
                        checked={formData.highSchoolCompleted === false}
                        onChange={() => setFormData(prev => ({ ...prev, highSchoolCompleted: false }))}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="highSchoolCompletedNo" className="ml-2 block text-sm text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="highSchoolYearCompleted" className="block text-sm font-medium text-gray-700">Year Completed</label>
                  <input
                    type="number"
                    id="highSchoolYearCompleted"
                    name="highSchoolYearCompleted"
                    value={formData.highSchoolYearCompleted}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="highSchoolLanguage" className="block text-sm font-medium text-gray-700">Language of Instruction</label>
                  <input
                    type="text"
                    id="highSchoolLanguage"
                    name="highSchoolLanguage"
                    value={formData.highSchoolLanguage}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Tertiary Education */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
                Post-High School/Tertiary Education
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                <div className="sm:col-span-3">
                  <label htmlFor="tertiaryQualification" className="block text-sm font-medium text-gray-700">Name of Qualification</label>
                  <input
                    type="text"
                    id="tertiaryQualification"
                    name="tertiaryQualification"
                    value={formData.tertiaryQualification}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="tertiaryInstitution" className="block text-sm font-medium text-gray-700">Name of Institution</label>
                  <input
                    type="text"
                    id="tertiaryInstitution"
                    name="tertiaryInstitution"
                    value={formData.tertiaryInstitution}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="tertiaryCountry" className="block text-sm font-medium text-gray-700">Country/State</label>
                  <input
                    type="text"
                    id="tertiaryCountry"
                    name="tertiaryCountry"
                    value={formData.tertiaryCountry}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                Location & Address
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Are you currently in Australia?</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="inAustraliaYes"
                        name="inAustralia"
                        type="radio"
                        checked={formData.inAustralia === true}
                        onChange={() => setFormData(prev => ({ ...prev, inAustralia: true }))}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="inAustraliaYes" className="ml-2 block text-sm text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="inAustraliaNo"
                        name="inAustralia"
                        type="radio"
                        checked={formData.inAustralia === false}
                        onChange={() => setFormData(prev => ({ ...prev, inAustralia: false }))}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="inAustraliaNo" className="ml-2 block text-sm text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {formData.inAustralia ? (
                  <>
                    <div className="sm:col-span-6">
                      <h3 className="text-sm font-medium text-gray-700">Australian Address</h3>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                      <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                      <input
                        type="text"
                        id="addressLine2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                ) : null}

                {formData.inAustralia && (
                  <div className="sm:col-span-6">
                  <div className="flex items-center">
                    <input
                      id="postalAddressDifferent"
                      name="postalAddressDifferent"
                      type="checkbox"
                      checked={!formData.postalAddressDifferent}
                      onChange={(e) => setFormData(prev => ({ ...prev, postalAddressDifferent: !e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="postalAddressDifferent" className="ml-2 block text-sm text-gray-700">
                      Postal address is not same as Australian address
                    </label>
                  </div>
                  </div>
                )}

                {formData.inAustralia && !formData.postalAddressDifferent && (
                  <>
                    <div className="sm:col-span-6">
                      <h3 className="text-sm font-medium text-gray-700">Postal Address</h3>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="postalStreetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                      <input
                        type="text"
                        id="postalStreetAddress"
                        name="postalStreetAddress"
                        value={formData.postalStreetAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="postalAddressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                      <input
                        type="text"
                        id="postalAddressLine2"
                        name="postalAddressLine2"
                        value={formData.postalAddressLine2}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalCity" className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        id="postalCity"
                        name="postalCity"
                        value={formData.postalCity}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalState" className="block text-sm font-medium text-gray-700">State/Province</label>
                      <input
                        type="text"
                        id="postalState"
                        name="postalState"
                        value={formData.postalState}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalPostalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        type="text"
                        id="postalPostalCode"
                        name="postalPostalCode"
                        value={formData.postalPostalCode}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postalCountry" className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        id="postalCountry"
                        name="postalCountry"
                        value={formData.postalCountry}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-5">
              <div className="flex justify-end">
                <Link
                  to={`/courses/${courseId}`}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : existingApplication ? (
                    'Update Application'
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}