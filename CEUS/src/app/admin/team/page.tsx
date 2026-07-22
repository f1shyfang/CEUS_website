'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiPlus, FiMail, FiLinkedin } from 'react-icons/fi';
import {
  DataTable,
  Column,
  DeleteConfirmModal,
  FormModal,
  FormField,
  FormInput,
  FormCheckbox,
  FormActions,
  ImageUpload,
} from '@/components/admin';
import {
  fetchAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  GroupedTeamMember,
  STORAGE_BUCKETS,
  STORAGE_FOLDERS,
} from '@/lib/supabase';
import {
  teamMemberSchema,
  TeamMemberFormData,
  TEAM_CATEGORIES,
  TeamCategoryName,
} from '@/lib/schemas';

export default function AdminTeamPage() {
  const [members, setMembers] = useState<GroupedTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<GroupedTeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<GroupedTeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      role: '',
      imageUrl: '',
      email: '',
      linkedInUrl: '',
      categories: [],
      sortOrder: 0,
    },
  });

  const imageUrl = watch('imageUrl');
  const selectedCategories = watch('categories');

  const loadMembers = async () => {
    try {
      const data = await fetchAllTeamMembers();
      setMembers(data);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setSaveError(null);
    reset({
      name: '',
      role: '',
      imageUrl: '',
      email: '',
      linkedInUrl: '',
      categories: [TEAM_CATEGORIES[0]],
      sortOrder: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: GroupedTeamMember) => {
    setEditingMember(member);
    setSaveError(null);
    reset({
      name: member.name,
      role: member.role,
      imageUrl: member.imageUrl || '',
      email: member.email || '',
      linkedInUrl: member.linkedInUrl || '',
      categories: member.categories as TeamCategoryName[],
      sortOrder: member.sortOrder,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (member: GroupedTeamMember) => {
    setDeletingMember(member);
    setIsDeleteModalOpen(true);
  };

  const toggleCategory = (category: TeamCategoryName, checked: boolean) => {
    const next = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((value) => value !== category);
    setValue('categories', next, { shouldValidate: true });
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    setSaveError(null);
    try {
      if (editingMember) {
        await updateTeamMember(String(editingMember.id), data);
      } else {
        await createTeamMember(data);
      }
      setIsModalOpen(false);
      loadMembers();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to save team member. Please try again.';
      console.error('Error saving team member:', error);
      setSaveError(message);
    }
  };

  const handleDelete = async () => {
    if (!deletingMember) return;

    setIsDeleting(true);
    try {
      await deleteTeamMember(String(deletingMember.id));
      setIsDeleteModalOpen(false);
      setDeletingMember(null);
      loadMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryColors: Record<string, string> = {
    Executives: 'bg-purple-500/20 text-purple-300',
    'Year Representatives': 'bg-blue-500/20 text-blue-300',
    'Information Technology': 'bg-cyan-500/20 text-cyan-300',
    Marketing: 'bg-pink-500/20 text-pink-300',
    Socials: 'bg-orange-500/20 text-orange-300',
    Industry: 'bg-green-500/20 text-green-300',
    Admin: 'bg-gray-500/20 text-gray-300',
  };

  const columns: Column<GroupedTeamMember>[] = [
    {
      key: 'name',
      label: 'Member',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            // Using native img here because member photos may come from dynamic external sources.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.imageUrl}
              alt={row.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
              {row.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <span className="font-medium">{row.name}</span>
            <p className="text-sm text-gray-400">{row.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'categories',
      label: 'Categories',
      sortable: true,
      render: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.categories.map((category) => (
            <span
              key={category}
              className={`px-2 py-1 rounded text-xs ${categoryColors[category] || 'bg-gray-500/20 text-gray-400'}`}
            >
              {category}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'sortOrder',
      label: 'Order',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Contact',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.email && (
            <a
              href={`mailto:${row.email}`}
              className="text-gray-400 hover:text-indigo-400"
              title={row.email}
            >
              <FiMail className="w-4 h-4" />
            </a>
          )}
          {row.linkedInUrl && (
            <a
              href={row.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
              title="LinkedIn"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
          )}
          {!row.email && !row.linkedInUrl && (
            <span className="text-gray-500">-</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          <p className="text-gray-400 mt-1">Manage your organization&apos;s team</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <FiPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <DataTable
        columns={columns}
        data={members}
        keyField="id"
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        isLoading={isLoading}
        emptyMessage="No team members found. Add your first team member!"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {saveError && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {saveError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name" error={errors.name?.message} required>
              <FormInput
                {...register('name')}
                placeholder="Full name"
                error={!!errors.name}
              />
            </FormField>

            <FormField label="Role" error={errors.role?.message} required>
              <FormInput
                {...register('role')}
                placeholder="Position/title"
                error={!!errors.role}
              />
            </FormField>
          </div>

          <FormField label="Categories" error={errors.categories?.message} required>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border border-gray-600 bg-gray-700/40 p-3">
              {TEAM_CATEGORIES.map((category) => (
                <FormCheckbox
                  key={category}
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(event) => toggleCategory(category, event.target.checked)}
                />
              ))}
            </div>
          </FormField>

          <FormField label="Sort Order" error={errors.sortOrder?.message} required>
            <FormInput
              {...register('sortOrder', { valueAsNumber: true })}
              type="number"
              min="0"
              placeholder="0"
              error={!!errors.sortOrder}
            />
          </FormField>

          <FormField label="Profile Photo" error={errors.imageUrl?.message}>
            <ImageUpload
              bucket={STORAGE_BUCKETS.PUBLIC_IMAGES}
              folder={STORAGE_FOLDERS.TEAM}
              currentUrl={imageUrl}
              onUpload={(url) => setValue('imageUrl', url, { shouldValidate: true })}
              onRemove={() => setValue('imageUrl', '', { shouldValidate: true })}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <FormInput
              {...register('email')}
              type="email"
              placeholder="email@example.com"
              error={!!errors.email}
            />
          </FormField>

          <FormField label="LinkedIn URL" error={errors.linkedInUrl?.message}>
            <FormInput
              {...register('linkedInUrl')}
              type="url"
              placeholder="https://linkedin.com/in/..."
              error={!!errors.linkedInUrl}
            />
          </FormField>

          <FormActions
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={isSubmitting}
            submitLabel={editingMember ? 'Update Member' : 'Add Member'}
          />
        </form>
      </FormModal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deletingMember?.name}" from all categories? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
