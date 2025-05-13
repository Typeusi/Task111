import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { fetchRecords, deleteRecord } from '../../api/apiService';
import { Record } from '../../types/Record';

const RecordList = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'title' | 'body'>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await fetchRecords();
        setRecords(data);
        setError(null);
      } catch (err) {
        setError('Failed to load records. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecords();
  }, []);

  const handleUpdateClick = (id: string) => {
    navigate(`/record/${id}`);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setDeletingId(id);
      try {
        const success = await deleteRecord(id);
        if (success) {
          setRecords(records.filter(record => record.id !== id));
        } else {
          setError('Failed to delete the record.');
        }
      } catch (err) {
        setError('An error occurred while deleting the record.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSort = (field: 'title' | 'body') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();
    
    return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2Icon className="h-8 w-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 animate-fade-in">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-red-600 hover:text-red-800 font-medium hover-pulse"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow-lg rounded-lg bg-white/80 backdrop-blur-sm animate-fade-in">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/90">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center">
                Title
                {sortField === 'title' && (
                  sortDirection === 'asc' ? 
                    <ChevronUpIcon className="h-4 w-4 ml-1" /> : 
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                )}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleSort('body')}
            >
              <div className="flex items-center">
                Body
                {sortField === 'body' && (
                  sortDirection === 'asc' ? 
                    <ChevronUpIcon className="h-4 w-4 ml-1" /> : 
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/70 divide-y divide-gray-200">
          {sortedRecords.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                No records found. Click "New Record" to add one.
              </td>
            </tr>
          ) : (
            sortedRecords.map((record, index) => (
              <tr 
                key={record.id} 
                className="hover:bg-blue-50/50 transition-colors animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-md">
                  {record.body}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdateClick(record.id)}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-all hover:shadow-lg hover-pulse"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(record.id)}
                      disabled={deletingId === record.id}
                      className={`text-white px-3 py-1 rounded transition-all hover:shadow-lg hover-pulse ${
                        deletingId === record.id
                          ? 'bg-red-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {deletingId === record.id ? (
                        <span className="flex items-center">
                          <Loader2Icon className="animate-spin h-3 w-3 mr-1" />
                          Deleting
                        </span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;