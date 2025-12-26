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
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Wrench,
  Shield,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type UserRole = 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'CASHIER' | 'VIEWER';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
  hireDate?: string;
  salary?: number;
  commissionRate: number;
  jobsCompleted: number;
  performance: number;
  isActive: boolean;
  lastLoginAt?: string;
}

const roleConfig: Record<UserRole, { label: string; color: string; icon: React.ReactNode }> = {
  ADMIN: { label: 'Admin', color: 'bg-purple-500', icon: <Shield className="h-3 w-3" /> },
  MANAGER: { label: 'Manager', color: 'bg-blue-500', icon: <Users className="h-3 w-3" /> },
  TECHNICIAN: { label: 'Technician', color: 'bg-green-500', icon: <Wrench className="h-3 w-3" /> },
  CASHIER: { label: 'Cashier', color: 'bg-orange-500', icon: <DollarSign className="h-3 w-3" /> },
  VIEWER: { label: 'Viewer', color: 'bg-gray-500', icon: <Activity className="h-3 w-3" /> },
};

export function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSalaryDialogOpen, setIsSalaryDialogOpen] = useState(false);

  const [staff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@repairflow.com',
      phone: '+62 812 3456 7890',
      role: 'ADMIN',
      department: 'Management',
      hireDate: '2023-01-15',
      salary: 5000,
      commissionRate: 5,
      jobsCompleted: 156,
      performance: 4.8,
      isActive: true,
      lastLoginAt: '2024-03-20 09:30',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@repairflow.com',
      phone: '+62 813 4567 8901',
      role: 'MANAGER',
      department: 'Operations',
      hireDate: '2023-03-20',
      salary: 4000,
      commissionRate: 4,
      jobsCompleted: 142,
      performance: 4.9,
      isActive: true,
      lastLoginAt: '2024-03-20 08:45',
    },
    {
      id: '3',
      name: 'Mike Brown',
      email: 'mike.b@repairflow.com',
      phone: '+62 814 5678 9012',
      role: 'TECHNICIAN',
      department: 'Technical',
      hireDate: '2023-05-10',
      salary: 3000,
      commissionRate: 10,
      jobsCompleted: 128,
      performance: 4.7,
      isActive: true,
      lastLoginAt: '2024-03-19 14:20',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@repairflow.com',
      phone: '+62 815 6789 0123',
      role: 'TECHNICIAN',
      department: 'Technical',
      hireDate: '2023-07-01',
      salary: 3000,
      commissionRate: 10,
      jobsCompleted: 112,
      performance: 4.6,
      isActive: true,
      lastLoginAt: '2024-03-20 10:15',
    },
    {
      id: '5',
      name: 'James Wilson',
      email: 'james.w@repairflow.com',
      phone: '+62 816 7890 1234',
      role: 'CASHIER',
      department: 'Front Desk',
      hireDate: '2023-09-15',
      salary: 2500,
      commissionRate: 2,
      jobsCompleted: 89,
      performance: 4.5,
      isActive: false,
      lastLoginAt: '2024-03-15 16:30',
    },
  ]);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone?.includes(searchQuery);

    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' ? member.isActive : !member.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalStaff = staff.length;
  const activeStaff = staff.filter((m) => m.isActive).length;
  const totalJobsCompleted = staff.reduce((sum, m) => sum + m.jobsCompleted, 0);
  const avgPerformance = (
    staff.reduce((sum, m) => sum + m.performance, 0) / staff.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={filterRole}
            onValueChange={(v: UserRole | 'all') => setFilterRole(v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {Object.entries(roleConfig).map(([role, config]) => (
                <SelectItem key={role} value={role}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filterStatus}
            onValueChange={(v: 'all' | 'active' | 'inactive') =>
              setFilterStatus(v)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter staff member details below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="Email address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role *</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleConfig).map(([role, config]) => (
                      <SelectItem key={role} value={role}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Department" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hire-date">Hire Date</Label>
                <Input id="hire-date" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="commission">Commission Rate (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeStaff} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jobs Completed
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance}/5.0</div>
            <p className="text-xs text-muted-foreground mt-1">
              Excellent rating
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Payroll
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {staff.reduce((sum, m) => sum + (m.salary || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Base salary only
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => {
                  const roleInfo = roleConfig[member.role];

                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {member.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${roleInfo.color} text-white`}>
                          <div className="flex items-center gap-1">
                            {roleInfo.icon}
                            <span>{roleInfo.label}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{member.department || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-100 text-[10px] font-semibold text-yellow-800">
                            {member.performance}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {member.jobsCompleted}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={member.isActive ? 'default' : 'secondary'}
                          className={
                            member.isActive
                              ? 'bg-green-500 hover:bg-green-600'
                              : ''
                          }
                        >
                          {member.isActive ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              <span>Inactive</span>
                            </div>
                          )}
                        </Badge>
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
                                setSelectedStaff(member);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStaff(member);
                                setIsSalaryDialogOpen(true);
                              }}
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Manage Salary
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStaff(member);
                              }}
                            >
                              <Activity className="mr-2 h-4 w-4" />
                              View Activity Log
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>
              Update staff member details
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" defaultValue={selectedStaff.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedStaff.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" defaultValue={selectedStaff.phone} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select defaultValue={selectedStaff.role}>
                  <SelectTrigger id="edit-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleConfig).map(([role, config]) => (
                      <SelectItem key={role} value={role}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department</Label>
                <Input
                  id="edit-department"
                  defaultValue={selectedStaff.department}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-salary">Salary</Label>
                  <Input
                    id="edit-salary"
                    type="number"
                    defaultValue={selectedStaff.salary}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-commission">Commission Rate (%)</Label>
                  <Input
                    id="edit-commission"
                    type="number"
                    defaultValue={selectedStaff.commissionRate}
                  />
                </div>
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

      {/* Salary Management Dialog */}
      <Dialog open={isSalaryDialogOpen} onOpenChange={setIsSalaryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salary Management</DialogTitle>
            <DialogDescription>
              Manage salary and commission for {selectedStaff?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="manage-salary">Monthly Salary</Label>
                <Input
                  id="manage-salary"
                  type="number"
                  defaultValue={selectedStaff.salary}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="manage-commission">Commission Rate (%)</Label>
                <Input
                  id="manage-commission"
                  type="number"
                  defaultValue={selectedStaff.commissionRate}
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Estimated Monthly Earnings</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Salary</span>
                    <span>${selectedStaff.salary?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Commission ({selectedStaff.commissionRate}%)
                    </span>
                    <span>
                      $
                      {(
                        (selectedStaff.jobsCompleted * 100 * selectedStaff.commissionRate) /
                        100
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">
                      $
                      {(
                        (selectedStaff.salary || 0) +
                        (selectedStaff.jobsCompleted *
                          100 *
                          selectedStaff.commissionRate) /
                          100
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSalaryDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsSalaryDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
