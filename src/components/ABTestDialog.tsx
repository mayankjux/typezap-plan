'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ABTestDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<'a' | 'b' | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const selectVersion = (version: 'a' | 'b') => {
    setIsOpen(false);
    setShowSplash(true);
    setSelectedVersion(version);
    
    // Wait for animation to complete before redirecting
    setTimeout(() => {
      router.push(version === 'a' ? '/select' : '/select-b');
    }, 2000); // Match this with the animation duration
  };

  if (!isOpen && !showSplash) return null;

  return (
    <>
      {/* Version Selection Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Choose Experience Version
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;re testing two different versions of our platform. Please select one to continue:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectVersion('a')}
                className="px-6 py-4 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                Version A
              </button>
              <button
                onClick={() => selectVersion('b')}
                className="px-6 py-4 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                Version B
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl text-white font-bold animate-fade-up">
              Entering Version {selectedVersion?.toUpperCase()}
            </h1>
            <div className="mt-4 h-1 w-48 mx-auto bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-blue-500 animate-loading-bar" />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 