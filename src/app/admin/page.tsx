'use client';

import { useState, useEffect } from 'react';
import { IAudio } from '@/models/audio';

interface UploadFormData {
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  category: string;
  tags: string;
  thumbnailUrl: string;
  isPublic: boolean;
}

const initialFormData: UploadFormData = {
  title: '',
  description: '',
  audioUrl: '',
  duration: 0,
  category: 'sleep',
  tags: '',
  thumbnailUrl: '',
  isPublic: true
};

const categories = [
  'sleep',
  'anxiety',
  'confidence',
  'stress',
  'focus',
  'motivation',
  'healing',
  'meditation',
  'performance',
  'habits'
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [formData, setFormData] = useState<UploadFormData>(initialFormData);
  const [audios, setAudios] = useState<IAudio[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingAudio, setEditingAudio] = useState<IAudio | null>(null);

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchAudios();
    }
  }, [activeTab]);

  const fetchAudios = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/audios');
      if (response.ok) {
        const data = await response.json();
        setAudios(data.audios || []);
      }
    } catch (error) {
      console.error('Error fetching audios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const audioData = {
        ...formData,
        tags: tagsArray,
        uploadedBy: 'Admin',
        playCount: 0,
        likes: 0
      };

      const url = editingAudio ? `/api/audios/${editingAudio._id}` : '/api/audios';
      const method = editingAudio ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(audioData),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingAudio ? 'Audio updated successfully!' : 'Audio uploaded successfully!' 
        });
        setFormData(initialFormData);
        setEditingAudio(null);
        if (activeTab === 'manage') {
          fetchAudios();
        }
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to save audio' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving the audio' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (audio: IAudio) => {
    setFormData({
      title: audio.title,
      description: audio.description || '',
      audioUrl: audio.audioUrl,
      duration: audio.duration || 0,
      category: audio.category || 'sleep',
      tags: audio.tags?.join(', ') || '',
      thumbnailUrl: audio.thumbnailUrl || '',
      isPublic: audio.isPublic !== false
    });
    setEditingAudio(audio);
    setActiveTab('upload');
  };

  const handleDelete = async (audioId: string) => {
    if (!confirm('Are you sure you want to delete this audio?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/audios/${audioId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Audio deleted successfully!' });
        fetchAudios();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete audio' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while deleting the audio' });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      sleep: 'bg-blue-100 text-blue-800',
      anxiety: 'bg-green-100 text-green-800',
      confidence: 'bg-purple-100 text-purple-800',
      stress: 'bg-orange-100 text-orange-800',
      focus: 'bg-indigo-100 text-indigo-800',
      motivation: 'bg-yellow-100 text-yellow-800',
      healing: 'bg-pink-100 text-pink-800',
      meditation: 'bg-teal-100 text-teal-800',
      performance: 'bg-red-100 text-red-800',
      habits: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.habits;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage hypnosis audio content</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Admin Access
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'upload', label: 'Upload Audio', icon: '📤' },
                { id: 'manage', label: 'Manage Audios', icon: '📋' },
                { id: 'analytics', label: 'Analytics', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'upload' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {editingAudio ? 'Edit Audio' : 'Upload New Audio'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter audio title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audio URL *
                      </label>
                      <input
                        type="url"
                        name="audioUrl"
                        value={formData.audioUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="https://example.com/audio.mp3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (seconds) *
                      </label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="1800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thumbnail URL
                      </label>
                      <input
                        type="url"
                        name="thumbnailUrl"
                        value={formData.thumbnailUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="https://example.com/thumbnail.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="relaxation, sleep, meditation"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter audio description"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Make this audio publicly available
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors duration-200"
                    >
                      {loading ? 'Saving...' : editingAudio ? 'Update Audio' : 'Upload Audio'}
                    </button>
                    
                    {editingAudio && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAudio(null);
                          setFormData(initialFormData);
                        }}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'manage' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Manage Audios</h3>
                  <button
                    onClick={fetchAudios}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Refresh
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500">Loading audios...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {audios.map((audio) => (
                      <div key={audio._id as string} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{audio.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(audio.category || 'sleep')}`}>
                                {audio.category}
                              </span>
                              {!audio.isPublic && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                  Private
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-3">{audio.description}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <span>Duration: {formatDuration(audio.duration || 0)}</span>
                              <span>Plays: {audio.playCount || 0}</span>
                              <span>Likes: {audio.likes || 0}</span>
                              <span>Uploaded: {new Date(audio.uploadedAt || '').toLocaleDateString()}</span>
                            </div>
                            
                            {audio.tags && audio.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {audio.tags.map((tag, index) => (
                                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleEdit(audio)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(audio._id as string)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {audios.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-gray-500">No audios found</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Audios</p>
                        <p className="text-2xl font-bold text-gray-900">{audios.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Plays</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {audios.reduce((sum, audio) => sum + (audio.playCount || 0), 0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Likes</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {audios.reduce((sum, audio) => sum + (audio.likes || 0), 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h4>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const categoryAudios = audios.filter(audio => audio.category === category);
                      const totalPlays = categoryAudios.reduce((sum, audio) => sum + (audio.playCount || 0), 0);
                      
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(category)}`}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                            <span className="text-gray-600">{categoryAudios.length} audios</span>
                          </div>
                          <span className="text-gray-900 font-medium">{totalPlays} plays</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

