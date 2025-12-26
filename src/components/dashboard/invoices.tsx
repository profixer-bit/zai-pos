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
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Share2,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Send,
  Printer,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED';

interface InvoiceItem {
  id: string;
  name: string;
  sku?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: InvoiceStatus;
  date: string;
  dueDate?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  items: InvoiceItem[];
  notes?: string;
  jobsheetId?: string;
}

const statusConfig: Record<InvoiceStatus, { label: string; color: string; icon: React.ReactNode }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-500', icon: <FileText className="h-3 w-3" /> },
  SENT: { label: 'Sent', color: 'bg-blue-500', icon: <Send className="h-3 w-3" /> },
  PAID: { label: 'Paid', color: 'bg-green-500', icon: <CheckCircle className="h-3 w-3" /> },
  PARTIAL: { label: 'Partial', color: 'bg-yellow-500', icon: <Clock className="h-3 w-3" /> },
  OVERDUE: { label: 'Overdue', color: 'bg-red-500', icon: <XCircle className="h-3 w-3" /> },
  CANCELLED: { label: 'Cancelled', color: 'bg-gray-700', icon: <XCircle className="h-3 w-3" /> },
};

export function InvoiceManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<InvoiceStatus | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+62 812 3456 7890',
      status: 'PAID',
      date: '2024-03-15',
      dueDate: '2024-03-29',
      subtotal: 350,
      tax: 35,
      discount: 0,
      total: 385,
      paidAmount: 385,
      items: [
        {
          id: '1',
          name: 'iPhone 14 Pro Screen Replacement',
          quantity: 1,
          unitPrice: 350,
          totalPrice: 350,
        },
      ],
      notes: 'Thank you for your business!',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '+62 813 4567 8901',
      status: 'SENT',
      date: '2024-03-18',
      dueDate: '2024-04-01',
      subtotal: 250,
      tax: 25,
      discount: 25,
      total: 250,
      paidAmount: 0,
      items: [
        {
          id: '1',
          name: 'iPhone 13 Screen Replacement',
          quantity: 1,
          unitPrice: 250,
          totalPrice: 250,
        },
      ],
      notes: 'Please complete payment by due date.',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customerName: 'Michael Brown',
      customerEmail: 'm.brown@email.com',
      customerPhone: '+62 814 5678 9012',
      status: 'OVERDUE',
      date: '2024-03-10',
      dueDate: '2024-03-24',
      subtotal: 180,
      tax: 18,
      discount: 0,
      total: 198,
      paidAmount: 0,
      items: [
        {
          id: '1',
          name: 'iPad Air 4 Charging Port Replacement',
          quantity: 1,
          unitPrice: 180,
          totalPrice: 180,
        },
      ],
      notes: 'Payment is overdue. Please contact us.',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customerName: 'Emily Davis',
      customerEmail: 'emily.d@email.com',
      customerPhone: '+62 815 6789 0123',
      status: 'PARTIAL',
      date: '2024-03-05',
      dueDate: '2024-03-19',
      subtotal: 80,
      tax: 8,
      discount: 0,
      total: 88,
      paidAmount: 50,
      items: [
        {
          id: '1',
          name: 'iPhone 12 Speaker Replacement',
          quantity: 1,
          unitPrice: 80,
          totalPrice: 80,
        },
      ],
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      customerName: 'James Wilson',
      customerEmail: 'j.wilson@email.com',
      customerPhone: '+62 816 7890 1234',
      status: 'DRAFT',
      date: '2024-03-20',
      dueDate: '2024-04-03',
      subtotal: 800,
      tax: 80,
      discount: 80,
      total: 800,
      paidAmount: 0,
      items: [
        {
          id: '1',
          name: 'MacBook Pro SSD 512GB Upgrade',
          quantity: 1,
          unitPrice: 400,
          totalPrice: 400,
        },
        {
          id: '2',
          name: 'Labor (Data Migration)',
          quantity: 1,
          unitPrice: 400,
          totalPrice: 400,
        },
      ],
      notes: 'Installation completed successfully.',
    },
  ]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const pendingAmount = invoices.reduce(
    (sum, inv) => sum + (inv.total - inv.paidAmount),
    0
  );
  const overdueInvoices = invoices.filter(
    (inv) => inv.status === 'OVERDUE'
  ).length;

  const handleDownloadPDF = (invoice: Invoice) => {
    alert(`Generating PDF for invoice ${invoice.invoiceNumber}...`);
  };

  const handleSendWhatsApp = (invoice: Invoice) => {
    alert(`Sending invoice ${invoice.invoiceNumber} via WhatsApp to ${invoice.customerPhone}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(v: InvoiceStatus | 'all') => setFilterStatus(v)}
          >
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
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Fill in invoice details below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer *</Label>
                <Select>
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Smith</SelectItem>
                    <SelectItem value="2">Sarah Johnson</SelectItem>
                    <SelectItem value="3">Michael Brown</SelectItem>
                    <SelectItem value="4">Emily Davis</SelectItem>
                    <SelectItem value="5">James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jobsheet">Link to Jobsheet (Optional)</Label>
                <Select>
                  <SelectTrigger id="jobsheet">
                    <SelectValue placeholder="Select jobsheet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="js-001">JS-001 - iPhone 14 Pro</SelectItem>
                    <SelectItem value="js-002">JS-002 - Samsung S23</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Invoice Date *</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date">Due Date *</Label>
                  <Input id="due-date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tax">Tax Rate (%)</Label>
                  <Input id="tax" type="number" defaultValue={10} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" type="number" defaultValue={0} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="DRAFT">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="SENT">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Line Items</Label>
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Item name" className="flex-1" />
                    <Input placeholder="Qty" type="number" className="w-20" />
                    <Input placeholder="Price" type="number" className="w-24" />
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Item name" className="flex-1" />
                    <Input placeholder="Qty" type="number" className="w-20" />
                    <Input placeholder="Price" type="number" className="w-24" />
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Invoice notes..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Invoice
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
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Unpaid invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue Invoices
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {overdueInvoices}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Action required
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid This Month
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${invoices.filter((inv) => inv.status === 'PAID').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter((inv) => inv.status === 'PAID').length} paid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const statusConfig = statusConfig[invoice.status];

                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">
                            {invoice.invoiceNumber}
                          </div>
                          {invoice.jobsheetId && (
                            <div className="text-xs text-muted-foreground">
                              {invoice.jobsheetId}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm font-medium">
                            {invoice.customerName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {invoice.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{invoice.date}</div>
                          {invoice.dueDate && (
                            <div className="text-xs text-muted-foreground">
                              Due: {invoice.dueDate}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusConfig.color} text-white`}
                        >
                          <div className="flex items-center gap-1">
                            {statusConfig.icon}
                            <span>{statusConfig.label}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          ${invoice.total.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          ${invoice.paidAmount.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setIsPreviewOpen(true);
                            }}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleDownloadPDF(invoice)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleSendWhatsApp(invoice)}
                              >
                                <Share2 className="mr-2 h-4 w-4" />
                                Send WhatsApp
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => alert('Printing invoice...')}
                              >
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              Invoice {selectedInvoice?.invoiceNumber}
            </DialogTitle>
            <DialogDescription>Invoice preview and details</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="py-4 max-h-[500px] overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-1">
                      INVOICE
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedInvoice.invoiceNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">RepairFlow Inc.</p>
                    <p className="text-sm text-muted-foreground">
                      123 Business St.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Bill To:
                  </p>
                  <p className="font-medium text-lg">
                    {selectedInvoice.customerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedInvoice.customerEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedInvoice.customerPhone}
                  </p>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Invoice Date:
                    </p>
                    <p className="text-lg">{selectedInvoice.date}</p>
                  </div>
                  {selectedInvoice.dueDate && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Due Date:
                      </p>
                      <p className="text-lg">{selectedInvoice.dueDate}</p>
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Items:
                  </p>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-sm font-medium">
                          Description
                        </th>
                        <th className="text-right py-2 text-sm font-medium w-20">
                          Qty
                        </th>
                        <th className="text-right py-2 text-sm font-medium w-24">
                          Price
                        </th>
                        <th className="text-right py-2 text-sm font-medium w-24">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3">{item.name}</td>
                          <td className="text-right py-3">{item.quantity}</td>
                          <td className="text-right py-3">
                            ${item.unitPrice.toLocaleString()}
                          </td>
                          <td className="text-right py-3 font-medium">
                            ${item.totalPrice.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ${selectedInvoice.subtotal.toLocaleString()}
                    </span>
                  </div>
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Discount ({selectedInvoice.discount}%)</span>
                      <span>
                        -$
                        {(
                          (selectedInvoice.subtotal *
                            selectedInvoice.discount) /
                            100
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${selectedInvoice.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">
                      ${selectedInvoice.total.toLocaleString()}
                    </span>
                  </div>
                  {selectedInvoice.paidAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Paid</span>
                      <span className="font-medium">
                        ${selectedInvoice.paidAmount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedInvoice.paidAmount < selectedInvoice.total && (
                    <div className="flex justify-between text-orange-600">
                      <span>Remaining</span>
                      <span className="font-medium">
                        $
                        {(
                          selectedInvoice.total - selectedInvoice.paidAmount
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {selectedInvoice.notes && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Notes:
                    </p>
                    <p className="text-sm">{selectedInvoice.notes}</p>
                  </div>
                )}

                {/* Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${statusConfig[selectedInvoice.status].color} text-white`}
                    >
                      <div className="flex items-center gap-1">
                        {statusConfig[selectedInvoice.status].icon}
                        <span>
                          {statusConfig[selectedInvoice.status].label}
                        </span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownloadPDF(selectedInvoice!)} className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSendWhatsApp(selectedInvoice!)}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Send WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
