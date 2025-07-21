'use client';

import { useState, useEffect } from 'react';
import AudioCard from '@/components/AudioCard';
import PersonalizedRequestForm from '@/components/PersonalizedRequestForm';
import { IAudio } from '@/models/audio';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'confidence', label: 'Confidence' },
  { value: 'stress', label: 'Stress' },
  { value: 'focus', label: 'Focus' },
  { value: 'motivation', label: 'Motivation' },
  { value: 'healing', label: 'Healing' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'performance', label: 'Performance' },
  { value: 'habits', label: 'Habits' }
];

export default function LibraryPage() {
  const [audios, setAudios] = useState<IAudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchAudios();
  }, [searchTerm, selectedCategory, currentPage]);

  const fetchAudios = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pagination.limit.toString(),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/audios?${params}`);
      if (response.ok) {
        const data = await response.json();
        setAudios(data.audios || []);
        setPagination(data.pagination || pagination);
      } else {
        console.error('Failed to fetch audios:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching audios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      all: 'bg-gray-100 text-gray-800 border-gray-300',
      sleep: 'bg-blue-100 text-blue-800 border-blue-300',
      anxiety: 'bg-green-100 text-green-800 border-green-300',
      confidence: 'bg-purple-100 text-purple-800 border-purple-300',
      stress: 'bg-orange-100 text-orange-800 border-orange-300',
      focus: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      motivation: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      healing: 'bg-pink-100 text-pink-800 border-pink-300',
      meditation: 'bg-teal-100 text-teal-800 border-teal-300',
      performance: 'bg-red-100 text-red-800 border-red-300',
      habits: 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return colors[category as keyof typeof colors] || colors.all;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hypnosis Audio Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of premium hypnosis audios designed to help you overcome 
            anxiety, improve sleep, boost confidence, and transform your life. All audios are 
            professionally crafted by certified hypnotherapists.
          </p>
        </div>

        {/* Personalized Audio CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Something More Personal?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get a custom hypnosis audio tailored specifically to your unique needs and goals. 
            Our expert hypnotherapists will create a personalized session just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Request Personalized Audio - $97
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search audios by title, description, or tags..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? getCategoryColor(category.value)
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    Showing {audios.length} of {pagination.total} audios
                    {searchTerm && ` for "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                  </>
                )}
              </div>
              {pagination.pages > 1 && (
                <div className="mt-2 sm:mt-0">
                  Page {pagination.page} of {pagination.pages}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Free Audios Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Free Hypnosis Audios
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : audios.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {audios.map((audio) => (
                  <AudioCard key={audio._id as string} audio={audio} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      let pageNum;
                      if (pagination.pages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.pages - 2) {
                        pageNum = pagination.pages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.pages}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No audios found matching your criteria.' 
                  : 'No audios available at the moment. Check back soon!'
                }
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose MindReboot Lab?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Certified Professionals</h4>
              <p className="text-gray-600">All our content is created by certified hypnotherapists with years of experience.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h4>
              <p className="text-gray-600">Thousands of users have transformed their lives using our hypnosis programs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h4>
              <p className="text-gray-600">Your privacy and security are our top priorities. All sessions are confidential.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Request Form Modal */}
      {showRequestForm && (
        <PersonalizedRequestForm onClose={() => setShowRequestForm(false)} />
      )}
    </div>
  );
}

