'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiPlus, FiBriefcase, FiExternalLink, FiMapPin, FiStar, FiAlertTriangle } from 'react-icons/fi';
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
import {
  jobSchema,
  JobFormData,
  JOB_TYPES,
  WORKING_RIGHTS,
  INDUSTRY_FIELDS,
} from '@/lib/schemas';
import { Job, WorkingRight } from '@/types';
import { format } from 'date-fns';

const linesToArray = (s: string) =>
  s
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mirror array fields in textareas so admins can edit them as plain text.
  const [locationsText, setLocationsText] = useState('');
  const [sourceUrlsText, setSourceUrlsText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: { name: '', website: '', logo: '' },
      description: '',
      oneLiner: '',
      applicationUrl: '',
      sourceUrls: [],
      type: 'Internship',
      locations: [],
      industryField: 'Other',
      workingRights: [],
      closeDate: '',
      isSponsored: false,
      outdated: false,
    },
  });

  const companyLogo = watch('company.logo');

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
      company: { name: '', website: '', logo: '' },
      description: '',
      oneLiner: '',
      applicationUrl: '',
      sourceUrls: [],
      type: 'Internship',
      locations: [],
      industryField: 'Other',
      workingRights: [],
      closeDate: '',
      isSponsored: false,
      outdated: false,
    });
    setLocationsText('');
    setSourceUrlsText('');
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    reset({
      title: job.title,
      company: {
        name: job.company.name,
        website: job.company.website || '',
        logo: job.company.logo || '',
      },
      description: job.description,
      oneLiner: job.oneLiner || '',
      applicationUrl: job.applicationUrl,
      sourceUrls: job.sourceUrls,
      type: job.type,
      locations: job.locations,
      industryField: job.industryField,
      workingRights: job.workingRights,
      closeDate: job.closeDate ? job.closeDate.slice(0, 16) : '',
      isSponsored: Boolean(job.isSponsored),
      outdated: Boolean(job.outdated),
    });
    setLocationsText(job.locations.join('\n'));
    setSourceUrlsText(job.sourceUrls.join('\n'));
    setIsModalOpen(true);
  };

  const openDeleteModal = (job: Job) => {
    setDeletingJob(job);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      const payload = {
        title: data.title,
        company: {
          name: data.company.name,
          website: data.company.website || undefined,
          logo: data.company.logo || undefined,
        },
        description: data.description,
        oneLiner: data.oneLiner || undefined,
        applicationUrl: data.applicationUrl,
        sourceUrls: data.sourceUrls,
        type: data.type,
        locations: data.locations,
        industryField: data.industryField,
        workingRights: data.workingRights,
        closeDate: data.closeDate ? new Date(data.closeDate).toISOString() : undefined,
        isSponsored: data.isSponsored,
        outdated: data.outdated,
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
      label: 'Role',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.company.logo}
              alt={row.company.name}
              className="w-10 h-10 rounded object-contain bg-white p-1"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center">
              <FiBriefcase className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium flex items-center gap-1">
              {row.title}
              {row.isSponsored && <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
              {row.outdated && (
                <span title="Marked outdated">
                  <FiAlertTriangle className="w-3 h-3 text-red-400" />
                </span>
              )}
            </span>
            <span className="text-xs text-gray-400">{row.company.name}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'locations',
      label: 'Locations',
      render: (value) => {
        const list = (value as string[]) ?? [];
        return (
          <div className="flex items-center gap-2 text-sm">
            <FiMapPin className="w-4 h-4 text-gray-500" />
            <span className="truncate max-w-[180px]">{list.join(', ') || '-'}</span>
          </div>
        );
      },
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
          {value as string}
        </span>
      ),
    },
    {
      key: 'industryField',
      label: 'Field',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
          {value as string}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-300">
          {format(new Date(value as string), 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      key: 'applicationUrl',
      label: 'Apply',
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <p className="text-gray-400 mt-1">Manage job postings for the CEUS job board</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <FiPlus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      <DataTable
        columns={columns}
        data={jobs}
        keyField="id"
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        isLoading={isLoading}
        emptyMessage="No jobs posted yet. Add your first job!"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? 'Edit Job' : 'Create Job'}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Job Title" error={errors.title?.message} required>
            <FormInput {...register('title')} placeholder="e.g. Graduate Process Engineer" error={!!errors.title} />
          </FormField>

          <FormField label="One-liner" error={errors.oneLiner?.message}>
            <FormInput
              {...register('oneLiner')}
              placeholder="Short tagline shown under the title"
              error={!!errors.oneLiner}
            />
          </FormField>

          {/* Company group */}
          <div className="rounded-lg border border-gray-700 p-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-300">Company</h3>
            <FormField label="Company Name" error={errors.company?.name?.message} required>
              <FormInput
                {...register('company.name')}
                placeholder="e.g. BASF"
                error={!!errors.company?.name}
              />
            </FormField>
            <FormField label="Company Website" error={errors.company?.website?.message}>
              <FormInput
                {...register('company.website')}
                type="url"
                placeholder="https://company.com"
                error={!!errors.company?.website}
              />
            </FormField>
            <FormField label="Company Logo" error={errors.company?.logo?.message}>
              <ImageUpload
                bucket={STORAGE_BUCKETS.PUBLIC_IMAGES}
                folder={STORAGE_FOLDERS.SPONSORS}
                currentUrl={companyLogo}
                onUpload={(url) => setValue('company.logo', url)}
                onRemove={() => setValue('company.logo', '')}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Type" error={errors.type?.message} required>
              <FormSelect {...register('type')} error={!!errors.type}>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </FormSelect>
            </FormField>

            <FormField label="Industry Field" error={errors.industryField?.message} required>
              <FormSelect {...register('industryField')} error={!!errors.industryField}>
                {INDUSTRY_FIELDS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </FormSelect>
            </FormField>
          </div>

          <FormField
            label="Locations"
            error={
              Array.isArray(errors.locations)
                ? undefined
                : (errors.locations as { message?: string } | undefined)?.message
            }
            required
          >
            <FormTextarea
              value={locationsText}
              onChange={(e) => {
                setLocationsText(e.target.value);
                setValue('locations', linesToArray(e.target.value), { shouldValidate: true });
              }}
              placeholder={'One location per line\nSydney, NSW\nMelbourne, VIC\nRemote'}
              rows={3}
              error={!!errors.locations}
            />
          </FormField>

          <FormField label="Description" error={errors.description?.message} required>
            <FormTextarea
              {...register('description')}
              placeholder="Describe the role, responsibilities, and requirements"
              rows={6}
              error={!!errors.description}
            />
          </FormField>

          <FormField label="Application URL" error={errors.applicationUrl?.message} required>
            <FormInput
              {...register('applicationUrl')}
              type="url"
              placeholder="https://company.com/careers/..."
              error={!!errors.applicationUrl}
            />
          </FormField>

          <FormField
            label="Source URLs"
            error={
              Array.isArray(errors.sourceUrls)
                ? undefined
                : (errors.sourceUrls as { message?: string } | undefined)?.message
            }
          >
            <FormTextarea
              value={sourceUrlsText}
              onChange={(e) => {
                setSourceUrlsText(e.target.value);
                setValue('sourceUrls', linesToArray(e.target.value), { shouldValidate: true });
              }}
              placeholder={'One URL per line\nhttps://linkedin.com/jobs/...\nhttps://seek.com.au/job/...'}
              rows={3}
              error={!!errors.sourceUrls}
            />
          </FormField>

          <FormField label="Close Date" error={errors.closeDate?.message}>
            <FormInput
              {...register('closeDate')}
              type="datetime-local"
              error={!!errors.closeDate}
            />
          </FormField>

          <FormField label="Working Rights">
            <Controller
              control={control}
              name="workingRights"
              render={({ field }) => {
                const selected = new Set<WorkingRight>(field.value ?? []);
                const toggle = (value: WorkingRight) => {
                  const next = new Set(selected);
                  if (next.has(value)) next.delete(value);
                  else next.add(value);
                  field.onChange(Array.from(next));
                };
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WORKING_RIGHTS.map((r) => (
                      <label key={r} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected.has(r)}
                          onChange={() => toggle(r)}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        {r}
                      </label>
                    ))}
                  </div>
                );
              }}
            />
          </FormField>

          <div className="space-y-2">
            <FormField label="Sponsored">
              <FormCheckbox
                {...register('isSponsored')}
                label="Pin this job to the top of the board"
              />
            </FormField>
            <FormField label="Outdated">
              <FormCheckbox
                {...register('outdated')}
                label="Mark this listing as outdated (hidden by default on the public board)"
              />
            </FormField>
          </div>

          <FormActions
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={isSubmitting}
            submitLabel={editingJob ? 'Update Job' : 'Create Job'}
          />
        </form>
      </FormModal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message={`Are you sure you want to delete "${deletingJob?.title}" at ${deletingJob?.company.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
