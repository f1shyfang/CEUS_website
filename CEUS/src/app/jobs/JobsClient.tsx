'use client';

import React, { useMemo, useState } from 'react';
import { Job, JobType, WorkingRight } from '../../types';
import { JOB_TYPES, WORKING_RIGHTS } from '../../lib/schemas';
import { FaSearch, FaTimes, FaSlidersH, FaBriefcase } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import JobCard from './components/JobCard';
import JobDetails from './components/JobDetails';
import DropdownFilter from './components/DropdownFilter';

interface JobsClientProps {
  jobs: Job[];
}

const JobsClient: React.FC<JobsClientProps> = ({ jobs }) => {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRights, setSelectedRights] = useState<WorkingRight[]>([]);
  const [showOutdated, setShowOutdated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);

  const industryFields = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.industryField) set.add(j.industryField);
    });
    return Array.from(set).sort();
  }, [jobs]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.locations.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    const tSet = new Set(selectedTypes);
    const fSet = new Set(selectedFields);
    const lSet = new Set(selectedLocations);
    const rSet = new Set(selectedRights);

    const filtered = jobs.filter((job) => {
      if (!showOutdated && job.outdated) return false;
      if (tSet.size > 0 && !tSet.has(job.type)) return false;
      if (fSet.size > 0 && !fSet.has(job.industryField)) return false;
      if (lSet.size > 0 && !job.locations.some((l) => lSet.has(l))) return false;
      if (rSet.size > 0 && !job.workingRights.some((r) => rSet.has(r))) return false;
      if (q) {
        const hay = `${job.title} ${job.company.name} ${job.oneLiner ?? ''} ${job.description} ${job.industryField} ${job.type} ${job.locations.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (Boolean(a.isSponsored) !== Boolean(b.isSponsored)) {
        return Number(Boolean(b.isSponsored)) - Number(Boolean(a.isSponsored));
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [jobs, search, selectedTypes, selectedFields, selectedLocations, selectedRights, showOutdated]);

  const selectedJob: Job | null = useMemo(() => {
    if (filteredJobs.length === 0) return null;
    const match = selectedId ? filteredJobs.find((j) => j.id === selectedId) : null;
    return match ?? filteredJobs[0];
  }, [filteredJobs, selectedId]);

  const handleSelect = (job: Job) => {
    setSelectedId(job.id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileDetailsOpen(true);
    }
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedFields.length > 0 ||
    selectedLocations.length > 0 ||
    selectedRights.length > 0 ||
    showOutdated ||
    search.length > 0;

  const clearAll = () => {
    setSearch('');
    setSelectedTypes([]);
    setSelectedFields([]);
    setSelectedLocations([]);
    setSelectedRights([]);
    setShowOutdated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16 lg:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <FaBriefcase className="text-3xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">CEUS Job Board</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Internships, graduate programs, and roles for chemical engineering students.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, company, keyword…"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-900 placeholder-gray-400"
              />
            </div>

            <DropdownFilter
              label="Type"
              options={JOB_TYPES}
              selected={selectedTypes}
              onChange={(next) => setSelectedTypes(next as JobType[])}
              pluralLabel="Types"
            />
            {industryFields.length > 0 && (
              <DropdownFilter
                label="Industry"
                options={industryFields}
                selected={selectedFields}
                onChange={setSelectedFields}
                pluralLabel="Industries"
              />
            )}
            {locations.length > 0 && (
              <DropdownFilter
                label="Location"
                options={locations}
                selected={selectedLocations}
                onChange={setSelectedLocations}
                pluralLabel="Locations"
              />
            )}
            <DropdownFilter
              label="Working Rights"
              options={WORKING_RIGHTS}
              selected={selectedRights}
              onChange={(next) => setSelectedRights(next as WorkingRight[])}
              pluralLabel="Rights"
            />
            <button
              type="button"
              onClick={() => setShowOutdated((v) => !v)}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm whitespace-nowrap transition-colors',
                showOutdated
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              )}
            >
              <FaSlidersH className="w-3 h-3" />
              Outdated
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800"
              >
                <FaTimes className="w-3 h-3" />
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold text-gray-900">{filteredJobs.length}</span>{' '}
          {filteredJobs.length === 1 ? 'Result' : 'Results'}
        </div>

        {/* Master / detail layout */}
        {filteredJobs.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white shadow-lg p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching roles</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {jobs.length === 0
                ? 'No jobs have been posted yet. Check back soon!'
                : 'Try adjusting your filters or clearing your search.'}
            </p>
            {jobs.length > 0 && (
              <button
                onClick={clearAll}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[38%]">
              <div className="lg:h-[calc(100svh-320px)] lg:overflow-y-auto pr-1 space-y-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJob?.id === job.id}
                    onClick={() => handleSelect(job)}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:block lg:w-[62%] lg:h-[calc(100svh-320px)]">
              <JobDetails job={selectedJob} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile details modal */}
      {mobileDetailsOpen && selectedJob && (
        <div className="fixed inset-0 z-50 lg:hidden bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setMobileDetailsOpen(false)}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <FaTimes className="w-3.5 h-3.5" />
              Close
            </button>
          </div>
          <div className="p-4 h-[calc(100svh-49px)] overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <JobDetails job={selectedJob} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsClient;
