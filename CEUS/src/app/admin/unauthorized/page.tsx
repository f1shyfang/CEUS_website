'use client';

import { FiAlertCircle } from 'react-icons/fi';

export default function AdminUnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center space-y-4">
        <FiAlertCircle className="w-8 h-8 text-yellow-400 mx-auto" />
        <h1 className="text-xl font-semibold text-white">Access restricted</h1>
        <p className="text-gray-400">
          Your account does not have admin access. Please contact an administrator if
          you believe this is an error.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          Return to website
        </a>
      </div>
    </div>
  );
}
