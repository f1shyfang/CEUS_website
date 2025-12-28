'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCalendar, FiUsers, FiAward, FiMail, FiArrowRight } from 'react-icons/fi';
import { StatCard } from '@/components/admin';
import {
  fetchEvents,
  fetchSponsors,
  fetchTeamCategories,
  getContactSubmissions,
} from '@/lib/supabase';

interface DashboardStats {
  events: number;
  sponsors: number;
  teamMembers: number;
  contacts: number;
  newContacts: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    events: 0,
    sponsors: 0,
    teamMembers: 0,
    contacts: 0,
    newContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [events, sponsors, teamCategories, contacts] = await Promise.all([
          fetchEvents(),
          fetchSponsors(),
          fetchTeamCategories(),
          getContactSubmissions(),
        ]);

        const teamMemberCount = teamCategories.reduce(
          (acc, category) => acc + category.members.length,
          0
        );

        const newContactCount = (contacts || []).filter(
          (c: { status?: string }) => c.status === 'new'
        ).length;

        setStats({
          events: events.length,
          sponsors: sponsors.length,
          teamMembers: teamMemberCount,
          contacts: (contacts || []).length,
          newContacts: newContactCount,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickLinks = [
    { href: '/admin/events', label: 'Manage Events', icon: FiCalendar },
    { href: '/admin/sponsors', label: 'Manage Sponsors', icon: FiAward },
    { href: '/admin/team', label: 'Manage Team', icon: FiUsers },
    { href: '/admin/contacts', label: 'View Contacts', icon: FiMail },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to the CEUS admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Events"
          value={stats.events}
          icon={<FiCalendar className="w-6 h-6" />}
          color="indigo"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Sponsors"
          value={stats.sponsors}
          icon={<FiAward className="w-6 h-6" />}
          color="yellow"
          isLoading={isLoading}
        />
        <StatCard
          title="Team Members"
          value={stats.teamMembers}
          icon={<FiUsers className="w-6 h-6" />}
          color="green"
          isLoading={isLoading}
        />
        <StatCard
          title="Contact Submissions"
          value={
            isLoading
              ? '...'
              : stats.newContacts > 0
              ? `${stats.contacts} (${stats.newContacts} new)`
              : stats.contacts
          }
          icon={<FiMail className="w-6 h-6" />}
          color={stats.newContacts > 0 ? 'red' : 'blue'}
          isLoading={isLoading}
        />
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{link.label}</span>
                </div>
                <FiArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Getting Started</h2>
        <ul className="text-gray-400 space-y-2">
          <li>• Use the sidebar to navigate between different sections</li>
          <li>• Click on any entity to view, edit, or delete records</li>
          <li>• Images can be uploaded directly to Supabase storage</li>
          <li>• Contact submissions can be marked as read or replied</li>
        </ul>
      </div>
    </div>
  );
}
