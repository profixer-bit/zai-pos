'use client';

import { useState } from 'react';
import { Sidebar, Header } from '@/components/dashboard/layout';
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { CustomerManagement } from '@/components/dashboard/customers';
import { JobSheetManagement } from '@/components/dashboard/jobsheets';
import { InventoryManagement } from '@/components/dashboard/inventory';
import { POSManagement } from '@/components/dashboard/pos';
import { StaffManagement } from '@/components/dashboard/staff';
import { InvoiceManagement } from '@/components/dashboard/invoices';
import { WhatsAppAutomation } from '@/components/dashboard/whatsapp';
import { ReportsAnalytics } from '@/components/dashboard/reports';
import { AdminPanel } from '@/components/dashboard/admin-panel';

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'customers':
        return <CustomerManagement />;
      case 'jobsheets':
        return <JobSheetManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'pos':
        return <POSManagement />;
      case 'invoices':
        return <InvoiceManagement />;
      case 'whatsapp':
        return <WhatsAppAutomation />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'staff':
        return <StaffManagement />;
      case 'settings':
        return <AdminPanel />;
      default:
        return <DashboardContent />;
    }
  };

  const getTitle = () => {
    switch (activeItem) {
      case 'dashboard':
        return 'Dashboard';
      case 'customers':
        return 'Customer Management';
      case 'jobsheets':
        return 'Job Sheets';
      case 'inventory':
        return 'Inventory Management';
      case 'pos':
        return 'Point of Sale';
      case 'invoices':
        return 'Invoice Management';
      case 'whatsapp':
        return 'WhatsApp Automation';
      case 'reports':
        return 'Reports & Analytics';
      case 'staff':
        return 'Staff Management';
      case 'settings':
        return 'SaaS Admin Panel';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
      <div className="md:ml-64">
        <Header title={getTitle()} />
        <main className="p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
