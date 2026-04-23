'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiPlus, FiExternalLink, FiStar } from 'react-icons/fi';
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
  fetchSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  STORAGE_BUCKETS,
  STORAGE_FOLDERS,
} from '@/lib/supabase';
import { sponsorSchema, SponsorFormData, SPONSOR_TIERS } from '@/lib/schemas';
import { Sponsor } from '@/types';

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [deletingSponsor, setDeletingSponsor] = useState<Sponsor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      name: '',
      logoUrl: '',
      websiteUrl: '',
      description: '',
      tier: 'Other',
      featured: false,
    },
  });

  const logoUrl = watch('logoUrl');

  const loadSponsors = async () => {
    try {
      const data = await fetchSponsors();
      setSponsors(data);
    } catch (error) {
      console.error('Error loading sponsors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSponsors();
  }, []);

  const openCreateModal = () => {
    setEditingSponsor(null);
    reset({
      name: '',
      logoUrl: '',
      websiteUrl: '',
      description: '',
      tier: 'Other',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    reset({
      name: sponsor.name,
      logoUrl: sponsor.logoUrl || '',
      websiteUrl: sponsor.websiteUrl || '',
      description: sponsor.description,
      tier: sponsor.tier,
      featured: sponsor.featured || false,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (sponsor: Sponsor) => {
    setDeletingSponsor(sponsor);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: SponsorFormData) => {
    try {
      if (editingSponsor) {
        await updateSponsor(editingSponsor.id, data);
      } else {
        await createSponsor(data);
      }
      setIsModalOpen(false);
      loadSponsors();
    } catch (error) {
      console.error('Error saving sponsor:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingSponsor) return;
    
    setIsDeleting(true);
    try {
      await deleteSponsor(deletingSponsor.id);
      setIsDeleteModalOpen(false);
      setDeletingSponsor(null);
      loadSponsors();
    } catch (error) {
      console.error('Error deleting sponsor:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const tierColors: Record<string, string> = {
    Diamond: 'bg-cyan-500/20 text-cyan-300',
    Gold: 'bg-yellow-500/20 text-yellow-300',
    Silver: 'bg-gray-400/20 text-gray-300',
    Community: 'bg-green-500/20 text-green-300',
    Major: 'bg-purple-500/20 text-purple-300',
    Supporting: 'bg-blue-500/20 text-blue-300',
    Other: 'bg-gray-500/20 text-gray-400',
  };

  const columns: Column<Sponsor>[] = [
    {
      key: 'name',
      label: 'Sponsor',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.logoUrl && (
            // Using native img here because sponsor logos can be arbitrary external URLs.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.logoUrl}
              alt={row.name}
              className="w-10 h-10 rounded object-contain bg-white p-1"
            />
          )}
          <div>
            <span className="font-medium">{row.name}</span>
            {row.featured && (
              <FiStar className="inline-block w-4 h-4 text-yellow-400 ml-2" />
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'tier',
      label: 'Tier',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${tierColors[value as string] || tierColors.Other}`}>
          {value as string}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => (
        <span className="text-gray-400 line-clamp-1 max-w-xs">
          {value as string || '-'}
        </span>
      ),
    },
    {
      key: 'websiteUrl',
      label: 'Website',
      render: (value) =>
        value && value !== '#' ? (
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
          <h1 className="text-2xl font-bold text-white">Sponsors</h1>
          <p className="text-gray-400 mt-1">Manage sponsor partnerships</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <FiPlus className="w-4 h-4" />
          Add Sponsor
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={sponsors}
        keyField="id"
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        isLoading={isLoading}
        emptyMessage="No sponsors found. Add your first sponsor!"
      />

      {/* Create/Edit Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSponsor ? 'Edit Sponsor' : 'Add Sponsor'}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Company Name" error={errors.name?.message} required>
            <FormInput
              {...register('name')}
              placeholder="Company name"
              error={!!errors.name}
            />
          </FormField>

          <FormField label="Tier" error={errors.tier?.message} required>
            <FormSelect {...register('tier')} error={!!errors.tier}>
              {SPONSOR_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormField label="Description" error={errors.description?.message} required>
            <FormTextarea
              {...register('description')}
              placeholder="Brief description of the sponsor"
              rows={4}
              error={!!errors.description}
            />
          </FormField>

          <FormField label="Logo" error={errors.logoUrl?.message}>
            <ImageUpload
              bucket={STORAGE_BUCKETS.PUBLIC_IMAGES}
              folder={STORAGE_FOLDERS.SPONSORS}
              currentUrl={logoUrl}
              onUpload={(url) => setValue('logoUrl', url)}
              onRemove={() => setValue('logoUrl', '')}
            />
          </FormField>

          <FormField label="Website URL" error={errors.websiteUrl?.message}>
            <FormInput
              {...register('websiteUrl')}
              type="url"
              placeholder="https://example.com"
              error={!!errors.websiteUrl}
            />
          </FormField>

          <FormCheckbox
            label="Featured sponsor (shown in spotlight section)"
            {...register('featured')}
          />

          <FormActions
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={isSubmitting}
            submitLabel={editingSponsor ? 'Update Sponsor' : 'Add Sponsor'}
          />
        </form>
      </FormModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Sponsor"
        message={`Are you sure you want to delete "${deletingSponsor?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
