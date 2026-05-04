import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Calendar, DollarSign, User, Settings, HelpCircle, Power } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { workers } from '../lib/api';
import { cn } from '../lib/utils';

const NAV_MAIN = [
  { label: 'Status', icon: LayoutGrid, href: '/worker/dashboard' },
  { label: 'Schedule', icon: Calendar, href: '/worker/dashboard' },
  { label: 'Earnings', icon: DollarSign, href: '/worker/dashboard' },
  { label: 'Account', icon: User, href: '/worker/settings' },
];

export function WorkerLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: profile, refetch } = useQuery({
    queryKey: ['worker-profile-layout'],
    queryFn: () => workers.profile().then((r) => r.data),
    enabled: user?.isApproved !== false,
  });

  const toggleMutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append('isAvailable', String(!(profile?.isAvailable ?? true)));
      await workers.updateProfile(fd);
    },
    onSuccess: () => refetch(),
  });

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() ?? 'W';
  const workerId = `HP-${user?.uuid?.slice(0, 4).toUpperCase() ?? '0000'}`;
  const isAvailable = profile?.isAvailable ?? true;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 border-r border-uber-gray-100 flex flex-col">
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-uber-gray-100">
          <p className="font-black text-black text-base leading-none tracking-tight">Lintel</p>
          <p className="text-[9px] text-uber-gray-400 uppercase tracking-widest mt-1">Worker Portal</p>
        </div>

        {/* Clock In */}
        {user?.isApproved !== false && (
          <div className="px-4 py-4">
            <button
              onClick={() => toggleMutation.mutate()}
              disabled={toggleMutation.isPending}
              className={cn(
                'w-full flex items-center justify-center gap-2 h-9 border rounded text-[11px] font-bold uppercase tracking-wider transition-colors',
                isAvailable
                  ? 'border-black text-black bg-black/5 hover:bg-black/10'
                  : 'border-uber-gray-200 text-uber-gray-400 hover:border-uber-gray-400 hover:text-uber-gray-600'
              )}
            >
              <Power className="w-3 h-3" />
              {isAvailable ? 'Online' : 'Clock In'}
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 pt-2 space-y-0.5">
          {NAV_MAIN.map(({ label, icon: Icon, href }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={label}
                to={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-r',
                  isActive
                    ? 'text-black font-semibold border-l-2 border-black -ml-px pl-[11px] bg-uber-gray-50'
                    : 'text-uber-gray-500 hover:text-black'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + bottom links */}
        <div className="border-t border-uber-gray-100">
          <div className="flex items-center gap-2.5 px-4 py-4">
            {user?.img ? (
              <img src={user.img} alt={user.name ?? ''} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-black truncate">{user?.name ?? 'Worker'}</p>
              <p className="text-[10px] text-uber-gray-400">ID: {workerId}</p>
            </div>
          </div>

          <div className="px-2 pb-4 space-y-0.5">
            <Link
              to="/worker/settings"
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm rounded transition-colors',
                location.pathname === '/worker/settings' ? 'text-black font-semibold' : 'text-uber-gray-500 hover:text-black'
              )}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-uber-gray-500 hover:text-black transition-colors rounded"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 h-14 border-b border-uber-gray-100 flex-shrink-0">
          <p className="font-bold text-black text-sm">Worker Dashboard</p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-uber-gray-400 uppercase tracking-widest border border-uber-gray-200 px-2.5 py-1 rounded">
              {user?.isApproved === false ? 'Pending Approval' : 'Active'}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
