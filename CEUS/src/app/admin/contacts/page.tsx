'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiClock, FiCheck, FiMessageCircle, FiEye } from 'react-icons/fi';
import { format } from 'date-fns';
import {
  DataTable,
  Column,
  DeleteConfirmModal,
  FormModal,
} from '@/components/admin';
import {
  getContactSubmissions,
  updateSubmissionStatus,
  deleteContactSubmission,
  ContactSubmission,
} from '@/lib/supabase';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewingContact, setViewingContact] = useState<ContactSubmission | null>(null);
  const [deletingContact, setDeletingContact] = useState<ContactSubmission | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const loadContacts = async () => {
    try {
      const data = await getContactSubmissions();
      setContacts(data || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const openViewModal = async (contact: ContactSubmission) => {
    setViewingContact(contact);
    setIsViewModalOpen(true);

    // Mark as read if it's new
    if (contact.status === 'new' && contact.id) {
      try {
        await updateSubmissionStatus(contact.id, 'read');
        loadContacts();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const openDeleteModal = (contact: ContactSubmission) => {
    setDeletingContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleStatusChange = async (status: 'new' | 'read' | 'replied') => {
    if (!viewingContact?.id) return;

    setIsUpdatingStatus(true);
    try {
      await updateSubmissionStatus(viewingContact.id, status);
      setViewingContact({ ...viewingContact, status });
      loadContacts();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingContact?.id) return;
    
    setIsDeleting(true);
    try {
      await deleteContactSubmission(deletingContact.id);
      setIsDeleteModalOpen(false);
      setDeletingContact(null);
      loadContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const statusConfig = {
    new: {
      label: 'New',
      color: 'bg-red-500/20 text-red-400',
      icon: FiMail,
    },
    read: {
      label: 'Read',
      color: 'bg-yellow-500/20 text-yellow-400',
      icon: FiEye,
    },
    replied: {
      label: 'Replied',
      color: 'bg-green-500/20 text-green-400',
      icon: FiCheck,
    },
  };

  const columns: Column<ContactSubmission>[] = [
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const status = (value as string) || 'new';
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
        const Icon = config.icon;
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${config.color}`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
        );
      },
    },
    {
      key: 'name',
      label: 'From',
      sortable: true,
      render: (_, row) => (
        <div>
          <span className="font-medium">{row.name}</span>
          <p className="text-sm text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      render: (value) => (
        <span className="line-clamp-1 max-w-xs">{value as string}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-400">
          <FiClock className="w-4 h-4" />
          {value ? format(new Date(value as string), 'MMM d, yyyy h:mm a') : '-'}
        </div>
      ),
    },
  ];

  const newCount = contacts.filter((c) => c.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Contact Submissions
            {newCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded">
                {newCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-400 mt-1">View and manage contact form submissions</p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={contacts}
        keyField="id"
        onView={openViewModal}
        onDelete={openDeleteModal}
        isLoading={isLoading}
        emptyMessage="No contact submissions yet."
      />

      {/* View Modal */}
      <FormModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Contact Submission"
      >
        {viewingContact && (
          <div className="space-y-6">
            {/* Status badges */}
            <div className="flex items-center gap-2">
              {(['new', 'read', 'replied'] as const).map((status) => {
                const config = statusConfig[status];
                const Icon = config.icon;
                const isActive = viewingContact.status === status;
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={isUpdatingStatus || isActive}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm transition ${
                      isActive
                        ? config.color
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    } ${isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">From</label>
                <p className="text-white font-medium">{viewingContact.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <a
                  href={`mailto:${viewingContact.email}`}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <FiMail className="w-4 h-4" />
                  {viewingContact.email}
                </a>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm text-gray-400">Subject</label>
              <p className="text-white font-medium">{viewingContact.subject}</p>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-gray-400">Message</label>
              <div className="mt-1 p-4 bg-gray-700 rounded-lg">
                <p className="text-white whitespace-pre-wrap">{viewingContact.message}</p>
              </div>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-400">
              Submitted on{' '}
              {viewingContact.created_at
                ? format(new Date(viewingContact.created_at), 'MMMM d, yyyy \'at\' h:mm a')
                : 'Unknown date'}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-700">
              <a
                href={`mailto:${viewingContact.email}?subject=Re: ${viewingContact.subject}`}
                onClick={() => handleStatusChange('replied')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
              >
                <FiMessageCircle className="w-4 h-4" />
                Reply via Email
              </a>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </FormModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Submission"
        message={`Are you sure you want to delete the submission from "${deletingContact?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
