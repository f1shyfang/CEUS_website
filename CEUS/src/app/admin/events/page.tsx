'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiPlus, FiCalendar, FiExternalLink } from 'react-icons/fi';
import {
  DataTable,
  Column,
  DeleteConfirmModal,
  FormModal,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormActions,
  ImageUpload,
} from '@/components/admin';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  STORAGE_BUCKETS,
  STORAGE_FOLDERS,
} from '@/lib/supabase';
import { eventSchema, EventFormData, EVENT_CATEGORIES } from '@/lib/schemas';
import { Event } from '@/types';
import { format } from 'date-fns';

type EventWithStringId = Omit<Event, 'id'> & { id: string };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventWithStringId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventWithStringId | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventWithStringId | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      description: '',
      imageUrl: '',
      facebookEventLink: '',
      category: 'Other',
    },
  });

  const imageUrl = watch('imageUrl');

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data.map(e => ({ ...e, id: String(e.id) })));
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const openCreateModal = () => {
    setEditingEvent(null);
    reset({
      title: '',
      date: '',
      description: '',
      imageUrl: '',
      facebookEventLink: '',
      category: 'Other',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventWithStringId) => {
    setEditingEvent(event);
    reset({
      title: event.title,
      date: event.date.slice(0, 16), // Format for datetime-local input
      description: event.description,
      imageUrl: event.imageUrl || '',
      facebookEventLink: event.facebookEventLink || '',
      category: event.category,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (event: EventWithStringId) => {
    setDeletingEvent(event);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, {
          ...data,
          date: new Date(data.date).toISOString(),
        });
      } else {
        await createEvent({
          ...data,
          date: new Date(data.date).toISOString(),
        });
      }
      setIsModalOpen(false);
      loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingEvent) return;
    
    setIsDeleting(true);
    try {
      await deleteEvent(deletingEvent.id);
      setIsDeleteModalOpen(false);
      setDeletingEvent(null);
      loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<EventWithStringId>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl && (
            // Using native img here because event URLs may be external and dynamic.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.imageUrl}
              alt={row.title}
              className="w-10 h-10 rounded object-cover bg-gray-700"
            />
          )}
          <span className="font-medium">{row.title}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-gray-500" />
          {format(new Date(value as string), 'MMM d, yyyy h:mm a')}
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
          {value as string}
        </span>
      ),
    },
    {
      key: 'facebookEventLink',
      label: 'FB Link',
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
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-gray-400 mt-1">Manage events and gatherings</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <FiPlus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={events}
        keyField="id"
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        isLoading={isLoading}
        emptyMessage="No events found. Create your first event!"
      />

      {/* Create/Edit Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? 'Edit Event' : 'Create Event'}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Title" error={errors.title?.message} required>
            <FormInput
              {...register('title')}
              placeholder="Event title"
              error={!!errors.title}
            />
          </FormField>

          <FormField label="Date & Time" error={errors.date?.message} required>
            <FormInput
              {...register('date')}
              type="datetime-local"
              error={!!errors.date}
            />
          </FormField>

          <FormField label="Category" error={errors.category?.message} required>
            <FormSelect {...register('category')} error={!!errors.category}>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormField label="Description" error={errors.description?.message} required>
            <FormTextarea
              {...register('description')}
              placeholder="Event description"
              rows={4}
              error={!!errors.description}
            />
          </FormField>

          <FormField label="Event Image" error={errors.imageUrl?.message}>
            <ImageUpload
              bucket={STORAGE_BUCKETS.PUBLIC_IMAGES}
              folder={STORAGE_FOLDERS.EVENTS}
              currentUrl={imageUrl}
              onUpload={(url) => setValue('imageUrl', url)}
              onRemove={() => setValue('imageUrl', '')}
            />
          </FormField>

          <FormField label="Facebook Event Link" error={errors.facebookEventLink?.message}>
            <FormInput
              {...register('facebookEventLink')}
              type="url"
              placeholder="https://facebook.com/events/..."
              error={!!errors.facebookEventLink}
            />
          </FormField>

          <FormActions
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={isSubmitting}
            submitLabel={editingEvent ? 'Update Event' : 'Create Event'}
          />
        </form>
      </FormModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
