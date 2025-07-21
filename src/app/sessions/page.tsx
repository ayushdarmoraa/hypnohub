'use client';

import { useState } from 'react';

interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  rating: number;
  reviewCount: number;
  image: string;
  bio: string;
  availability: string[];
  price: number;
  languages: string[];
  credentials: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingSession {
  id: string;
  therapistId: string;
  date: string;
  time: string;
  duration: number;
  type: 'individual' | 'group';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'Clinical Hypnotherapist',
    specialties: ['Anxiety', 'Depression', 'Trauma', 'Sleep Disorders'],
    experience: '15+ years',
    rating: 4.9,
    reviewCount: 247,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300',
    bio: 'Dr. Mitchell specializes in anxiety and trauma recovery using evidence-based hypnotherapy techniques. She has helped over 1000 clients overcome their challenges and achieve lasting transformation.',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    price: 150,
    languages: ['English', 'Spanish'],
    credentials: ['PhD Psychology', 'Certified Clinical Hypnotherapist', 'EMDR Certified']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Medical Hypnotherapist',
    specialties: ['Pain Management', 'Addiction', 'Weight Loss', 'Smoking Cessation'],
    experience: '12+ years',
    rating: 4.8,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300',
    bio: 'Dr. Chen combines medical expertise with hypnotherapy to help clients overcome addiction and manage chronic pain. His holistic approach has achieved remarkable success rates.',
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    price: 175,
    languages: ['English', 'Mandarin'],
    credentials: ['MD Internal Medicine', 'Certified Medical Hypnotherapist', 'Addiction Specialist']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'Performance Hypnotherapist',
    specialties: ['Performance Enhancement', 'Confidence Building', 'Public Speaking', 'Sports Psychology'],
    experience: '10+ years',
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1594824388853-2c5d0c4e3e4e?w=300',
    bio: 'Dr. Rodriguez works with executives, athletes, and performers to unlock their peak potential. Her techniques have helped clients achieve breakthrough performance in their fields.',
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    price: 200,
    languages: ['English', 'Spanish', 'Portuguese'],
    credentials: ['PhD Sports Psychology', 'Certified Performance Coach', 'NLP Master Practitioner']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Behavioral Hypnotherapist',
    specialties: ['Habit Change', 'Phobias', 'OCD', 'Behavioral Disorders'],
    experience: '18+ years',
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300',
    bio: 'Dr. Wilson specializes in helping clients break unwanted habits and overcome phobias. His systematic approach to behavioral change has transformed thousands of lives.',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    price: 160,
    languages: ['English'],
    credentials: ['PhD Behavioral Psychology', 'Certified Hypnotherapist', 'CBT Specialist']
  }
];

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
  { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: true }
];

const mockBookings: BookingSession[] = [
  {
    id: '1',
    therapistId: '1',
    date: '2024-01-15',
    time: '2:00 PM',
    duration: 60,
    type: 'individual',
    status: 'upcoming',
    notes: 'Focus on anxiety management techniques'
  },
  {
    id: '2',
    therapistId: '2',
    date: '2024-01-12',
    time: '10:00 AM',
    duration: 90,
    type: 'individual',
    status: 'completed',
    notes: 'Smoking cessation session - excellent progress'
  }
];

export default function SessionsPage() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState<'individual' | 'group'>('individual');
  const [activeTab, setActiveTab] = useState('therapists');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const specialties = ['All', 'Anxiety', 'Depression', 'Trauma', 'Sleep Disorders', 'Pain Management', 'Addiction', 'Performance Enhancement', 'Habit Change'];

  const filteredTherapists = specialtyFilter === 'All' 
    ? mockTherapists 
    : mockTherapists.filter(therapist => 
        therapist.specialties.some(specialty => 
          specialty.toLowerCase().includes(specialtyFilter.toLowerCase())
        )
      );

  const handleBookSession = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedTherapist && selectedDate && selectedTime) {
      alert(`Session booked with ${selectedTherapist.name} on ${selectedDate} at ${selectedTime}`);
      setShowBookingModal(false);
      setSelectedTherapist(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Hypnotherapy Session
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with certified hypnotherapists for personalized 1-on-1 sessions tailored to your specific needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">50+</div>
                <div className="text-sm text-blue-200">Expert Therapists</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">95%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">24/7</div>
                <div className="text-sm text-blue-200">Flexible Scheduling</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'therapists', label: 'Find Therapists', icon: '👨‍⚕️' },
                { id: 'bookings', label: 'My Bookings', icon: '📅' },
                { id: 'history', label: 'Session History', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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
            {activeTab === 'therapists' && (
              <div>
                {/* Specialty Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Specialty</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setSpecialtyFilter(specialty)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                          specialtyFilter === specialty
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md border border-gray-200'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Therapist Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredTherapists.map((therapist) => (
                    <div key={therapist.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={therapist.image}
                            alt={therapist.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{therapist.name}</h3>
                              <div className="flex items-center space-x-1">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">{therapist.rating}</span>
                                <span className="text-sm text-gray-500">({therapist.reviewCount})</span>
                              </div>
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{therapist.title}</p>
                            <p className="text-gray-600 mb-3">{therapist.experience} experience</p>
                            
                            <div className="mb-3">
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Specialties:</h4>
                              <div className="flex flex-wrap gap-1">
                                {therapist.specialties.map((specialty, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="mb-3">
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Languages:</h4>
                              <p className="text-sm text-gray-600">{therapist.languages.join(', ')}</p>
                            </div>

                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Available:</h4>
                              <p className="text-sm text-gray-600">{therapist.availability.join(', ')}</p>
                            </div>

                            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{therapist.bio}</p>

                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-gray-900">
                                ${therapist.price}/session
                              </div>
                              <button
                                onClick={() => handleBookSession(therapist)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                              >
                                Book Session
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Sessions</h3>
                <div className="space-y-4">
                  {mockBookings.filter(booking => booking.status === 'upcoming').map((booking) => {
                    const therapist = mockTherapists.find(t => t.id === booking.therapistId);
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={therapist?.image}
                              alt={therapist?.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{therapist?.name}</h4>
                              <p className="text-gray-600">{therapist?.title}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-500">{booking.date} at {booking.time}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                  {booking.duration} min
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                              Join Session
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              Reschedule
                            </button>
                            <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200">
                              Cancel
                            </button>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700"><strong>Notes:</strong> {booking.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Session History</h3>
                <div className="space-y-4">
                  {mockBookings.filter(booking => booking.status === 'completed').map((booking) => {
                    const therapist = mockTherapists.find(t => t.id === booking.therapistId);
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={therapist?.image}
                              alt={therapist?.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{therapist?.name}</h4>
                              <p className="text-gray-600">{therapist?.title}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-500">{booking.date} at {booking.time}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                  {booking.duration} min
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                              View Notes
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              Book Again
                            </button>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700"><strong>Session Notes:</strong> {booking.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTherapist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book Session</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={selectedTherapist.image}
                alt={selectedTherapist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedTherapist.name}</h4>
                <p className="text-blue-600">{selectedTherapist.title}</p>
                <p className="text-gray-600">${selectedTherapist.price}/session</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSessionType('individual')}
                    className={`px-4 py-2 rounded-lg border ${
                      sessionType === 'individual'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Individual (60 min)
                  </button>
                  <button
                    onClick={() => setSessionType('group')}
                    className={`px-4 py-2 rounded-lg border ${
                      sessionType === 'group'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Group (90 min)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        selectedTime === slot.time
                          ? 'bg-blue-600 text-white'
                          : slot.available
                          ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Session Details</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Duration: {sessionType === 'individual' ? '60' : '90'} minutes</p>
                  <p>• Type: {sessionType === 'individual' ? 'One-on-one' : 'Small group (max 4 people)'}</p>
                  <p>• Platform: Secure video call</p>
                  <p>• Cancellation: Free up to 24 hours before</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Confirm Booking - ${selectedTherapist.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

