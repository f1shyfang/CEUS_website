'use client'
import React, { useEffect } from 'react';
import { Job } from '../../types';
import { FaMapMarkerAlt, FaClock, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import OptimizedImage from '../../components/OptimizedImage';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  const deadlineDate = job.applicationDeadline ? new Date(job.applicationDeadline) : null;
  const daysUntilDeadline = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h2 id="job-modal-title" className="text-xl font-bold text-gray-900 truncate pr-4">
            {job.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Company header */}
          <div className="flex items-center gap-4 mb-6">
            {job.logoUrl ? (
              <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center p-2 border border-gray-200">
                <OptimizedImage
                  src={job.logoUrl}
                  alt={`${job.company} logo`}
                  width={56}
                  height={56}
                  className="object-contain max-h-14"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {job.company.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {job.jobType}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {job.category}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            {job.location && (
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                {job.location}
              </span>
            )}
            {deadlineDate && (
              <span className={`flex items-center gap-1.5 font-medium ${
                daysUntilDeadline !== null && daysUntilDeadline <= 7 ? 'text-red-500' : 'text-gray-600'
              }`}>
                <FaClock className="w-4 h-4" />
                Apply by {format(deadlineDate, 'MMM d, yyyy')}
                {daysUntilDeadline !== null && ` (${daysUntilDeadline}d left)`}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {job.description}
          </div>

          {/* Apply button */}
          {job.applicationUrl && (
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors gap-2"
            >
              Apply Now
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobModal;
