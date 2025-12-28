'use client';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'indigo' | 'green' | 'yellow' | 'red' | 'blue';
  isLoading?: boolean;
}

const colorClasses = {
  indigo: 'bg-indigo-500/10 text-indigo-400',
  green: 'bg-green-500/10 text-green-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  red: 'bg-red-500/10 text-red-400',
  blue: 'bg-blue-500/10 text-blue-400',
};

export default function StatCard({
  title,
  value,
  icon,
  color = 'indigo',
  isLoading = false,
}: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-white">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
