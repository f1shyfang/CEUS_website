'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiPlus, FiExternalLink, FiStar } from 'react-icons/fi';
import { format } from 'date-fns';
import {
  DataTable,
  Column,
  DeleteConfirmModal,
  FormModal,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormActions,
  ImageUpload,
} from '@/components/admin';
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  STORAGE_BUCKETS,
  STORAGE_FOLDERS,
} from '@/lib/supabase';
import { jobSchema, JobFormData, JOB_TYPES, JOB_CATEGORIES } from '@/lib/schemas';
import { Job } from '@/types';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: '',
      description: '',
      applicationUrl: '',
      applicationDeadline: '',
      location: '',
      jobType: 'Full-time',
      category: 'General',
      logoUrl: '',
      featured: false,
    },
  });

  const logoUrl = watch('logoUrl');

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const openCreateModal = () => {
    setEditingJob(null);
    reset({
      title: '',
      company: '',
      description: '',
      applicationUrl: '',
      applicationDeadline: '',
      location: '',
      jobType: 'Full-time',
      category: 'General',
      logoUrl: '',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    reset({
      title: job.title,
      company: job.company,
      description: job.description,
      applicationUrl: job.applicationUrl || '',
      applicationDeadline: job.applicationDeadline
        ? job.applicationDeadline.slice(0, 16)
        : '',
      location: job.location || '',
      jobType: job.jobType as JobFormData['jobType'],
      category: job.category as JobFormData['category'],
      logoUrl: job.logoUrl || '',
      featured: job.featured || false,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (job: Job) => {
    setDeletingJob(job);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      const payload = {
        ...data,
        applicationDeadline: data.applicationDeadline
          ? new Date(data.applicationDeadline).toISOString()
          : undefined,
      };

      if (editingJob) {
        await updateJob(editingJob.id, payload);
      } else {
        await createJob(payload);
      }
      setIsModalOpen(false);
      loadJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingJob) return;
    setIsDeleting(true);
    try {
      await deleteJob(deletingJob.id);
      setIsDeleteModalOpen(false);
      setDeletingJob(null);
      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Job>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.featured && <FiStar className="w-4 h-4 text-yellow-400" />}
          <div>
            <span className="font-medium">{row.title}</span>
            <span className="block text-sm text-gray-400">{row.company}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'jobType',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
          {value as string}
        </span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
          {value as string}
        </span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) =>
        value ? (
          <span className="text-gray-300">{value as string}</span>
        ) : (
          <span className="text-gray-500">-</span>
        ),
    },
    {
      key: 'applicationDeadline',
      label: 'Deadline',
      sortable: true,
      render: (value) =>
        value ? (
          <span className="text-gray-300">
            {format(new Date(value as string), 'MMM d, yyyy')}
          </span>
        ) : (
          <span className="text-gray-500">-</span>
        ),
    },
    {
      key: 'applicationUrl',
      label: 'Link',
      render: (value) =>
        value ? (
          <a
            href={value as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            <FiExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <span className="text-gray-500">-</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <p className="text-gray-400 mt-1">Manage job board listings</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <FiPlus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={jobs}
        keyField="id"
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        isLoading={isLoading}
        emptyMessage="No jobs found. Create your first job listing!"
      />

      {/* Create/Edit Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? 'Edit Job' : 'Create Job'}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Job Title" error={errors.title?.message} required>
              <FormInput
                {...register('title')}
                placeholder="e.g. Graduate Structural Engineer"
                error={!!errors.title}
              />
            </FormField>

            <FormField label="Company" error={errors.company?.message} required>
              <FormInput
                {...register('company')}
                placeholder="e.g. Arup"
                error={!!errors.company}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Job Type" error={errors.jobType?.message} required>
              <FormSelect {...register('jobType')} error={!!errors.jobType}>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </FormSelect>
            </FormField>

            <FormField label="Category" error={errors.category?.message} required>
              <FormSelect {...register('category')} error={!!errors.category}>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </FormSelect>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Location" error={errors.location?.message}>
              <FormInput
                {...register('location')}
                placeholder="e.g. Sydney, Remote"
                error={!!errors.location}
              />
            </FormField>

            <FormField label="Application Deadline" error={errors.applicationDeadline?.message}>
              <FormInput
                {...register('applicationDeadline')}
                type="datetime-local"
                error={!!errors.applicationDeadline}
              />
            </FormField>
          </div>

          <FormField label="Description" error={errors.description?.message} required>
            <FormTextarea
              {...register('description')}
              placeholder="Job description, requirements, and benefits..."
              rows={6}
              error={!!errors.description}
            />
          </FormField>

          <FormField label="Application URL" error={errors.applicationUrl?.message}>
            <FormInput
              {...register('applicationUrl')}
              type="url"
              placeholder="https://company.com/apply"
              error={!!errors.applicationUrl}
            />
          </FormField>

          <FormField label="Company Logo" error={errors.logoUrl?.message}>
            <ImageUpload
              bucket={STORAGE_BUCKETS.PUBLIC_IMAGES}
              folder={STORAGE_FOLDERS.JOBS}
              currentUrl={logoUrl}
              onUpload={(url) => setValue('logoUrl', url)}
              onRemove={() => setValue('logoUrl', '')}
            />
          </FormField>

          <FormCheckbox {...register('featured')} label="Featured listing (shown at top of page)" />

          <FormActions
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={isSubmitting}
            submitLabel={editingJob ? 'Update Job' : 'Create Job'}
          />
        </form>
      </FormModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message={`Are you sure you want to delete "${deletingJob?.title}" at ${deletingJob?.company}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
