import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Check, Search, Clock, BookOpen, AlertCircle, Filter, ChevronDown, X } from 'lucide-react';
import { format } from 'date-fns';
import UserAvatar from '../../../components/UserAvatar';

interface Enrollment {
  id: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    email: string;
  };
  course: {
    id: string;
    title: string;
    level: string;
  };
  progress: number;
  enrolled_at: string;
  status: 'pending' | 'confirmed';
}

export default function CourseEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed'>('pending');
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'course' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchEnrollments();
  }, [activeTab]);

  async function fetchEnrollments() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
          id,
          progress,
          enrolled_at,
          status,
          user:user_id (
            id,
            full_name,
            avatar_url,
            email
          ),
          course:course_id (
            id,
            title,
            level
          )
        `)
        .eq('status', activeTab)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setError('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  }

  async function confirmEnrollment(enrollmentId: string) {
    try {
      setUpdating(enrollmentId);
      setError(null);
      
      const { error } = await supabase
        .from('course_enrollments')
        .update({ status: 'confirmed' })
        .eq('id', enrollmentId);

      if (error) throw error;
      
      // Update local state
      setEnrollments(enrollments.filter(e => e.id !== enrollmentId));
      setSuccess('Enrollment confirmed successfully');
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error confirming enrollment:', error);
      setError('Failed to confirm enrollment');
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setUpdating(null);
    }
  }

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredEnrollments = enrollments
    .filter(enrollment => {
      const matchesSearch = 
        enrollment.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.user.full_name.localeCompare(b.user.full_name)
          : b.user.full_name.localeCompare(a.user.full_name);
      }
      if (sortField === 'course') {
        return sortOrder === 'asc'
          ? a.course.title.localeCompare(b.course.title)
          : b.course.title.localeCompare(a.course.title);
      }
      if (sortField === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.enrolled_at).getTime() - new Date(b.enrolled_at).getTime()
          : new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime();
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Enrollments</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage student enrollments in courses
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search enrollments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Enrollments
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'confirmed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Confirmed Enrollments
            </button>
          </nav>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 rounded-md flex items-center text-green-700">
            <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading enrollments...</span>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No {activeTab} enrollments</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'pending' 
                ? "There are no pending course enrollments at the moment."
                : "There are no confirmed course enrollments matching your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Student
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('course')}
                  >
                    <div className="flex items-center">
                      Course
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Enrolled Date
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {activeTab === 'pending' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserAvatar
                          src={enrollment.user.avatar_url}
                          alt={enrollment.user.full_name}
                          size="sm"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{enrollment.user.full_name}</div>
                          <div className="text-sm text-gray-500">{enrollment.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{enrollment.course.title}</div>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${enrollment.course.level === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                        ${enrollment.course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${enrollment.course.level === 'advanced' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {enrollment.course.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {format(new Date(enrollment.enrolled_at), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                      `}>
                        {enrollment.status === 'pending' ? 'Pending' : 'Confirmed'}
                      </span>
                    </td>
                    {activeTab === 'pending' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => confirmEnrollment(enrollment.id)}
                          disabled={updating === enrollment.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {updating === enrollment.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Confirm
                            </>
                          )}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}