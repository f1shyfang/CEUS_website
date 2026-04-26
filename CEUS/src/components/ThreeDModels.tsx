'use client'
import React from 'react';

// Simple fallback component that shows a placeholder
export default function ThreeDModels() {
  // For now, show a simple placeholder while we resolve the React compatibility issues
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🧪</div>
        <div className="text-2xl font-bold text-gray-800 mb-2">Chemical Engineering in 3D</div>
        <div className="text-lg text-gray-600">3D models temporarily unavailable</div>
        <div className="text-sm text-gray-500 mt-2">Working on compatibility with Next.js 15</div>
      </div>
    </div>
  );
}
