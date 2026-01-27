'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AdminErrorBoundary } from '@/components/admin';
import { signOut, getUser, getUserRole, isAdminUser } from '@/lib/supabase';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiAward,
  FiMail,
  FiActivity,
  FiLogOut,
  FiMenu,
  FiX,
  FiLoader,
  FiAlertCircle,
} from 'react-icons/fi';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiHome },
  { href: '/admin/events', label: 'Events', icon: FiCalendar },
  { href: '/admin/sponsors', label: 'Sponsors', icon: FiAward },
  { href: '/admin/team', label: 'Team', icon: FiUsers },
  { href: '/admin/contacts', label: 'Contacts', icon: FiMail },
  { href: '/admin/audit', label: 'Audit Logs', icon: FiActivity },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<Awaited<ReturnType<typeof getUser>>>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setIsAuthorized(isAdminUser(currentUser));
      setIsAuthLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      // Clear cookies
      document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.replace('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoggingOut(false);
    }
  };

  // Don't show layout on login page
  if (pathname === '/admin/login' || pathname === '/admin/unauthorized') {
    return <>{children}</>;
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <FiLoader className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center space-y-4">
          <FiAlertCircle className="w-8 h-8 text-red-400 mx-auto" />
          <h1 className="text-xl font-semibold text-white">Session expired</h1>
          <p className="text-gray-400">Please sign in again to access the admin panel.</p>
          <button
            onClick={() => router.replace('/admin/login')}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    const role = getUserRole(user) || 'unknown';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center space-y-4">
          <FiAlertCircle className="w-8 h-8 text-yellow-400 mx-auto" />
          <h1 className="text-xl font-semibold text-white">Access restricted</h1>
          <p className="text-gray-400">
            Your account does not have admin access. Current role: {role}.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Sign out
            </button>
            <a
              href="/"
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              Return to website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <Link href="/admin" className="text-xl font-bold text-white">
              CEUS Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname?.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-700">
            {user && (
              <p className="text-sm text-gray-400 truncate mb-3">
                {user.email}
              </p>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
            >
              {isLoggingOut ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FiLogOut className="w-5 h-5" />
              )}
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 bg-gray-800 border-b border-gray-700 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <span className="ml-4 text-lg font-semibold text-white">CEUS Admin</span>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <AdminErrorBoundary>{children}</AdminErrorBoundary>
        </main>
      </div>
    </div>
  );
}
