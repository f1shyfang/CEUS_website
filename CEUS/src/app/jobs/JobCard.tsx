'use client'
import React from 'react';
import { Job } from '../../types';
import { FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import OptimizedImage from '../../components/OptimizedImage';

interface JobCardProps {
  job: Job;
  onSelect: () => void;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelect, featured }) => {
  const deadlineDate = job.applicationDeadline ? new Date(job.applicationDeadline) : null;
  const daysUntilDeadline = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div
      onClick={onSelect}
      className={`group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border cursor-pointer flex flex-col h-full ${
        featured ? 'border-yellow-400 ring-2 ring-yellow-400/30' : 'border-gray-100'
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-md">
            <FaStar className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      {/* Logo */}
      <div className="flex items-center justify-center h-40 bg-gray-50 p-6">
        {job.logoUrl ? (
          <OptimizedImage
            src={job.logoUrl}
            alt={`${job.company} logo`}
            width={120}
            height={60}
            className="object-contain max-h-16"
          />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {job.company.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
          {job.company}
        </span>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {job.jobType}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {job.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
          {job.location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-3 h-3" />
              {job.location}
            </span>
          )}
          {daysUntilDeadline !== null && (
            <span className={`flex items-center gap-1 font-medium ${
              daysUntilDeadline <= 7 ? 'text-red-500' : 'text-gray-500'
            }`}>
              <FaClock className="w-3 h-3" />
              {daysUntilDeadline > 0
                ? `${daysUntilDeadline}d left`
                : 'Closing soon'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(JobCard);
