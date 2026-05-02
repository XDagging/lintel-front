import { Link, useNavigate } from 'react-router-dom';
import { LogOut, List } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo.jpeg';

export function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-uber-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={user?.role === 'worker' ? '/worker/dashboard' : '/book'} className="flex items-center gap-2">
          <img src={logo} alt="lintel" className="h-8 w-8 rounded-full object-cover" />
          <span className="text-xl font-black tracking-tight text-black">lintel</span>
        </Link>

        {user && (
          <div className="flex items-center gap-1">
            {user.role === 'worker' ? (
              <Link
                to="/worker/dashboard"
                className="flex items-center gap-2 px-4 h-9 text-sm font-semibold rounded-lg hover:bg-uber-gray-100 transition-colors"
              >
                <List className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/jobs"
                className="px-4 h-9 flex items-center text-sm font-semibold rounded-lg hover:bg-uber-gray-100 transition-colors"
              >
                My Jobs
              </Link>
            )}

            <div className="w-px h-5 bg-uber-gray-200 mx-1" />

            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {(user.name ?? user.email).charAt(0).toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => { logout(); navigate('/'); }}
              className="p-2 rounded-lg hover:bg-uber-gray-100 transition-colors ml-1"
              title="Sign out"
            >
              <LogOut className="w-4 h-4 text-uber-gray-500" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
