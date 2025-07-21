'use client';

import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  membershipLevel: string;
  avatar: string;
  totalSessions: number;
  completedPrograms: number;
  currentStreak: number;
}

interface Program {
  id: string;
  title: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  nextSession: string;
  category: string;
  image: string;
}

interface Session {
  id: string;
  title: string;
  therapist: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'individual' | 'group';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  category: string;
}

const mockUser: UserProfile = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  memberSince: 'March 2023',
  membershipLevel: 'Premium',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
  totalSessions: 47,
  completedPrograms: 2,
  currentStreak: 12
};

const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Anxiety Freedom Program',
    progress: 75,
    totalSessions: 16,
    completedSessions: 12,
    nextSession: 'Tomorrow, 2:00 PM',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300'
  },
  {
    id: '2',
    title: 'Deep Sleep Mastery',
    progress: 100,
    totalSessions: 8,
    completedSessions: 8,
    nextSession: 'Completed',
    category: 'Sleep',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300'
  },
  {
    id: '3',
    title: 'Confidence Boost',
    progress: 33,
    totalSessions: 12,
    completedSessions: 4,
    nextSession: 'Friday, 10:00 AM',
    category: 'Self-Improvement',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
  }
];

const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Anxiety Management Session',
    therapist: 'Dr. Michael Chen',
    date: 'Today',
    time: '2:00 PM',
    status: 'upcoming',
    type: 'individual'
  },
  {
    id: '2',
    title: 'Group Confidence Building',
    therapist: 'Dr. Sarah Mitchell',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'upcoming',
    type: 'group'
  },
  {
    id: '3',
    title: 'Sleep Hypnosis Session',
    therapist: 'Dr. Emily Rodriguez',
    date: 'Yesterday',
    time: '7:00 PM',
    status: 'completed',
    type: 'individual'
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first hypnosis session',
    icon: '🎯',
    unlockedDate: '2 days ago',
    category: 'Milestone'
  },
  {
    id: '2',
    title: 'Consistency Champion',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    unlockedDate: '1 week ago',
    category: 'Streak'
  },
  {
    id: '3',
    title: 'Program Graduate',
    description: 'Completed your first program',
    icon: '🎓',
    unlockedDate: '2 weeks ago',
    category: 'Achievement'
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-purple-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockUser.name}!</h1>
                <p className="text-gray-600">Ready to continue your transformation journey?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Member since</div>
                <div className="font-semibold text-gray-900">{mockUser.memberSince}</div>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {mockUser.membershipLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Programs</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.completedPrograms}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.currentStreak} days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Next Session</p>
                <p className="text-lg font-bold text-gray-900">Today 2PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'programs', label: 'My Programs', icon: '📚' },
                { id: 'sessions', label: 'Sessions', icon: '🎯' },
                { id: 'achievements', label: 'Achievements', icon: '🏆' }
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Completed Sleep Hypnosis Session</p>
                        <p className="text-sm text-gray-600">Yesterday at 7:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Upcoming: Anxiety Management Session</p>
                        <p className="text-sm text-gray-600">Today at 2:00 PM with Dr. Michael Chen</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Achievement Unlocked: Consistency Champion</p>
                        <p className="text-sm text-gray-600">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">My Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockPrograms.map((program) => (
                    <div key={program.id} className="bg-gray-50 rounded-lg p-6">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{program.title}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {program.category}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{program.completedSessions}/{program.totalSessions} sessions</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(program.progress)}`}
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm text-gray-600 mt-1">{program.progress}%</div>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Next Session:</strong> {program.nextSession}
                      </div>

                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                        {program.progress === 100 ? 'View Certificate' : 'Continue Program'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">My Sessions</h3>
                <div className="space-y-4">
                  {mockSessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{session.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                              {session.status}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                              {session.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">with {session.therapist}</p>
                          <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                        </div>
                        <div className="flex space-x-2">
                          {session.status === 'upcoming' && (
                            <>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Join Session
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                Reschedule
                              </button>
                            </>
                          )}
                          {session.status === 'completed' && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                              View Notes
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                      <p className="text-gray-600 mb-4">{achievement.description}</p>
                      <div className="text-sm text-gray-500">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {achievement.category}
                        </span>
                        <div className="mt-2">Unlocked {achievement.unlockedDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

