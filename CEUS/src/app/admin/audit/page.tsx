'use client';

import { useEffect, useState } from 'react';
import { FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { DataTable, Column, FormModal } from '@/components/admin';
import { fetchAdminAuditLogs, AdminAuditLog } from '@/lib/supabase';

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingLog, setViewingLog] = useState<AdminAuditLog | null>(null);

  const loadLogs = async () => {
    try {
      const data = await fetchAdminAuditLogs(50);
      setLogs(data);
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const openViewModal = (log: AdminAuditLog) => {
    setViewingLog(log);
    setIsViewModalOpen(true);
  };

  const columns: Column<AdminAuditLog>[] = [
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
          {value as string}
        </span>
      ),
    },
    {
      key: 'entity',
      label: 'Entity',
      sortable: true,
      render: (value, row) => (
        <div>
          <span className="font-medium">{value as string}</span>
          {row.entityId && (
            <p className="text-xs text-gray-500">ID: {row.entityId}</p>
          )}
        </div>
      ),
    },
    {
      key: 'actorEmail',
      label: 'Actor',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-300">
          <FiUser className="w-4 h-4 text-gray-500" />
          <span className="truncate max-w-xs">{(value as string) || 'Unknown'}</span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Time',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2 text-gray-400">
          <FiClock className="w-4 h-4" />
          {value ? format(new Date(value as string), 'MMM d, yyyy h:mm a') : '-'}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
          <p className="text-gray-400 mt-1">Track admin actions across the site</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        keyField="id"
        onView={openViewModal}
        isLoading={isLoading}
        emptyMessage="No audit activity yet."
      />

      <FormModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Audit Log Details"
        isLoading={isLoading || !viewingLog}
      >
        {viewingLog && (
          <div className="space-y-4 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Action</p>
                <p className="font-medium text-white">{viewingLog.action}</p>
              </div>
              <div>
                <p className="text-gray-400">Entity</p>
                <p className="font-medium text-white">{viewingLog.entity}</p>
              </div>
              <div>
                <p className="text-gray-400">Entity ID</p>
                <p className="text-white">{viewingLog.entityId || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Actor Email</p>
                <p className="text-white">{viewingLog.actorEmail || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Timestamp</p>
                <p className="text-white">
                  {viewingLog.createdAt
                    ? format(new Date(viewingLog.createdAt), 'MMMM d, yyyy h:mm a')
                    : '-'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Metadata</p>
              <pre className="bg-gray-900/70 rounded-lg p-3 text-xs text-gray-300 overflow-x-auto">
                {JSON.stringify(viewingLog.metadata || {}, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </FormModal>
    </div>
  );
}
