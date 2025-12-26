'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Phone,
  Mail,
  FileText,
  DollarSign,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalJobs: number;
  totalSpent: number;
  createdAt: string;
}

export function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+62 812 3456 7890',
      address: 'Jl. Sudirman No. 123, Jakarta',
      totalJobs: 5,
      totalSpent: 1250,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+62 813 4567 8901',
      address: 'Jl. Thamrin No. 456, Jakarta',
      totalJobs: 3,
      totalSpent: 750,
      createdAt: '2024-02-20',
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'm.brown@email.com',
      phone: '+62 814 5678 9012',
      address: 'Jl. Gatot Subroto No. 789, Jakarta',
      totalJobs: 8,
      totalSpent: 2100,
      createdAt: '2024-01-10',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '+62 815 6789 0123',
      totalJobs: 2,
      totalSpent: 350,
      createdAt: '2024-03-05',
    },
    {
      id: '5',
      name: 'James Wilson',
      email: 'j.wilson@email.com',
      phone: '+62 816 7890 1234',
      address: 'Jl. HR Rasuna Said No. 321, Jakarta',
      totalJobs: 12,
      totalSpent: 3200,
      createdAt: '2023-12-01',
    },
  ]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Customers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                Inactive Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter the customer details below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="Email address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" placeholder="Phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Address" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Jobs
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((sum, c) => sum + c.totalJobs, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Jobs</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        {customer.address && (
                          <div className="text-xs text-muted-foreground">
                            {customer.address}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{customer.totalJobs}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${customer.totalSpent.toLocaleString()}
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
                              setSelectedCustomer(customer);
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update the customer details below
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name *</Label>
                <Input id="edit-name" defaultValue={selectedCustomer.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedCustomer.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone *</Label>
                <Input id="edit-phone" defaultValue={selectedCustomer.phone} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  defaultValue={selectedCustomer.address}
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

import { Users } from 'lucide-react';
