"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import FloatingHelpButton from '../components/FloatingHelpButton';

interface CheckoutItem {
  subject: string;
  planType: "base" | "advance" | "advanced";
  includeLiveClass: boolean;
  liveClassDuration: "3" | "6" | "12";
  price: number;
  liveClassPrice: number;
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Checkout />
    </Suspense>
  );
}

function Checkout() {
  const searchParams = useSearchParams();
  const items = JSON.parse(
    decodeURIComponent(searchParams.get("items") || "[]")
  );
  const initialGrade = searchParams.get("grade") || "6";
  const [selectedGrade, setSelectedGrade] = useState(initialGrade);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);

  const grades = ["4", "5", "6", "7", "8", "9"];

  const handleGradeClick = () => {
    setIsGradeDropdownOpen(!isGradeDropdownOpen);
  };

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setIsGradeDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.grade-selector')) {
        setIsGradeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getItemPrice = (planType: string) => {
    const basePrice = 499;
    switch (planType) {
      case "advance":
        return basePrice + 100;
      case "advanced":
        return basePrice + 199;
      default:
        return basePrice;
    }
  };

  const getLiveClassPrice = () => 1299; // Monthly live class price

  const subtotal = items.reduce(
    (total: number, item: CheckoutItem) =>
      total +
      getItemPrice(item.planType) +
      (item.includeLiveClass ? getLiveClassPrice() * 12 : 0),
    0
  );

  useEffect(() => {
    items.forEach((item: CheckoutItem) => {
      const subject = item.subject.trim().replace(/^"|"$/g, "");
      const imagePath = getImagePath(subject);
      console.log("Subject:", subject, "Image path:", imagePath);
    });
  }, [items]);

  const getImagePath = (subject: string) => {
    const trimmedSubject = subject.trim().replace(/^"|"$/g, "");
    if (trimmedSubject === "Artificial Intelligence") return "/images/ai.svg";
    if (trimmedSubject === "G.K" || trimmedSubject === "G.K.")
      return "/images/gk.svg";
    return `/images/${trimmedSubject.toLowerCase().replace(/\s+/g, "-")}.svg`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load for subject');
    e.currentTarget.style.display = 'none';
  };

  const getDurationText = (duration: string) => {
    return duration === "12" ? "1 year" : `${duration} months`;
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/select-b" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-500"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Edit Choices
          </Link>
        </div>

        <div className="bg-[#F9FAFB] rounded-3xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="text-4xl">👍</div>
            <h1 className="text-3xl font-semibold text-gray-900">
              You have made a wonderful choice
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your <button className="text-blue-500 hover:text-blue-600 font-medium">checkout</button> to start learning today
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items List */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-3xl p-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review Your Bundle</h1>
              <div className="flex items-center gap-1 mb-8">
                <div className="relative inline-flex items-center group grade-selector">
                  <div 
                    className="flex items-center cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={handleGradeClick}
                  >
                    <p className="text-gray-600 font-medium">Grade {selectedGrade}</p>
                    <svg
                      className={`w-4 h-4 ml-1 text-gray-400 transition-transform ${isGradeDropdownOpen ? 'rotate-180' : ''}`}
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
                  {isGradeDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] z-10">
                      {grades.map((grade) => (
                        <button
                          key={grade}
                          onClick={() => handleGradeSelect(grade)}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                            selectedGrade === grade ? 'text-blue-500 font-medium' : 'text-gray-700'
                          }`}
                        >
                          Grade {grade}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {items.map((item: CheckoutItem, index: number) => (
                  <div key={index} className="flex gap-6 pb-6 border-b border-gray-200 last:border-0">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Image
                        src={getImagePath(item.subject)}
                        alt={item.subject}
                        width={64}
                        height={64}
                        priority
                        className="w-16 h-16"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900">{item.subject}</h3>
                        <div className="text-lg font-medium text-gray-900">
                          ₹{getItemPrice(item.planType) + (item.includeLiveClass ? getLiveClassPrice() * 12 : 0)}
                        </div>
                      </div>
                      <div className="space-y-1 mt-1">
                        {item.planType !== "base" && (
                          <div className="text-sm text-gray-500">
                            {item.planType === "advance" ? "Advance" : "Pro"} ₹{getItemPrice(item.planType) - getItemPrice("base")}
                          </div>
                        )}
                        {item.includeLiveClass && (
                          <div className="text-sm text-gray-500">
                            Live Classes for <span className="text-gray-700 font-medium">{getDurationText(item.liveClassDuration)}</span> ₹{getLiveClassPrice() * parseInt(item.liveClassDuration)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {items.some((item: CheckoutItem) => item.includeLiveClass) && (
                  <p className="text-xs text-gray-500 mt-4">
                    * Live Classes are billed at ₹{getLiveClassPrice()}/month per subject
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-[380px]">
            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Amount</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-medium transition-colors">
                Check Out
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Your purchase is protected under our{" "}
                <Link
                  href="/terms"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <FloatingHelpButton />
    </div>
  );
}
