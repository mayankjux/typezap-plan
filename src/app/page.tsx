"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (showSplash) {
      // Wait for animation to complete before navigating
      setTimeout(() => {
        router.push(selectedVersion === 'A' ? '/select' : '/select-b');
      }, 2000); // Match this with the animation duration
    }
  }, [showSplash, selectedVersion, router]);

  const handleVersionSelect = (version: string, path: string) => {
    
    console.log("path", path)
    setSelectedVersion(version);
    setIsDialogOpen(false);
    setShowSplash(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
          MAIN PAGE IN PROGRESS
        </h1>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
        >
          Test Flow
        </button>
      </div>

      {/* Version Selection Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Select Version
            </h2>
            <div className="space-y-4">
              <div
                className="w-full px-6 py-4 bg-gray-100 text-gray-400 rounded-xl font-medium cursor-not-allowed flex items-center justify-between"
              >
                <span>Version A</span>
                <Lock className="w-4 h-4" />
              </div>
              <button
                onClick={() => handleVersionSelect('B', '/select-b')}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl font-medium transition-colors text-left"
              >
                Version B
              </button>
            </div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-6 w-full px-6 py-3 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-blue-500 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-8 mx-auto"></div>
            <div className="text-white text-2xl font-medium animate-fade-in">
              Entering Version {selectedVersion}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
