'use client';

import { useState } from 'react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge: string;
    joinDate: string;
  };
  title: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  isPinned?: boolean;
  tags: string[];
}

interface Reply {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Dr. Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100',
      badge: 'Expert Therapist',
      joinDate: 'Jan 2020'
    },
    title: 'Welcome to the MindReboot Community! 🎉',
    content: 'Welcome everyone to our exclusive community space! This is where we share experiences, support each other, and grow together on our hypnotherapy journey. Feel free to introduce yourself and share what brought you here.',
    category: 'Welcome',
    timestamp: '2 hours ago',
    likes: 47,
    replies: 23,
    isLiked: false,
    isPinned: true,
    tags: ['welcome', 'community', 'introduction']
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      badge: 'Program Graduate',
      joinDate: 'Mar 2023'
    },
    title: 'My 30-day transformation with the Confidence Program',
    content: 'Just completed the Unshakeable Confidence program and wanted to share my experience. The changes have been incredible - I gave my first presentation at work yesterday without any anxiety! The techniques really work when you practice them consistently.',
    category: 'Success Stories',
    timestamp: '4 hours ago',
    likes: 89,
    replies: 15,
    isLiked: true,
    tags: ['confidence', 'success-story', 'transformation']
  },
  {
    id: '3',
    author: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      badge: 'Active Member',
      joinDate: 'Jun 2023'
    },
    title: 'Tips for maintaining progress after completing a program?',
    content: 'I finished the Anxiety Freedom program last month and have been doing great, but I\'m worried about maintaining the progress long-term. What strategies have worked for others? Any daily practices you\'d recommend?',
    category: 'Questions & Support',
    timestamp: '6 hours ago',
    likes: 34,
    replies: 28,
    isLiked: false,
    tags: ['anxiety', 'maintenance', 'advice-needed']
  },
  {
    id: '4',
    author: {
      name: 'Dr. James Wilson',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100',
      badge: 'Certified Therapist',
      joinDate: 'Sep 2019'
    },
    title: 'The Science Behind Sleep Hypnosis - Research Update',
    content: 'Sharing some fascinating new research on how hypnosis affects sleep patterns and REM cycles. The neurological changes we see are remarkable and explain why our sleep programs are so effective.',
    category: 'Research & Science',
    timestamp: '1 day ago',
    likes: 156,
    replies: 42,
    isLiked: true,
    tags: ['research', 'sleep', 'neuroscience']
  },
  {
    id: '5',
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      badge: 'New Member',
      joinDate: 'Dec 2023'
    },
    title: 'Starting my journey - nervous but excited!',
    content: 'Just enrolled in the Complete Hypnotherapy Certification program. I\'ve always been fascinated by the mind\'s power to heal, and I\'m ready to make this career change. Any advice for someone just starting out?',
    category: 'New Members',
    timestamp: '2 days ago',
    likes: 67,
    replies: 31,
    isLiked: false,
    tags: ['new-member', 'certification', 'career-change']
  }
];

const categories = [
  { name: 'All Posts', count: 234, color: 'bg-gray-100 text-gray-800' },
  { name: 'Success Stories', count: 89, color: 'bg-green-100 text-green-800' },
  { name: 'Questions & Support', count: 156, color: 'bg-blue-100 text-blue-800' },
  { name: 'Research & Science', count: 45, color: 'bg-purple-100 text-purple-800' },
  { name: 'New Members', count: 78, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Program Discussions', count: 123, color: 'bg-indigo-100 text-indigo-800' }
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [isLoggedIn] = useState(false); // Simulate not logged in for demo

  const filteredPosts = selectedCategory === 'All Posts' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = () => {
    if (!isLoggedIn) {
      setShowAccessModal(true);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowAccessModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-900 via-blue-800 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MindReboot
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Community
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with fellow members, share your journey, and get support from our community of transformation seekers.
            </p>
            
            {!isLoggedIn && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-yellow-400 font-semibold">Premium Members Only</span>
                </div>
                <p className="text-sm text-blue-200">
                  Join any program to unlock full community access
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold text-gray-900">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Today</span>
                  <span className="font-semibold text-green-600">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts This Week</span>
                  <span className="font-semibold text-blue-600">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Stories</span>
                  <span className="font-semibold text-purple-600">156</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${category.color}`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create Post Button */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <button
                onClick={handlePostClick}
                className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-gray-500">Share your thoughts with the community...</span>
                </div>
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer ${
                    post.isPinned ? 'ring-2 ring-blue-200' : ''
                  }`}
                  onClick={handlePostClick}
                >
                  {post.isPinned && (
                    <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                          <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-blue-700">Pinned Post</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {post.author.badge}
                          </span>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 ${
                              post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                            } transition-colors duration-200`}
                          >
                            <svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          
                          <button
                            onClick={handlePostClick}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-sm font-medium">{post.replies} replies</span>
                          </button>
                          
                          <button
                            onClick={handlePostClick}
                            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span className="text-sm font-medium">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button
                onClick={handlePostClick}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Load More Posts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Access Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Community Access</h3>
              <p className="text-gray-600 mb-6">
                Join any MindReboot program to unlock full access to our exclusive community features.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">What You'll Get:</h4>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Post and reply to discussions</li>
                  <li>• Connect with other members</li>
                  <li>• Access to expert Q&A sessions</li>
                  <li>• Private support groups</li>
                  <li>• Exclusive resources and content</li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAccessModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowAccessModal(false);
                    // Redirect to programs page
                    window.location.href = '/programs';
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Programs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

