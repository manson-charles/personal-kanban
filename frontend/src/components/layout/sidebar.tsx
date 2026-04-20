'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'D' },
  { href: '/dashboard/projects', label: 'Projects', icon: 'P' },
  { href: '/dashboard/bots', label: 'Bots', icon: 'B' },
  { href: '/dashboard/builder', label: 'Builder', icon: 'W' },
  { href: '/dashboard/database', label: 'Database', icon: 'DB' },
  { href: '/dashboard/deployments', label: 'Deployments', icon: 'DE' },
  { href: '/dashboard/billing', label: 'Billing', icon: '$' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'S' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4">
        <div className="h-8 w-8 rounded-lg bg-brand-600" />
        <span className="text-lg font-bold text-slate-900">BotForge</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-200 p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="flex-1 truncate">
            <div className="text-sm font-medium text-slate-900">User</div>
            <div className="text-xs text-slate-500">Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
