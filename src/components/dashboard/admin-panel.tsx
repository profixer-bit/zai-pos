'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Users,
  Wrench,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  Settings,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SubscriptionStatus = 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';

type PlanType = 'BASIC' | 'PRO' | 'ENTERPRISE';

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  isActive: boolean;
  isTrial: boolean;
  trialEndsAt?: string;
  planType: PlanType;
  subscriptionStatus: SubscriptionStatus;
  startDate: string;
  usersCount: number;
  jobsCompleted: number;
  revenue: number;
  lastActivityAt: string;
}

const subscriptionStatusConfig: Record<SubscriptionStatus, { label: string; color: string; icon: React.ReactNode }> = {
  ACTIVE: { label: 'Active', color: 'bg-green-500', icon: <CheckCircle className="h-3 w-3" /> },
  SUSPENDED: { label: 'Suspended', color: 'bg-orange-500', icon: <XCircle className="h-3 w-3" /> },
  CANCELLED: { label: 'Cancelled', color: 'bg-gray-500', icon: <XCircle className="h-3 w-3" /> },
  EXPIRED: { label: 'Expired', color: 'bg-red-500', icon: <AlertTriangle className="h-3 w-3" /> },
};

const planConfig: Record<PlanType, { label: string; price: number; features: string[] }> = {
  BASIC: {
    label: 'Basic',
    price: 29,
    features: ['Up to 3 users', '500 jobs/month', 'Basic inventory', 'Email support'],
  },
  PRO: {
    label: 'Pro',
    price: 79,
    features: [
      'Up to 10 users',
      'Unlimited jobs',
      'Advanced inventory',
      'WhatsApp automation',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    label: 'Enterprise',
    price: 199,
    features: [
      'Unlimited users',
      'Multi-location support',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'White-label option',
    ],
  },
};

export function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<SubscriptionStatus | 'all'>('all');
  const [filterPlan, setFilterPlan] = useState<PlanType | 'all'>('all');
  const [isTenantDialogOpen, setIsTenantDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

  const [tenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'FixIt Phones',
      subdomain: 'fixit-phones',
      isActive: true,
      isTrial: false,
      trialEndsAt: undefined,
      planType: 'PRO',
      subscriptionStatus: 'ACTIVE',
      startDate: '2023-06-15',
      usersCount: 5,
      jobsCompleted: 1234,
      revenue: 45670,
      lastActivityAt: '2024-03-20 14:30',
    },
    {
      id: '2',
      name: 'TechRepair Hub',
      subdomain: 'techrepair-hub',
      isActive: true,
      isTrial: false,
      trialEndsAt: undefined,
      planType: 'PRO',
      subscriptionStatus: 'ACTIVE',
      startDate: '2023-08-20',
      usersCount: 8,
      jobsCompleted: 2156,
      revenue: 67890,
      lastActivityAt: '2024-03-20 16:45',
    },
    {
      id: '3',
      name: 'QuickFix Pro',
      subdomain: 'quickfix-pro',
      isActive: true,
      isTrial: true,
      trialEndsAt: '2024-04-03',
      planType: 'BASIC',
      subscriptionStatus: 'ACTIVE',
      startDate: '2024-03-15',
      usersCount: 2,
      jobsCompleted: 45,
      revenue: 1280,
      lastActivityAt: '2024-03-20 10:15',
    },
    {
      id: '4',
      name: 'Global Repairs',
      subdomain: 'global-repairs',
      isActive: false,
      isTrial: false,
      trialEndsAt: undefined,
      planType: 'ENTERPRISE',
      subscriptionStatus: 'SUSPENDED',
      startDate: '2023-02-10',
      usersCount: 15,
      jobsCompleted: 3456,
      revenue: 123450,
      lastActivityAt: '2024-03-18 09:20',
    },
    {
      id: '5',
      name: 'MobileFix Center',
      subdomain: 'mobilefix-center',
      isActive: true,
      isTrial: false,
      trialEndsAt: undefined,
      planType: 'ENTERPRISE',
      subscriptionStatus: 'ACTIVE',
      startDate: '2023-01-05',
      usersCount: 20,
      jobsCompleted: 5678,
      revenue: 198760,
      lastActivityAt: '2024-03-20 18:00',
    },
  ]);

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.subdomain.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || tenant.subscriptionStatus === filterStatus;
    const matchesPlan = filterPlan === 'all' || tenant.planType === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((t) => t.isActive).length;
  const trialTenants = tenants.filter((t) => t.isTrial).length;
  const totalRevenue = tenants.reduce((sum, t) => sum + t.revenue, 0);
  const totalJobs = tenants.reduce((sum, t) => sum + t.jobsCompleted, 0);

  const monthlyRevenue = tenants.reduce((sum, t) => {
    const planPrice = planConfig[t.planType].price;
    return sum + (t.subscriptionStatus === 'ACTIVE' && !t.isTrial ? planPrice : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Platform Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tenants
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTenants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeTenants} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trial Accounts
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trialTenants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active trials
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.reduce((sum, t) => sum + t.usersCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all tenants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recurring revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Platform Jobs
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalJobs.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(v: SubscriptionStatus | 'all') => setFilterStatus(v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(subscriptionStatusConfig).map(([status, config]) => (
                <SelectItem key={status} value={status}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filterPlan}
            onValueChange={(v: PlanType | 'all') => setFilterPlan(v)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Plan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              {Object.entries(planConfig).map(([plan, config]) => (
                <SelectItem key={plan} value={plan}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isTenantDialogOpen} onOpenChange={setIsTenantDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Create a new tenant account
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="tenant-name">Tenant Name *</Label>
                <Input id="tenant-name" placeholder="e.g., FixIt Phones" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subdomain">Subdomain *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="subdomain"
                    placeholder="fixit-phones"
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">.repairflow.com</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan-type">Plan Type *</Label>
                <Select>
                  <SelectTrigger id="plan-type">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(planConfig).map(([plan, config]) => (
                      <SelectItem key={plan} value={plan}>
                        <div className="flex flex-col">
                          <span className="font-medium">{config.label}</span>
                          <span className="text-xs text-muted-foreground">
                            ${config.price}/month
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-name">Admin Name *</Label>
                <Input id="admin-name" placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-email">Admin Email *</Label>
                <Input id="admin-email" type="email" placeholder="admin@company.com" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="start-trial" className="rounded" />
                <Label htmlFor="start-trial" className="cursor-pointer">
                  Start with 14-day trial
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTenantDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsTenantDialogOpen(false)}>
                Create Tenant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tenants ({filteredTenants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => {
                  const planInfo = planConfig[tenant.planType];
                  const statusInfo = subscriptionStatusConfig[tenant.subscriptionStatus];

                  return (
                    <TableRow key={tenant.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold">
                              {tenant.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {tenant.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {tenant.subdomain}.repairflow.com
                              </div>
                            </div>
                          </div>
                          {tenant.isTrial && (
                            <Badge variant="secondary" className="text-xs">
                              Trial
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">
                            {planInfo.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${planInfo.price}/month
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusInfo.color} text-white`}
                        >
                          <div className="flex items-center gap-1">
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {tenant.usersCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{tenant.jobsCompleted}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          ${tenant.revenue.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {tenant.lastActivityAt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedTenant(tenant);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedTenant(tenant);
                                setIsPlanDialogOpen(true);
                              }}
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Change Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                alert(
                                  `Viewing details for ${tenant.name}`
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                alert(
                                  `Accessing tenant: ${tenant.subdomain}`
                                )
                              }
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Login as Tenant
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                alert(
                                  `Suspending tenant: ${tenant.name}`
                                )
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4 text-orange-500" />
                              Suspend
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>
              Update tenant account details
            </DialogDescription>
          </DialogHeader>
          {selectedTenant && (
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tenant Name</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedTenant.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-subdomain">Subdomain</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-subdomain"
                    defaultValue={selectedTenant.subdomain}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">.repairflow.com</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-active">Account Status</Label>
                <Select defaultValue={selectedTenant.isActive ? 'active' : 'inactive'}>
                  <SelectTrigger id="edit-active">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Select a new plan for {selectedTenant?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTenant && (
            <div className="grid gap-4 py-4">
              {Object.entries(planConfig).map(([plan, config]) => {
                const isSelected = selectedTenant.planType === plan;

                return (
                  <Card
                    key={plan}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'border-primary border-2' : ''
                    }`}
                  >
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">
                          {config.label}
                        </h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            ${config.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            /month
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {config.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={isSelected ? 'outline' : 'default'}
                        onClick={() => {
                          alert(`Changing plan to ${config.label}`);
                          setIsPlanDialogOpen(false);
                        }}
                      >
                        {isSelected ? 'Current Plan' : 'Select Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPlanDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
