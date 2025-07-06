import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Inbox, AlertCircle, Search, Mail, Phone, User, Clock } from 'lucide-react';

type Submission = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  inquiry: string;
  status: 'new' | 'read' | 'archived';
  notes: string | null;
  created_at: string;
};

const statusStyles = {
  new: { bg: 'bg-blue-100', text: 'text-blue-800' },
  read: { bg: 'bg-green-100', text: 'text-green-800' },
  archived: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        console.error("Error fetching submissions:", error);
      } else {
        setSubmissions(data as Submission[]);
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Submission['status']) => {
    const originalSubmissions = [...submissions];
    const updatedSubmissions = submissions.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    );
    setSubmissions(updatedSubmissions);

    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error("Failed to update status:", error);
      setError('Failed to update status. Please try again.');
      setSubmissions(originalSubmissions); // Revert on failure
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission =>
      submission.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.inquiry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [submissions, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-lg text-gray-600">Loading Submissions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              An error occurred: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and respond to user inquiries. Found {filteredSubmissions.length} submissions.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <Inbox className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Submissions Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try adjusting your search." : "There are no contact submissions yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiry</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <div className="text-sm font-medium text-gray-900">{submission.full_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{submission.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{submission.phone || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate" title={submission.inquiry}>
                      {submission.inquiry}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {new Date(submission.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => handleStatusChange(submission.id, e.target.value as Submission['status'])}
                      className={`
                        ${statusStyles[submission.status].bg} 
                        ${statusStyles[submission.status].text} 
                        text-xs font-medium py-1 pl-2 pr-7 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                      `}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.25em 1.25em',
                        appearance: 'none',
                      }}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
