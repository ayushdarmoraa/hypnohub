'use client';

import { useState } from 'react';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  features: string[];
  testimonial?: {
    name: string;
    text: string;
    rating: number;
  };
  image: string;
  popular?: boolean;
}

const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Quit Smoking Forever',
    description: 'Break free from smoking addiction with our comprehensive 4-week program. Combines hypnotherapy sessions, behavioral coaching, and ongoing support.',
    duration: '4 weeks',
    price: 297,
    originalPrice: 497,
    category: 'Addiction',
    features: [
      '8 guided hypnotherapy sessions',
      'Weekly 1-on-1 coaching calls',
      'Craving management techniques',
      'Relapse prevention strategies',
      '24/7 support community access',
      'Money-back guarantee'
    ],
    testimonial: {
      name: 'Sarah M.',
      text: 'After 15 years of smoking, I finally quit for good. This program changed my life!',
      rating: 5
    },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    popular: true
  },
  {
    id: '2',
    title: 'Unshakeable Confidence',
    description: 'Transform your self-doubt into unbreakable confidence. Perfect for professionals, students, and anyone ready to step into their power.',
    duration: '6 weeks',
    price: 397,
    originalPrice: 597,
    category: 'Self-Improvement',
    features: [
      '12 confidence-building sessions',
      'Public speaking mastery',
      'Social anxiety elimination',
      'Self-worth reprogramming',
      'Success visualization techniques',
      'Lifetime access to materials'
    ],
    testimonial: {
      name: 'Michael R.',
      text: 'I went from avoiding presentations to leading company meetings with confidence.',
      rating: 5
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: '3',
    title: 'Anxiety Freedom Program',
    description: 'Overcome anxiety, panic attacks, and worry with proven hypnotherapy techniques. Regain control of your mind and emotions.',
    duration: '8 weeks',
    price: 447,
    originalPrice: 697,
    category: 'Mental Health',
    features: [
      '16 anxiety-relief sessions',
      'Panic attack prevention tools',
      'Stress management techniques',
      'Mindfulness integration',
      'Emergency support protocols',
      'Progress tracking system'
    ],
    testimonial: {
      name: 'Emma L.',
      text: 'My panic attacks are completely gone. I feel like myself again after years of struggle.',
      rating: 5
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    popular: true
  },
  {
    id: '4',
    title: 'Deep Sleep Mastery',
    description: 'End insomnia and sleep disorders naturally. Wake up refreshed and energized every morning with our sleep optimization program.',
    duration: '4 weeks',
    price: 247,
    originalPrice: 397,
    category: 'Sleep',
    features: [
      '8 sleep induction sessions',
      'Sleep hygiene optimization',
      'Dream programming techniques',
      'Insomnia elimination protocol',
      'Morning energy boosters',
      'Sleep tracking guidance'
    ],
    testimonial: {
      name: 'David K.',
      text: 'I sleep through the night for the first time in 10 years. Absolutely life-changing.',
      rating: 5
    },
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400'
  },
  {
    id: '5',
    title: 'Weight Loss Breakthrough',
    description: 'Transform your relationship with food and achieve lasting weight loss through subconscious reprogramming and healthy habit formation.',
    duration: '12 weeks',
    price: 597,
    originalPrice: 897,
    category: 'Health',
    features: [
      '24 transformation sessions',
      'Emotional eating elimination',
      'Metabolism optimization',
      'Exercise motivation boost',
      'Nutritional guidance integration',
      'Body image healing'
    ],
    testimonial: {
      name: 'Lisa T.',
      text: 'Lost 45 pounds and kept it off for 2 years. This program addresses the real issues.',
      rating: 5
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: '6',
    title: 'Peak Performance Mindset',
    description: 'Unlock your full potential in sports, business, or any field. Develop the mental edge that separates champions from the rest.',
    duration: '6 weeks',
    price: 497,
    originalPrice: 747,
    category: 'Performance',
    features: [
      '12 performance enhancement sessions',
      'Focus and concentration mastery',
      'Pressure handling techniques',
      'Goal achievement acceleration',
      'Visualization mastery',
      'Competition mindset development'
    ],
    testimonial: {
      name: 'Alex P.',
      text: 'Improved my tennis game dramatically and got promoted at work. Mental training works!',
      rating: 5
    },
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
  }
];

const categories = ['All', 'Addiction', 'Self-Improvement', 'Mental Health', 'Sleep', 'Health', 'Performance'];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = selectedCategory === 'All' 
    ? mockPrograms 
    : mockPrograms.filter(program => program.category === selectedCategory);

  const handleEnroll = (program: Program) => {
    setSelectedProgram(program);
    setShowEnrollmentForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Life with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Guided Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Comprehensive hypnotherapy programs designed to create lasting change. 
              Work with certified therapists on your journey to breakthrough results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-purple-200">Success Stories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">94%</div>
                <div className="text-sm text-purple-200">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-purple-200">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                program.popular ? 'ring-2 ring-purple-500 relative' : ''
              }`}
            >
              {program.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Most Popular
                </div>
              )}
              
              <div className="relative">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {program.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <span className="text-sm text-purple-600 font-medium">{program.duration}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">${program.price}</span>
                    {program.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${program.originalPrice}</span>
                    )}
                    {program.originalPrice && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        Save ${program.originalPrice - program.price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {program.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                    {program.features.length > 3 && (
                      <li className="text-purple-600 font-medium">
                        +{program.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {program.testimonial && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(program.testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{program.testimonial.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{program.testimonial.text}"</p>
                  </div>
                )}

                <button
                  onClick={() => handleEnroll(program)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Enroll Now - ${program.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentForm && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Enroll in Program</h3>
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
              <h4 className="font-semibold text-gray-900">{selectedProgram.title}</h4>
              <p className="text-gray-600">{selectedProgram.duration} • ${selectedProgram.price}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-semibold text-blue-900">How It Works</h4>
              </div>
              <div className="text-sm text-blue-800 space-y-2">
                <p>1. Complete enrollment and payment</p>
                <p>2. Get matched with a certified therapist</p>
                <p>3. Begin your personalized program</p>
                <p>4. Track progress with ongoing support</p>
              </div>
            </div>

            <button
              onClick={() => {
                // Simulate enrollment process
                alert(`Enrollment initiated for ${selectedProgram.title}. You will be redirected to payment.`);
                setShowEnrollmentForm(false);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

