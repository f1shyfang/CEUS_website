'use client'
import React from 'react';

// ThreeDModelsInner is temporarily disabled
// Three.js dependencies have been removed to reduce bundle size (~950KB savings)
// To re-enable 3D models:
// 1. Run: npm install three @react-three/fiber @react-three/drei @types/three
// 2. Restore this component's original implementation from git history

export default function ThreeDModelsInner() {
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
