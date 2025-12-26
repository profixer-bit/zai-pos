'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  Wrench,
  Package,
  Receipt,
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Users, label: 'Customers', id: 'customers' },
    { icon: Wrench, label: 'Jobsheets', id: 'jobsheets' },
    { icon: Package, label: 'Inventory', id: 'inventory' },
    { icon: DollarSign, label: 'POS', id: 'pos' },
    { icon: Receipt, label: 'Invoices', id: 'invoices' },
    { icon: MessageSquare, label: 'WhatsApp', id: 'whatsapp' },
    { icon: User, label: 'Staff', id: 'staff' },
    { icon: BarChart3, label: 'Reports', id: 'reports' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-card border-r transition-all duration-300 ${
          collapsed ? 'w-0 -translate-x-full' : 'w-64 translate-x-0'
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              {!collapsed && <span className="text-lg font-bold">RepairFlow</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setCollapsed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        setCollapsed(true);
                      }}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">John Doe</div>
                  <div className="text-xs text-muted-foreground truncate">
                    Admin
                  </div>
                </div>
              )}
              {!collapsed && (
                <Button variant="ghost" size="icon" className="shrink-0">
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <Avatar className="hidden md:flex">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
