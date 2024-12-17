'use client';

import { ChevronRight, ShoppingCart, X, Plus, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Plan {
  type: 'base' | 'advanced';
  price: number;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  plans: {
    base: number;
    advanced: number;
  };
  liveClassPrice: number;
}

interface SelectedSubject {
  id: string;
  planType: 'base' | 'advanced';
  includeLiveClass: boolean;
}

type Grade = '4' | '5' | '6' | '7' | '8' | '9';

const getSubjectsForGrade = (grade: Grade): Subject[] => {
  const basePricing = {
    '4': {
      math: { base: 99, advanced: 149, live: 50 },
      science: { base: 149, advanced: 199, live: 50 },
      english: { base: 99, advanced: 149, live: 50 },
      history: { base: 99, advanced: 149, live: 50 },
      geography: { base: 99, advanced: 149, live: 50 },
      computers: { base: 149, advanced: 199, live: 50 },
      languages: { base: 149, advanced: 199, live: 50 },
      arts: { base: 99, advanced: 149, live: 50 },
      music: { base: 129, advanced: 179, live: 50 }
    },
    '5': {
      math: { base: 99, advanced: 149, live: 50 },
      science: { base: 149, advanced: 199, live: 50 },
      english: { base: 99, advanced: 149, live: 50 },
      history: { base: 99, advanced: 149, live: 50 },
      geography: { base: 99, advanced: 149, live: 50 },
      computers: { base: 149, advanced: 199, live: 50 },
      languages: { base: 149, advanced: 199, live: 50 },
      arts: { base: 99, advanced: 149, live: 50 },
      music: { base: 129, advanced: 179, live: 50 }
    },
    '6': {
      math: { base: 129, advanced: 179, live: 75 },
      science: { base: 179, advanced: 229, live: 75 },
      english: { base: 129, advanced: 179, live: 75 },
      history: { base: 129, advanced: 179, live: 75 },
      geography: { base: 129, advanced: 179, live: 75 },
      computers: { base: 179, advanced: 229, live: 75 },
      languages: { base: 179, advanced: 229, live: 75 },
      arts: { base: 129, advanced: 179, live: 75 },
      music: { base: 149, advanced: 199, live: 75 }
    },
    '7': {
      math: { base: 129, advanced: 179, live: 75 },
      science: { base: 179, advanced: 229, live: 75 },
      english: { base: 129, advanced: 179, live: 75 },
      history: { base: 129, advanced: 179, live: 75 },
      geography: { base: 129, advanced: 179, live: 75 },
      computers: { base: 179, advanced: 229, live: 75 },
      languages: { base: 179, advanced: 229, live: 75 },
      arts: { base: 129, advanced: 179, live: 75 },
      music: { base: 149, advanced: 199, live: 75 }
    },
    '8': {
      math: { base: 149, advanced: 199, live: 100 },
      science: { base: 199, advanced: 249, live: 100 },
      english: { base: 149, advanced: 199, live: 100 },
      history: { base: 149, advanced: 199, live: 100 },
      geography: { base: 149, advanced: 199, live: 100 },
      computers: { base: 199, advanced: 249, live: 100 },
      languages: { base: 199, advanced: 249, live: 100 },
      arts: { base: 149, advanced: 199, live: 100 },
      music: { base: 169, advanced: 219, live: 100 }
    },
    '9': {
      math: { base: 149, advanced: 199, live: 100 },
      science: { base: 199, advanced: 249, live: 100 },
      english: { base: 149, advanced: 199, live: 100 },
      history: { base: 149, advanced: 199, live: 100 },
      geography: { base: 149, advanced: 199, live: 100 },
      computers: { base: 199, advanced: 249, live: 100 },
      languages: { base: 199, advanced: 249, live: 100 },
      arts: { base: 149, advanced: 199, live: 100 },
      music: { base: 169, advanced: 219, live: 100 }
    }
  };

  return [
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Algebra, Geometry, and Advanced Math concepts',
      plans: {
        base: basePricing[grade].math.base,
        advanced: basePricing[grade].math.advanced
      },
      liveClassPrice: basePricing[grade].math.live
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Physics, Chemistry, and Biology fundamentals',
      plans: {
        base: basePricing[grade].science.base,
        advanced: basePricing[grade].science.advanced
      },
      liveClassPrice: basePricing[grade].science.live
    },
    {
      id: 'english',
      name: 'English Language',
      description: 'Reading comprehension, Writing skills, and Literature analysis',
      plans: {
        base: basePricing[grade].english.base,
        advanced: basePricing[grade].english.advanced
      },
      liveClassPrice: basePricing[grade].english.live
    },
    {
      id: 'history',
      name: 'History',
      description: 'World History, Civilizations, and Historical Analysis',
      plans: {
        base: basePricing[grade].history.base,
        advanced: basePricing[grade].history.advanced
      },
      liveClassPrice: basePricing[grade].history.live
    },
    {
      id: 'geography',
      name: 'Geography',
      description: 'Physical Geography, Map Skills, and Environmental Studies',
      plans: {
        base: basePricing[grade].geography.base,
        advanced: basePricing[grade].geography.advanced
      },
      liveClassPrice: basePricing[grade].geography.live
    },
    {
      id: 'computers',
      name: 'Computer Science',
      description: 'Programming, Digital Literacy, and Technology Skills',
      plans: {
        base: basePricing[grade].computers.base,
        advanced: basePricing[grade].computers.advanced
      },
      liveClassPrice: basePricing[grade].computers.live
    },
    {
      id: 'languages',
      name: 'Foreign Languages',
      description: 'Spanish, French, German, and other language options',
      plans: {
        base: basePricing[grade].languages.base,
        advanced: basePricing[grade].languages.advanced
      },
      liveClassPrice: basePricing[grade].languages.live
    },
    {
      id: 'arts',
      name: 'Visual Arts',
      description: 'Drawing, Painting, Art History, and Digital Art',
      plans: {
        base: basePricing[grade].arts.base,
        advanced: basePricing[grade].arts.advanced
      },
      liveClassPrice: basePricing[grade].arts.live
    },
    {
      id: 'music',
      name: 'Music',
      description: 'Music Theory, Instrument Basics, and Music Appreciation',
      plans: {
        base: basePricing[grade].music.base,
        advanced: basePricing[grade].music.advanced
      },
      liveClassPrice: basePricing[grade].music.live
    }
  ];
};

const SelectPage = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('6');
  const [selectedSubjects, setSelectedSubjects] = useState<Map<string, SelectedSubject>>(new Map());
  const [showOptionsFor, setShowOptionsFor] = useState<string | null>(null);

  const subjects = getSubjectsForGrade(selectedGrade);

  const scrollToComparison = () => {
    const comparisonSection = document.getElementById('plan-comparison');
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSubjectOptions = (subjectId: string) => {
    setShowOptionsFor(showOptionsFor === subjectId ? null : subjectId);
  };

  const selectSubjectPlan = (subjectId: string, planType: 'base' | 'advanced') => {
    const newSelection = new Map(selectedSubjects);
    newSelection.set(subjectId, {
      id: subjectId,
      planType,
      includeLiveClass: true
    });
    setSelectedSubjects(newSelection);
    setShowOptionsFor(null);
  };

  const toggleLiveClass = (subjectId: string) => {
    const newSelection = new Map(selectedSubjects);
    const current = newSelection.get(subjectId);
    if (current) {
      newSelection.set(subjectId, {
        ...current,
        includeLiveClass: !current.includeLiveClass
      });
      setSelectedSubjects(newSelection);
    }
  };

  const calculateTotal = () => {
    return Array.from(selectedSubjects.values()).reduce((total, selection) => {
      const subject = subjects.find(s => s.id === selection.id);
      if (!subject) return total;
      const planPrice = selection.planType === 'base' ? subject.plans.base : subject.plans.advanced;
      const liveClassPrice = selection.includeLiveClass ? subject.liveClassPrice : 0;
      return total + planPrice + liveClassPrice;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white">
              LearnPlatform
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Starting from $99</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-4">
        {/* Product Title Section */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
                Choose your learning path
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Select your grade and preferred learning plans
              </p>
            </div>
            <button
              onClick={scrollToComparison}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help me choose the best plan</span>
            </button>
          </div>
        </section>

        {/* Grade Selection Section */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
              1
            </span>
            <span>Select Grade</span>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {(['4', '5', '6', '7', '8', '9'] as Grade[]).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`
                  px-6 py-4 rounded-xl transition-all text-center
                  ${selectedGrade === grade 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-200 dark:hover:border-blue-800'
                  }
                `}
              >
                <div className="text-lg font-medium">Grade {grade}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Subjects Selection Section */}
        <section className="py-12">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-8">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
              2
            </span>
            <span>Select Subjects</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Subjects Grid */}
            <div className="flex-1">
              <div className="space-y-6">
                {subjects.map((subject) => (
                  <div 
                    key={subject.id}
                    className={`bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 hover:shadow-xl transition-all min-h-[160px] ${
                      selectedSubjects.has(subject.id) ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start h-full">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{subject.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-base max-w-xl leading-relaxed mb-4">{subject.description}</p>
                        
                        {selectedSubjects.has(subject.id) ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {selectedSubjects.get(subject.id)?.planType === 'base' ? 'Base Plan' : 'Advanced Plan'}
                              </span>
                              <button
                                onClick={() => toggleSubjectOptions(subject.id)}
                                className="text-blue-500 hover:text-blue-600 text-sm"
                              >
                                Change Plan
                              </button>
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <input
                                type="checkbox"
                                checked={selectedSubjects.get(subject.id)?.includeLiveClass || false}
                                onChange={() => toggleLiveClass(subject.id)}
                                className="rounded border-gray-300"
                              />
                              Add Live Classes (+${subject.liveClassPrice}/year)
                            </label>
                          </div>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => toggleSubjectOptions(subject.id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Subject
                            </button>
                            {showOptionsFor === subject.id && (
                              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 space-y-3 z-10">
                                <button
                                  onClick={() => selectSubjectPlan(subject.id, 'base')}
                                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <div className="font-medium text-gray-900 dark:text-white">Base Plan</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-300">${subject.plans.base}/year</div>
                                </button>
                                <button
                                  onClick={() => selectSubjectPlan(subject.id, 'advanced')}
                                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <div className="font-medium text-gray-900 dark:text-white">Advanced Plan</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-300">${subject.plans.advanced}/year</div>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Summary */}
            <div className="lg:w-[380px] xl:w-[420px]">
              <div className="sticky top-[calc(5vh+80px)] bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Summary
                </h3>
                
                {selectedSubjects.size > 0 ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <span>Selected Grade:</span>
                        <span className="font-medium">Grade {selectedGrade}</span>
                      </div>
                      {Array.from(selectedSubjects.values()).map(selection => {
                        const subject = subjects.find(s => s.id === selection.id);
                        if (!subject) return null;
                        const planPrice = selection.planType === 'base' ? subject.plans.base : subject.plans.advanced;
                        return (
                          <div key={subject.id} className="flex justify-between items-start group">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newSelection = new Map(selectedSubjects);
                                    newSelection.delete(subject.id);
                                    setSelectedSubjects(newSelection);
                                  }}
                                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-300">{subject.name}</span>
                                  <div className="text-sm text-gray-500">
                                    {selection.planType === 'base' ? 'Base Plan' : 'Advanced Plan'}
                                    {selection.includeLiveClass && ' + Live Classes'}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              ${planPrice + (selection.includeLiveClass ? subject.liveClassPrice : 0)}
                            </span>
                          </div>
                        );
                      })}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex justify-between items-center font-semibold">
                          <span className="text-gray-900 dark:text-white">Total</span>
                          <span className="text-gray-900 dark:text-white">
                            ${calculateTotal()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-medium transition-colors">
                      Proceed to Checkout
                    </button>
                  </>
                ) : (
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    Select one or more subjects to see the summary
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Plan Comparison Table */}
        <section id="plan-comparison" className="py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12">
              Compare Plans & Features
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="py-4 px-6 text-left text-gray-600 dark:text-gray-300 font-medium">Features</th>
                    <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-semibold">Basic Plan</th>
                    <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-semibold">Advanced Plan</th>
                    <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-semibold">Live Classes (Add-on)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Learning Material Access</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Core curriculum content</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Core + Advanced content</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Live interactive sessions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Practice Questions</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Basic question bank</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Extended question bank + Competition prep</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Real-time doubt solving</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Tests & Assessments</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Monthly tests</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Weekly tests + Personalized feedback</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Live test discussions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Study Materials</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Digital notes</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Digital + Printed study materials</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Additional worksheets & materials</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Support</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Email support</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Priority email & chat support</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Direct teacher support</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Progress Tracking</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Basic progress reports</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Detailed analytics & insights</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Personal progress mentoring</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Learning Tools</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Standard learning tools</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Advanced learning tools & resources</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">Interactive learning sessions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Additional Information section */}
        <section className="bg-gray-50 dark:bg-gray-800 mt-12 py-12">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                All subjects include
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Interactive Learning</h3>
                  <p className="text-gray-600 dark:text-gray-300">Engaging content and practice exercises</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Expert Teachers</h3>
                  <p className="text-gray-600 dark:text-gray-300">Learn from experienced educators</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Progress Reports</h3>
                  <p className="text-gray-600 dark:text-gray-300">Track your academic growth</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SelectPage; 