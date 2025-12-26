'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Clock,
  Wrench,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type JobStatus = 'PENDING' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'COMPLETED' | 'DELIVERED' | 'CANCELLED';

interface JobSheet {
  id: string;
  customerName: string;
  deviceBrand: string;
  deviceModel: string;
  serialNumber?: string;
  problem: string;
  status: JobStatus;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  technician?: string;
  estimatedCost: number;
  createdAt: string;
}

const statusConfig: Record<JobStatus, { label: string; icon: React.ReactNode; color: string }> = {
  PENDING: { label: 'Pending', icon: <Clock className="h-3 w-3" />, color: 'bg-yellow-500' },
  IN_PROGRESS: { label: 'In Progress', icon: <Wrench className="h-3 w-3" />, color: 'bg-blue-500' },
  WAITING_PARTS: { label: 'Waiting Parts', icon: <AlertCircle className="h-3 w-3" />, color: 'bg-orange-500' },
  COMPLETED: { label: 'Completed', icon: <CheckCircle className="h-3 w-3" />, color: 'bg-green-500' },
  DELIVERED: { label: 'Delivered', icon: <CheckCircle className="h-3 w-3" />, color: 'bg-green-600' },
  CANCELLED: { label: 'Cancelled', icon: <AlertCircle className="h-3 w-3" />, color: 'bg-red-500' },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  LOW: { label: 'Low', color: 'bg-gray-500' },
  NORMAL: { label: 'Normal', color: 'bg-blue-500' },
  HIGH: { label: 'High', color: 'bg-orange-500' },
  URGENT: { label: 'Urgent', color: 'bg-red-500' },
};

export function JobSheetManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobSheet | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [jobSheets] = useState<JobSheet[]>([
    {
      id: '1',
      customerName: 'John Smith',
      deviceBrand: 'iPhone',
      deviceModel: '14 Pro',
      serialNumber: 'DNPXK2XXXX',
      problem: 'Screen replacement needed, display showing lines',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      technician: 'John Tech',
      estimatedCost: 350,
      createdAt: '2024-03-15',
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      deviceBrand: 'Samsung',
      deviceModel: 'Galaxy S23',
      serialNumber: 'R5CRXXXXXXX',
      problem: 'Battery draining fast, phone overheating',
      status: 'PENDING',
      priority: 'NORMAL',
      estimatedCost: 120,
      createdAt: '2024-03-18',
    },
    {
      id: '3',
      customerName: 'Michael Brown',
      deviceBrand: 'iPad',
      deviceModel: 'Air 4',
      serialNumber: 'DMPXXXKXXXX',
      problem: 'Not charging, port damage',
      status: 'WAITING_PARTS',
      priority: 'HIGH',
      technician: 'Mike Tech',
      estimatedCost: 180,
      createdAt: '2024-03-10',
    },
    {
      id: '4',
      customerName: 'Emily Davis',
      deviceBrand: 'iPhone',
      deviceModel: '13',
      serialNumber: 'DNNXXXXXXX',
      problem: 'Speaker not working, no sound',
      status: 'COMPLETED',
      priority: 'NORMAL',
      technician: 'Sarah Tech',
      estimatedCost: 80,
      createdAt: '2024-03-05',
    },
    {
      id: '5',
      customerName: 'James Wilson',
      deviceBrand: 'MacBook',
      deviceModel: 'Pro 14"',
      serialNumber: 'C02XXXXXXX',
      problem: 'Screen flickering, display issue',
      status: 'PENDING',
      priority: 'URGENT',
      estimatedCost: 800,
      createdAt: '2024-03-20',
    },
  ]);

  const filteredJobs = jobSheets.filter((job) => {
    const matchesSearch =
      job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = Object.entries(
    jobSheets.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<JobStatus, number>)
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobsheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={(v: JobStatus | 'all') => setFilterStatus(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(statusConfig).map(([status, config]) => (
                <SelectItem key={status} value={status}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Job Sheet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Job Sheet</DialogTitle>
              <DialogDescription>
                Fill in the repair job details
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer *</Label>
                <Input id="customer" placeholder="Select or add customer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand">Device Brand *</Label>
                  <Input id="brand" placeholder="e.g., iPhone" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="model">Device Model *</Label>
                  <Input id="model" placeholder="e.g., 14 Pro" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="serial">Serial Number</Label>
                <Input id="serial" placeholder="Serial number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="problem">Problem Description *</Label>
                <Textarea
                  id="problem"
                  placeholder="Describe the issue"
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="technician">Technician</Label>
                  <Select>
                    <SelectTrigger id="technician">
                      <SelectValue placeholder="Assign technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech1">John Tech</SelectItem>
                      <SelectItem value="tech2">Sarah Tech</SelectItem>
                      <SelectItem value="tech3">Mike Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimated">Estimated Cost</Label>
                <Input id="estimated" type="number" placeholder="$0.00" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Job Sheet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {statusCounts.map(([status, count]) => {
          const config = statusConfig[status as JobStatus];
          return (
            <Card key={status}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {config.label}
                    </p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.color} text-white`}>
                    {config.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{jobSheets.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                <Wrench className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Sheets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => {
          const statusConfig = statusConfig[job.status];
          const priorityConfig = priorityConfig[job.priority];

          return (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base mb-1">{job.customerName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {job.deviceBrand} {job.deviceModel}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedJob(job);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Problem</p>
                    <p className="text-sm">{job.problem}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`${statusConfig.color} text-white`}
                    >
                      <div className="flex items-center gap-1">
                        {statusConfig.icon}
                        <span>{statusConfig.label}</span>
                      </div>
                    </Badge>
                    <Badge className={`${priorityConfig.color} text-white`}>
                      {priorityConfig.label}
                    </Badge>
                  </div>

                  {job.technician && (
                    <div className="flex items-center gap-2 text-sm">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Technician:</span>
                      <span className="font-medium">{job.technician}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">Est. Cost</span>
                    <span className="font-semibold">${job.estimatedCost}</span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Created: {job.createdAt}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Job Sheet</DialogTitle>
            <DialogDescription>
              Update the job sheet details
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select defaultValue={selectedJob.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <SelectItem key={status} value={status}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select defaultValue={selectedJob.priority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(priorityConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-problem">Problem Description</Label>
                <Textarea
                  id="edit-problem"
                  defaultValue={selectedJob.problem}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-diagnosis">Diagnosis</Label>
                <Textarea
                  id="edit-diagnosis"
                  placeholder="Enter diagnosis"
                  className="resize-none"
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-solution">Solution</Label>
                <Textarea
                  id="edit-solution"
                  placeholder="Enter solution"
                  className="resize-none"
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-estimated">Estimated Cost</Label>
                <Input
                  id="edit-estimated"
                  type="number"
                  defaultValue={selectedJob.estimatedCost}
                />
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
    </div>
  );
}
