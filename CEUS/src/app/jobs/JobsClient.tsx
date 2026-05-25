'use client'
import React, { useState, useMemo } from 'react';
import { Job } from '../../types';
import JobCard from './JobCard';
import JobModal from './JobModal';
import EventFilterButton from '../../components/EventFilterButton';
import { FaBriefcase, FaFilter } from 'react-icons/fa';
import { JOB_TYPES, JOB_CATEGORIES } from '../../lib/schemas';

interface JobsClientProps {
  jobs: Job[];
}

const JobsClient: React.FC<JobsClientProps> = ({ jobs }) => {
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const now = useMemo(() => new Date(), []);

  const activeJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (job.applicationDeadline && new Date(job.applicationDeadline) < now) return false;
      if (activeTypeFilter && job.jobType !== activeTypeFilter) return false;
      if (activeCategoryFilter && job.category !== activeCategoryFilter) return false;
      return true;
    });
  }, [jobs, now, activeTypeFilter, activeCategoryFilter]);

  const expiredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!job.applicationDeadline) return false;
      if (new Date(job.applicationDeadline) >= now) return false;
      return true;
    });
  }, [jobs, now]);

  const featuredJobs = useMemo(() => activeJobs.filter((j) => j.featured), [activeJobs]);
  const regularJobs = useMemo(() => activeJobs.filter((j) => !j.featured), [activeJobs]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <div className="mb-6">
              <FaBriefcase className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">Job Board</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto">
              Explore career opportunities curated for CEUS students
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <FaFilter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Filter by:</span>
          </div>

          {/* Job Type Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {JOB_TYPES.map((type) => (
              <EventFilterButton
                key={type}
                label={type}
                isActive={activeTypeFilter === type}
                onClick={() =>
                  setActiveTypeFilter((prev) => (prev === type ? null : type))
                }
              />
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {JOB_CATEGORIES.map((cat) => (
              <EventFilterButton
                key={cat}
                label={cat}
                isActive={activeCategoryFilter === cat}
                onClick={() =>
                  setActiveCategoryFilter((prev) => (prev === cat ? null : cat))
                }
              />
            ))}
          </div>
        </div>

        {/* Active Jobs Count */}
        <p className="text-center text-gray-500 mb-8">
          {activeJobs.length} active job{activeJobs.length !== 1 ? 's' : ''} found
          {activeJobs.length > 0 && expiredJobs.length > 0 && (
            <span className="text-gray-400"> &middot; {expiredJobs.length} expired</span>
          )}
        </p>

        {/* Featured Section */}
        {featuredJobs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Featured Opportunities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredJobs.map((job, index) => (
                <div
                  key={`featured-${job.id}`}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <JobCard job={job} onSelect={() => setSelectedJob(job)} featured />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Active Jobs */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {featuredJobs.length > 0 ? 'All Listings' : 'Open Positions'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-8"></div>

          {regularJobs.length === 0 && featuredJobs.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaBriefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Open Positions</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                There are no active job listings right now. Check back soon or follow us on social media for updates!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <JobCard job={job} onSelect={() => setSelectedJob(job)} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Job Detail Modal */}
      <JobModal job={selectedJob} isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} />

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobsClient;
