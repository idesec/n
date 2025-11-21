import { Search, FileCheck, Home, Shield } from 'lucide-react';

interface NavigationProps {
  currentPage: 'verify' | 'issue' | 'home' | 'admin' | 'admin-dashboard';
  onNavigate: (page: 'verify' | 'issue' | 'home' | 'admin' | 'admin-dashboard') => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'verify' as const, label: 'Verify', icon: Search },
    { id: 'issue' as const, label: 'Issue', icon: FileCheck },
    { id: 'admin' as const, label: 'Admin', icon: Shield },
  ];

  return (
    <nav className="flex gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm
              transition-all duration-300 border
              ${isActive
                ? 'bg-green-400/20 text-green-400 border-green-400/50 shadow-lg shadow-green-400/20'
                : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-700/50 hover:text-cyan-400 hover:border-cyan-400/50'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
