'use client';

import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  level: 'beginner' | 'professional';
  modules: string[];
  certification: string;
  features: string[];
  instructor: {
    name: string;
    credentials: string;
    image: string;
  };
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Hypnotherapy Certification',
    description: 'Comprehensive training program for aspiring hypnotherapists. Learn from basics to advanced techniques with hands-on practice and real client work.',
    duration: '6 months',
    price: 2997,
    level: 'beginner',
    modules: [
      'Foundations of Hypnosis',
      'Induction Techniques',
      'Therapeutic Applications',
      'Client Assessment',
      'Ethics & Professional Practice',
      'Business Development',
      'Advanced Techniques',
      'Specialization Areas'
    ],
    certification: 'Certified Clinical Hypnotherapist (CCH)',
    features: [
      '200+ hours of training',
      'Live practice sessions',
      'Mentorship program',
      'Client referral system',
      'Business setup guidance',
      'Lifetime support community',
      'Continuing education credits',
      'International certification'
    ],
    instructor: {
      name: 'Dr. Sarah Mitchell',
      credentials: 'PhD Psychology, 20+ years experience',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
    }
  },
  {
    id: '2',
    title: 'Advanced Practitioner Program',
    description: 'Elevate your existing hypnotherapy practice with cutting-edge techniques, specialized applications, and advanced client management strategies.',
    duration: '3 months',
    price: 1997,
    level: 'professional',
    modules: [
      'Advanced Induction Methods',
      'Trauma-Informed Hypnotherapy',
      'Medical Hypnosis Applications',
      'Group Hypnotherapy',
      'Online Practice Development',
      'Research & Evidence-Based Practice'
    ],
    certification: 'Advanced Clinical Hypnotherapist (ACH)',
    features: [
      '120+ hours of advanced training',
      'Specialized technique mastery',
      'Case study analysis',
      'Peer supervision groups',
      'Research project completion',
      'Professional network access',
      'Advanced certification',
      'Continuing education units'
    ],
    instructor: {
      name: 'Dr. Michael Chen',
      credentials: 'MD, Certified Master Hypnotherapist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
    }
  }
];

const learningPaths = {
  beginner: {
    title: 'Start Your Hypnotherapy Journey',
    subtitle: 'Perfect for those new to hypnotherapy',
    benefits: [
      'No prior experience required',
      'Step-by-step learning progression',
      'Comprehensive foundation building',
      'Career guidance and support',
      'Practice opportunities with supervision',
      'Business development training'
    ],
    timeline: '6-12 months to certification'
  },
  professional: {
    title: 'Advance Your Practice',
    subtitle: 'For certified hypnotherapists seeking specialization',
    benefits: [
      'Advanced technique mastery',
      'Specialized application areas',
      'Research-based methodologies',
      'Professional network expansion',
      'Continuing education credits',
      'Practice optimization strategies'
    ],
    timeline: '3-6 months to advanced certification'
  }
};

export default function LearnPage() {
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'professional' | null>(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handlePathSelection = (path: 'beginner' | 'professional') => {
    setSelectedPath(path);
  };

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const resetSelection = () => {
    setSelectedPath(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Certified Hypnotherapist
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Join the growing field of hypnotherapy and help others transform their lives. 
              Choose your path based on your current experience level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">1000+</div>
                <div className="text-sm text-purple-200">Graduates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">98%</div>
                <div className="text-sm text-purple-200">Pass Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">$75k</div>
                <div className="text-sm text-purple-200">Avg. Graduate Income</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!selectedPath ? (
        /* Path Selection */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the path that best matches your current experience and career goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Beginner Path */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">New to Hypnotherapy</h3>
                  <div className="bg-white/20 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <p className="text-green-100 mb-4">{learningPaths.beginner.subtitle}</p>
                <div className="text-sm text-green-100">
                  Timeline: {learningPaths.beginner.timeline}
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What You'll Get:</h4>
                <ul className="space-y-3 mb-6">
                  {learningPaths.beginner.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePathSelection('beginner')}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200"
                >
                  I Want to Learn Hypnotherapy
                </button>
              </div>
            </div>

            {/* Professional Path */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Already a Hypnotherapist</h3>
                  <div className="bg-white/20 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <p className="text-purple-100 mb-4">{learningPaths.professional.subtitle}</p>
                <div className="text-sm text-purple-100">
                  Timeline: {learningPaths.professional.timeline}
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What You'll Get:</h4>
                <ul className="space-y-3 mb-6">
                  {learningPaths.professional.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePathSelection('professional')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  I'm Already a Hypnotherapist
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Course Details */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-8">
            <button
              onClick={resetSelection}
              className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Path Selection
            </button>
          </div>

          {mockCourses
            .filter(course => course.level === selectedPath)
            .map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className={`p-8 ${selectedPath === 'beginner' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h2>
                      <p className="text-lg opacity-90 mb-6">{course.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                          <div className="text-sm opacity-80">Duration</div>
                          <div className="font-semibold">{course.duration}</div>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                          <div className="text-sm opacity-80">Certification</div>
                          <div className="font-semibold">{course.certification}</div>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                          <div className="text-sm opacity-80">Investment</div>
                          <div className="font-semibold">${course.price}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white/30"
                      />
                      <h3 className="font-semibold text-lg">{course.instructor.name}</h3>
                      <p className="text-sm opacity-80">{course.instructor.credentials}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h3>
                      <div className="space-y-3">
                        {course.modules.map((module, index) => (
                          <div key={index} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${selectedPath === 'beginner' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-purple-100 text-purple-600'} flex items-center justify-center text-sm font-semibold mr-3`}>
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Program Features</h3>
                      <div className="space-y-3">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <svg className={`w-5 h-5 ${selectedPath === 'beginner' 
                              ? 'text-green-500' 
                              : 'text-purple-500'} mr-3 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => handleEnroll(course)}
                        className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${selectedPath === 'beginner'
                          ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
                      >
                        Enroll Now - ${course.price}
                      </button>
                      <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all duration-200">
                        Download Curriculum
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Enrollment Modal */}
      {showEnrollmentForm && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Enroll in Course</h3>
              <button
                onClick={() => setShowEnrollmentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900">{selectedCourse.title}</h4>
              <p className="text-gray-600">{selectedCourse.duration} • ${selectedCourse.price}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-semibold text-blue-900">Next Steps</h4>
              </div>
              <div className="text-sm text-blue-800 space-y-2">
                <p>1. Complete enrollment and payment</p>
                <p>2. Receive welcome package and materials</p>
                <p>3. Join orientation session</p>
                <p>4. Begin your certification journey</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Enrollment initiated for ${selectedCourse.title}. You will be redirected to payment.`);
                setShowEnrollmentForm(false);
              }}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${selectedPath === 'beginner'
                ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

