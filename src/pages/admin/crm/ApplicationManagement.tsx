import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, Clock, FileText, AlertCircle, Filter, ChevronDown, Check, X, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import UserAvatar from '../../../components/UserAvatar';

interface Application {
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
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const statusStyles = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  approved: { bg: 'bg-green-100', text: 'text-green-800' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800' },
};

export default function ApplicationManagement() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'course' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchApplications();
  }, [activeTab]);

  async function fetchApplications() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('course_applications')
        .select(`
          id,
          first_name,
          last_name,
          email,
          mobile,
          status,
          created_at,
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
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

  const filteredApplications = applications
    .filter(application => {
      const matchesSearch = 
        application.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${application.first_name} ${application.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase());
      
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
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Applications</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage student applications for courses
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
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
              Pending Applications
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved Applications
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rejected'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rejected Applications
            </button>
          </nav>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading applications...</span>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Applications Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search." : `There are no ${activeTab} applications at the moment.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Applicant
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
                      Submitted
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserAvatar
                          src={application.user.avatar_url}
                          alt={application.user.full_name}
                          size="sm"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.user.full_name}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.course.title}</div>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${application.course.level === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                        ${application.course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${application.course.level === 'advanced' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {application.course.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {format(new Date(application.created_at), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${statusStyles[application.status].bg} 
                        ${statusStyles[application.status].text}
                      `}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/admin/applications/${application.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
                    </td>
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