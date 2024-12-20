"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import FloatingHelpButton from "../components/FloatingHelpButton";

interface CheckoutItem {
  subject: string;
  planType: "base" | "plus" | "advanced";
  includeLiveClass: boolean;
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
  const grade = searchParams.get("grade") || "6";

  const getItemPrice = (planType: string) => {
    const basePrice = 499;
    switch (planType) {
      case "plus":
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/select-b"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Edit Choices
          </Link>
        </div>

        <div className="bg-[#F9FAFB] dark:bg-gray-800 rounded-3xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="text-4xl">👍</div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              You have made a wonderful choice
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete your{" "}
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              checkout
            </button>{" "}
            to start learning today
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items List */}
          <div className="flex-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Review Your Bundle
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Grade {grade}
              </p>

              <div className="space-y-6">
                {items.map((item: CheckoutItem, index: number) => (
                  <div
                    key={index}
                    className="flex gap-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Image
                        src={getImagePath(item.subject)}
                        alt={item.subject}
                        width={64}
                        height={64}
                        priority
                        className="w-16 h-16"
                        onError={(e) => {
                          console.error(
                            "Image failed to load for subject:",
                            item.subject
                          );
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.subject}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-1">
                        <div className="text-sm text-gray-500">
                          {item.planType === "base"
                            ? "No Add-ons"
                            : item.planType === "plus"
                            ? "Plus Plan"
                            : "Level 2 Prep"}
                          {item.includeLiveClass && (
                            <p>Live Classes (₹{getLiveClassPrice()}/month)</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        ₹
                        {getItemPrice(item.planType) +
                          (item.includeLiveClass
                            ? getLiveClassPrice() * 12
                            : 0)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">per year</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-[380px]">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Estimated tax</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">per year</div>
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
