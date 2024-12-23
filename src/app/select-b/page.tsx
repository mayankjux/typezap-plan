"use client";

import { HelpCircle, Info, Package, X, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import FloatingHelpButton from "../components/FloatingHelpButton";

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

interface SelectedSubject {
  id: string;
  planType: "base" | "advance" | "advanced" | null;
  includeLiveClass: boolean;
  liveClassDuration: "3" | "6" | "12" | null;
}

type Grade = "4" | "5" | "6" | "7" | "8" | "9";

const getSubjectsForGrade = (grade: Grade): Subject[] => {
  const basePricing = {
    base: 499,
    advance: 599, // base + 100
    advanced: 698, // base + 199
    live: 1299, // live class price per month
  };

  return [
    {
      id: "ai",
      name: "Artificial Intelligence",
      description: "Learn AI concepts, machine learning, and data analysis",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "cybersafety",
      name: "Cybersafety",
      description:
        "Digital security, online safety, and cybersecurity fundamentals",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "culture",
      name: "Indian Culture and History",
      description: "Indian heritage, traditions, and historical developments",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "hindi",
      name: "Hindi",
      description: "Hindi language skills, literature, and communication",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "english",
      name: "English",
      description: "English language proficiency and literature",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "law",
      name: "Law and Life",
      description: "Legal awareness, civic responsibilities, and etiquettes",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "gk",
      name: "G.K",
      description: "General Knowledge, current affairs, and world awareness",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
    {
      id: "problemsolving",
      name: "Problem Solving",
      description:
        "Critical thinking, analytical skills, and problem-solving techniques",
      plans: {
        base: basePricing.base,
        advance: basePricing.advance,
        advanced: basePricing.advanced,
      },
      liveClassPrice: basePricing.live,
    },
  ];
};

const SelectPageB = () => {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<Grade>("6");
  const [selectedSubjects, setSelectedSubjects] = useState<
    Map<string, SelectedSubject>
  >(new Map());
  const [showOptionsFor, setShowOptionsFor] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });
  // const [tooltipContent, setTooltipContent] = useState("");
  const [subjectToRemove, setSubjectToRemove] = useState<string | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout>(null);
  const [showDurationDropdown, setShowDurationDropdown] = useState<string | null>(null);

  const subjects = getSubjectsForGrade(selectedGrade);

  const scrollToComparison = () => {
    const comparisonSection = document.getElementById("plan-comparison");
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const toggleSubjectOptions = (subjectId: string) => {
  //   setShowOptionsFor(showOptionsFor === subjectId ? null : subjectId);
  // };

  const selectSubjectPlan = (
    subjectId: string,
    planType: "base" | "advance" | "advanced"
  ) => {
    const newSelection = new Map(selectedSubjects);
    const currentSelection = newSelection.get(subjectId);
    newSelection.set(subjectId, {
      id: subjectId,
      planType,
      includeLiveClass: currentSelection?.includeLiveClass ?? false,
      liveClassDuration: currentSelection?.liveClassDuration ?? "12"
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
        includeLiveClass: !current.includeLiveClass,
        liveClassDuration: !current.includeLiveClass ? "12" : null
      });
      setSelectedSubjects(newSelection);
    }
  };

  const updateLiveClassDuration = (subjectId: string, duration: "3" | "6" | "12") => {
    const newSelection = new Map(selectedSubjects);
    const current = newSelection.get(subjectId);
    if (current) {
      newSelection.set(subjectId, {
        ...current,
        liveClassDuration: duration
      });
      setSelectedSubjects(newSelection);
    }
  };

  // const calculateTotal = () => {
  //   return Array.from(selectedSubjects.values()).reduce((total, selection) => {
  //     const subject = subjects.find((s) => s.id === selection.id);
  //     if (!subject) return total;
  //     const planPrice =
  //       selection.planType === "base"
  //         ? subject.plans.base
  //         : selection.planType === "advance"
  //         ? subject.plans.advance
  //         : subject.plans.advanced;
  //     const liveClassPrice = selection.includeLiveClass
  //       ? subject.liveClassPrice
  //       : 0;
  //     return total + planPrice + liveClassPrice;
  //   }, 0);
  // };

  const handleInfoMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
        show: true,
      });
    },
    []
  );

  const handleInfoMouseLeave = useCallback(() => {
    tooltipTimeout.current = setTimeout(() => {
      setTooltipPosition((prev) => ({ ...prev, show: false }));
    }, 500);
  }, []);

  const handleTooltipMouseEnter = useCallback(() => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
  }, []);

  const handleTooltipMouseLeave = useCallback(() => {
    setTooltipPosition((prev) => ({ ...prev, show: false }));
  }, []);

  const handleCheckout = () => {
    const checkoutItems = Array.from(selectedSubjects.values())
      .map((selection) => {
        const subject = subjects.find((s) => s.id === selection.id);
        if (!subject) return null;
        return {
          subject: subject.name,
          planType: selection.planType,
          includeLiveClass: selection.includeLiveClass,
          price:
            selection.planType === "base"
              ? subject.plans.base
              : selection.planType === "advance"
              ? subject.plans.advance
              : subject.plans.advanced,
          liveClassPrice: subject.liveClassPrice,
        };
      })
      .filter(Boolean);

    const params = new URLSearchParams({
      items: encodeURIComponent(JSON.stringify(checkoutItems)),
      grade: selectedGrade,
    });

    router.push("/checkout?" + params.toString());
  };

  const removeSubject = (subjectId: string) => {
    const newSelection = new Map(selectedSubjects);
    newSelection.delete(subjectId);
    setSelectedSubjects(newSelection);
    setSubjectToRemove(null);
  };

  const getImagePath = (subject: string) => {
    const trimmedSubject = subject.trim().replace(/^"|"$/g, "");
    if (trimmedSubject === "Artificial Intelligence") return "/images/ai.svg";
    if (trimmedSubject === "G.K" || trimmedSubject === "G.K.")
      return "/images/gk.svg";
    return `/images/${trimmedSubject.toLowerCase().replace(/\s+/g, "-")}.svg`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.duration-selector')) {
        setShowDurationDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDurationText = (duration: string) => {
    return duration === "12" ? "1 year" : `${duration} months`;
  };

  return (
    <div className="min-h-screen bg-white">
      {tooltipPosition.show &&
        createPortal(
          <div
            className="fixed pointer-events-auto"
            style={{
              left: tooltipPosition.x + "px",
              top: tooltipPosition.y + "px",
              transform: "translate(-50%, -100%)",
              zIndex: 999999,
            }}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            <div className="mb-2 w-60 bg-gray-900 text-white text-xs rounded-lg shadow-lg p-2.5">
              All the resources you need to prepare for Level 2 of our{" "}
              <a
                href="https://typezapeco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                ECO Olympiads
              </a>
              .
              <div className="absolute top-full left-1/2 -translate-x-1/2 h-2 w-2 bg-gray-900 rotate-45 -mt-1"></div>
            </div>
          </div>,
          document.body
        )}

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
                    {selectedSubjects.has(subject.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubjectToRemove(subject.id);
                        }}
                        className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                    <div className="flex justify-between items-start h-full relative">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Image
                              src={getImagePath(subject.name)}
                              alt={subject.name}
                              width={48}
                              height={48}
                              priority
                              className="w-12 h-12"
                              onError={(e) => {
                                console.error(
                                  "Image failed to load for subject:",
                                  subject.name
                                );
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900">
                            {subject.name}
                            <span className="text-base font-normal text-gray-500 ml-2">
                              from ₹{subject.plans.base} with lifetime access
                            </span>
                          </h3>
                        </div>
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
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                              <input
                                type="checkbox"
                                checked={selectedSubjects.get(subject.id)?.includeLiveClass || false}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleLiveClass(subject.id);
                                }}
                                className="rounded border-gray-300"
                              />
                              Add
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToComparison();
                                }}
                                className="text-blue-500 cursor-pointer -ml-1"
                              >
                                Live Classes
                              </button>
                              {selectedSubjects.get(subject.id)?.includeLiveClass && (
                                <div className="flex items-center -ml-1">
                                  <span>for&nbsp;</span>
                                  <div className="relative duration-selector">
                                    <div 
                                      className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDurationDropdown(showDurationDropdown === subject.id ? null : subject.id);
                                      }}
                                    >
                                      <span className="text-gray-900">{getDurationText(selectedSubjects.get(subject.id)?.liveClassDuration || "12")}</span>
                                      <svg
                                        className={`w-4 h-4 text-gray-400 transition-transform ${showDurationDropdown === subject.id ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </div>
                                    {showDurationDropdown === subject.id && (
                                      <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] z-10">
                                        {["3", "6", "12"].map((duration) => (
                                          <button
                                            key={duration}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              updateLiveClassDuration(subject.id, duration as "3" | "6" | "12");
                                              setShowDurationDropdown(null);
                                            }}
                                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                                              selectedSubjects.get(subject.id)?.liveClassDuration === duration 
                                                ? 'text-blue-500 font-medium' 
                                                : 'text-gray-700'
                                            }`}
                                          >
                                            {getDurationText(duration)}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              &nbsp;₹{subject.liveClassPrice}/month
                              <span className="text-sm text-gray-500">
                                (Recommended)
                              </span>
                            </label>
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
                  <Package className="w-5 h-5" />
                  Your Bundle
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
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-medium transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </>
                ) : (
                  <div className="text-gray-600">
                    Select subjects to see the summary
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Confirmation Dialog */}
        {subjectToRemove &&
          createPortal(
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Remove Subject
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to remove{" "}
                  {subjects.find((s) => s.id === subjectToRemove)?.name} from
                  your bundle?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSubjectToRemove(null)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => removeSubject(subjectToRemove)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

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

              {/* Live Classes */}
              <div className="col-span-12 mt-8">
                <div className="bg-blue-50 rounded-3xl p-8 lg:p-12 border border-blue-100 h-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-3xl font-semibold text-gray-900">
                            Live Classes
                          </h3>
                          <div className="flex items-center gap-2 bg-blue-100 rounded-full py-2 px-4">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-blue-600 font-medium">Monthly subscription</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-lg">Interactive learning with expert teachers</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-blue-600"
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
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Weekly Live Sessions</h4>
                          <p className="text-gray-600">Regular interactive classes with expert teachers to enhance your learning experience and keep you engaged</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Doubt Solving</h4>
                          <p className="text-gray-600">Get personalized attention and clear all your doubts through interactive sessions with subject experts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <HelpCircle className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-semibold text-gray-900 text-center">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Find answers to common questions about our learning plans and
              features
            </p>

            <div className="max-w-3xl mx-auto space-y-6">
              {/* FAQ Item */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What&apos;s included in the Advance add-on?
                </h3>
                <p className="text-gray-600">
                  The Advance add-on includes bonus practice content, regular
                  updates throughout the year, and additional learning materials
                  to help you stay ahead in your studies.
                </p>
              </div>

              {/* FAQ Item */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do the live classes work?
                </h3>
                <p className="text-gray-600">
                  Live classes are conducted weekly by expert teachers. You&apos;ll
                  join interactive sessions where you can ask questions in
                  real-time, participate in discussions, and get personalized
                  guidance.
                </p>
              </div>

              {/* FAQ Item */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What makes the Pro add-on different from Advance?
                </h3>
                <p className="text-gray-600">
                  The Pro add-on includes everything in Advance and adds advanced
                  Olympiad-level content, making it perfect for students aiming
                  to excel in competitive exams and master advanced concepts.
                </p>
              </div>

              {/* FAQ Item */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Can I switch between add-ons later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or modify your add-ons at any time. Your
                  learning progress and materials will be preserved when you
                  switch between plans.
                </p>
              </div>

              {/* FAQ Item */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do doubt-solving sessions work?
                </h3>
                <p className="text-gray-600">
                  Doubt-solving sessions are dedicated times where you can get
                  one-on-one help from our expert teachers. You can ask specific
                  questions about topics you&apos;re struggling with and receive
                  personalized explanations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Top Button */}
        <div className="flex justify-center pb-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-all"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
            <span className="font-medium">Back to Top</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectPageB;
