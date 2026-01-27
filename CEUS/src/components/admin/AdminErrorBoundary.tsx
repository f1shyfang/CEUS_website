'use client';

import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface AdminErrorBoundaryProps {
  children: React.ReactNode;
}

interface AdminErrorBoundaryState {
  hasError: boolean;
}

export default class AdminErrorBoundary extends React.Component<
  AdminErrorBoundaryProps,
  AdminErrorBoundaryState
> {
  state: AdminErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Admin error boundary caught an error:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center space-y-4">
            <FiAlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
            <p className="text-gray-400">
              The admin panel hit an unexpected error. Please try again.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              <FiRefreshCw className="w-4 h-4" />
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
