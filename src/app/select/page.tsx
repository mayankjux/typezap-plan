"use client";

import { useState, useEffect } from "react";
import { HelpCircle, ShoppingCart, Plus, X, Info } from "lucide-react";
import FloatingHelpButton from "@/components/FloatingHelpButton";

type Grade = "4" | "5" | "6" | "7" | "8" | "9";

interface Subject {
  id: string;
  name: string;
  description: string;
  plans: {
    base: number;
    advance: number;
    advanced: number;
  };
  liveClassPrice: number;
}

interface SubjectSelection {
  id: string;
  planType: "base" | "advance" | "advanced";
  includeLiveClass: boolean;
  liveClassDuration: "12";
}

const subjects: Subject[] = [
  {
    id: "math",
    name: "Mathematics",
    description: "Master mathematical concepts through interactive learning and problem-solving.",
    plans: {
      base: 4999,
      advance: 7999,
      advanced: 9999,
    },
    liveClassPrice: 2999,
  },
  {
    id: "science",
    name: "Science",
    description: "Explore scientific principles with hands-on experiments and engaging content.",
    plans: {
      base: 5999,
      advance: 8999,
      advanced: 10999,
    },
    liveClassPrice: 3499,
  },
  {
    id: "english",
    name: "English",
    description: "Develop strong language skills through comprehensive reading and writing practice.",
    plans: {
      base: 3999,
      advance: 6999,
      advanced: 8999,
    },
    liveClassPrice: 2499,
  },
];

const SelectPage = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>();
  const [selectedSubjects, setSelectedSubjects] = useState<Map<string, SubjectSelection>>(new Map());
  const [showOptionsFor, setShowOptionsFor] = useState<string | null>(null);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [subjectToRemove, setSubjectToRemove] = useState<string | null>(null);

  const handleInfoMouseEnter = () => {
    setShowInfoTooltip(true);
  };

  const handleInfoMouseLeave = () => {
    setShowInfoTooltip(false);
  };

  const selectSubjectPlan = (subjectId: string, planType: "base" | "advance" | "advanced") => {
    const newSelection = new Map(selectedSubjects);
    newSelection.set(subjectId, {
      id: subjectId,
      planType,
      includeLiveClass: selectedSubjects.get(subjectId)?.includeLiveClass || false,
      liveClassDuration: "12",
    });
    setSelectedSubjects(newSelection);
    setShowOptionsFor(null);
  };

  const scrollToComparison = () => {
    const element = document.getElementById("plan-comparison");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <FloatingHelpButton />

      <main className="max-w-[1400px] mx-auto px-4">
        {/* Product Title Section */}
        <section className="py-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
                Choose your learning path
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Select your grade and preferred learning plans
              </p>
            </div>
            <button
              onClick={scrollToComparison}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help me choose the best plan</span>
            </button>
          </div>
        </section>

        {/* Grade Selection Section */}
        <section className="py-8 border-b border-gray-200">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
              1
            </span>
            <span>Select Grade</span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {(["4", "5", "6", "7", "8", "9"] as Grade[]).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`
                  px-6 py-3 rounded-lg transition-all text-center
                  ${
                    selectedGrade === grade
                      ? "bg-white shadow-md border border-blue-200 text-blue-600"
                      : "bg-white border border-gray-100 text-gray-500 hover:border-gray-200 hover:shadow-sm"
                  }
                `}
              >
                <div className="text-base font-medium">Grade {grade}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Subjects Selection Section */}
        <section className="py-12 relative">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-8">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
              2
            </span>
            <span>Select Subjects</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Subjects Grid */}
            <div className="flex-1">
              <div className="space-y-5 relative">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => {
                      if (!selectedSubjects.has(subject.id)) {
                        setShowOptionsFor(subject.id);
                        const newSelection = new Map(selectedSubjects);
                        newSelection.set(subject.id, {
                          id: subject.id,
                          planType: "base",
                          includeLiveClass: false,
                          liveClassDuration: "12"
                        });
                        setSelectedSubjects(newSelection);
                      }
                    }}
                    className={`bg-gray-50 rounded-3xl px-8 pt-8 pb-4 transition-all duration-300 min-h-[160px] relative
                      ${
                        selectedSubjects.has(subject.id) ||
                        showOptionsFor === subject.id
                          ? "bg-white shadow-md border border-blue-200 text-blue-600"
                          : "hover:shadow-xl cursor-pointer border border-gray-100 hover:border-gray-200"
                      }
                    `}
                  >
                    <div className="flex justify-between items-start h-full">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                          {subject.name}
                        </h3>
                        <p
                          className={`text-gray-600 text-base max-w-xl leading-relaxed ${
                            selectedSubjects.has(subject.id) ||
                            showOptionsFor === subject.id
                              ? "mb-4"
                              : ""
                          }`}
                        >
                          {subject.description}
                        </p>

                        {selectedSubjects.has(subject.id) ||
                        showOptionsFor === subject.id ? (
                          <div className="space-y-6 relative min-h-[120px]">
                            <div className="grid grid-cols-3 gap-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectSubjectPlan(subject.id, "base");
                                }}
                                className={`px-4 py-3 rounded-xl text-center transition-all relative overflow-hidden h-[100px] flex flex-col justify-center
                                  ${
                                    selectedSubjects.get(subject.id)
                                      ?.planType === "base"
                                      ? "bg-white border-2 border-blue-500 text-blue-500"
                                      : showOptionsFor === subject.id
                                      ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                                      : "bg-[#F9FAFB] text-gray-600 hover:bg-gray-50"
                                  }
                                `}
                              >
                                <div className="relative z-10 w-full text-center">
                                  <div className="font-medium">No Add-ons</div>
                                </div>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectSubjectPlan(subject.id, "advance");
                                }}
                                className={`px-4 py-3 rounded-xl text-center transition-all relative overflow-hidden h-[100px] flex flex-col justify-center
                                  ${
                                    selectedSubjects.get(subject.id)
                                      ?.planType === "advance"
                                      ? "bg-white border-2 border-blue-500 text-blue-500"
                                      : "bg-[#F9FAFB] text-gray-600 hover:bg-gray-50"
                                  }
                                `}
                              >
                                <div className="relative z-10 w-full text-center">
                                  <div className="font-medium">Advance</div>
                                  <div className="text-sm opacity-90">
                                    Bonus content and regular updates
                                  </div>
                                  <div className="text-xs mt-1">
                                    +₹{subject.plans.advance - subject.plans.base}
                                  </div>
                                </div>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectSubjectPlan(subject.id, "advanced");
                                }}
                                className={`px-4 py-3 rounded-xl text-center transition-all relative h-[100px] flex flex-col justify-center
                                  ${
                                    selectedSubjects.get(subject.id)
                                      ?.planType === "advanced"
                                      ? "bg-white border-2 border-blue-500 text-blue-500"
                                      : "bg-[#F9FAFB] text-gray-600 hover:bg-gray-50"
                                  }
                                `}
                              >
                                <div className="relative w-full text-center">
                                  <div className="font-medium">Pro</div>
                                  <div className="text-sm opacity-90">
                                    Advance + Level 2 prep content
                                    <span className="inline-flex items-center justify-center">
                                      <div
                                        className="relative ml-1"
                                        onMouseEnter={handleInfoMouseEnter}
                                        onMouseLeave={handleInfoMouseLeave}
                                      >
                                        <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                                      </div>
                                    </span>
                                  </div>
                                  <div className="text-xs mt-1">
                                    +₹{subject.plans.advanced - subject.plans.base}
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Summary */}
            <div className="lg:w-[380px] xl:w-[420px]">
              <div className="sticky top-[calc(5vh+80px)] bg-gray-50 rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Summary
                </h3>

                {selectedSubjects.size > 0 ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>Selected Grade:</span>
                        <span className="font-medium">
                          Grade {selectedGrade}
                        </span>
                      </div>
                      {Array.from(selectedSubjects.values()).map(
                        (selection) => {
                          const subject = subjects.find(
                            (s) => s.id === selection.id
                          );
                          if (!subject) return null;
                          return (
                            <div
                              key={subject.id}
                              className="flex justify-between items-start group"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      setSubjectToRemove(subject.id)
                                    }
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                  <div>
                                    <span className="text-gray-600">
                                      {subject.name}
                                    </span>
                                    <div className="text-sm text-gray-500">
                                      {selection.planType ? (
                                        <>
                                          {selection.planType === "base"
                                            ? "No Add-ons"
                                            : selection.planType === "advance"
                                            ? "Advance"
                                            : "Pro"}
                                          {selection.includeLiveClass &&
                                            " + Live Classes"}
                                        </>
                                      ) : (
                                        "Select a plan"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No subjects selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Plan Comparison Section */}
        <section
          id="plan-comparison"
          className="py-16 border-t border-gray-200"
        >
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                Choose Perfect Add-ons
              </h2>
              <p className="text-lg text-gray-600">
                Select what best fits your learning goals and aspirations
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Advance Plan */}
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-200 h-full">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        Advance
                      </h3>
                      <p className="text-gray-500">Perfect for students looking to excel in their studies</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <svg
                        className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Bonus Content</h4>
                        <p className="text-sm text-gray-600">Additional practice materials for enhanced learning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <svg
                        className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Year Round Updates</h4>
                        <p className="text-sm text-gray-600">Stay up-to-date with new content throughout the year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-200 h-full">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        Pro
                      </h3>
                      <p className="text-gray-500">For students aiming for excellence in ECO Olympiads</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <svg
                        className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Everything in Advance</h4>
                        <p className="text-sm text-gray-600">All bonus content and year round updates included</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <svg
                        className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Level 2 Preparation Content</h4>
                        <p className="text-sm text-gray-600">Advanced materials for ECO Olympiads preparation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information section */}
        <section className="bg-gray-50 mt-12 py-12">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                All subjects include
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Interactive Learning
                  </h3>
                  <p className="text-gray-600">
                    Engaging content and practice exercises
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Expert Teachers
                  </h3>
                  <p className="text-gray-600">
                    Learn from experienced educators
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Progress Reports
                  </h3>
                  <p className="text-gray-600">
                    Track your academic growth
                  </p>
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
