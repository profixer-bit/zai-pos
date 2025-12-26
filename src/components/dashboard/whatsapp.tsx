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
  MessageSquare,
  Plus,
  Search,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Wrench,
  DollarSign,
  Calendar,
  Trash2,
  Edit,
  MoreHorizontal,
  Bell,
  Zap,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TemplateType =
  | 'JOB_STATUS_UPDATE'
  | 'APPOINTMENT_REMINDER'
  | 'INVOICE_SEND'
  | 'PAYMENT_RECEIPT'
  | 'PROMOTION'
  | 'CUSTOM';

type MessageStatus = 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

interface WhatsAppTemplate {
  id: string;
  name: string;
  type: TemplateType;
  content: string;
  isActive: boolean;
  createdAt: string;
  usedCount: number;
}

interface WhatsAppMessage {
  id: string;
  recipient: string;
  message: string;
  status: MessageStatus;
  templateId?: string;
  referenceType?: string;
  referenceId?: string;
  cost?: number;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  failedAt?: string;
  error?: string;
}

const templateTypeConfig: Record<TemplateType, { label: string; icon: React.ReactNode; color: string }> = {
  JOB_STATUS_UPDATE: { label: 'Job Status Update', icon: <Wrench className="h-4 w-4" />, color: 'bg-blue-500' },
  APPOINTMENT_REMINDER: { label: 'Appointment Reminder', icon: <Calendar className="h-4 w-4" />, color: 'bg-green-500' },
  INVOICE_SEND: { label: 'Invoice Send', icon: <DollarSign className="h-4 w-4" />, color: 'bg-purple-500' },
  PAYMENT_RECEIPT: { label: 'Payment Receipt', icon: <CheckCircle className="h-4 w-4" />, color: 'bg-teal-500' },
  PROMOTION: { label: 'Promotion', icon: <Zap className="h-4 w-4" />, color: 'bg-orange-500' },
  CUSTOM: { label: 'Custom Message', icon: <MessageSquare className="h-4 w-4" />, color: 'bg-gray-500' },
};

const messageStatusConfig: Record<MessageStatus, { label: string; color: string; icon: React.ReactNode }> = {
  QUEUED: { label: 'Queued', color: 'bg-gray-500', icon: <Clock className="h-3 w-3" /> },
  SENT: { label: 'Sent', color: 'bg-blue-500', icon: <Send className="h-3 w-3" /> },
  DELIVERED: { label: 'Delivered', color: 'bg-green-500', icon: <CheckCircle className="h-3 w-3" /> },
  READ: { label: 'Read', color: 'bg-green-600', icon: <CheckCircle className="h-3 w-3" /> },
  FAILED: { label: 'Failed', color: 'bg-red-500', icon: <XCircle className="h-3 w-3" /> },
};

export function WhatsAppAutomation() {
  const [activeTab, setActiveTab] = useState<'templates' | 'messages'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<MessageStatus | 'all'>('all');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WhatsAppTemplate | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [templates] = useState<WhatsAppTemplate[]>([
    {
      id: '1',
      name: 'Job Started',
      type: 'JOB_STATUS_UPDATE',
      content: 'Hello {{name}}, your job for {{device}} ({{job_id}}) has started. We will notify you when it\'s completed.',
      isActive: true,
      createdAt: '2024-01-15',
      usedCount: 145,
    },
    {
      id: '2',
      name: 'Job Completed',
      type: 'JOB_STATUS_UPDATE',
      content: 'Hello {{name}}, great news! Your {{device}} repair ({{job_id}}) is complete. Total cost: ${{amount}}. Ready for pickup!',
      isActive: true,
      createdAt: '2024-01-15',
      usedCount: 142,
    },
    {
      id: '3',
      name: 'Appointment Reminder',
      type: 'APPOINTMENT_REMINDER',
      content: 'Reminder: You have an appointment at {{time}} tomorrow for your {{device}} repair. Please arrive 10 minutes early.',
      isActive: true,
      createdAt: '2024-02-01',
      usedCount: 89,
    },
    {
      id: '4',
      name: 'Invoice Notification',
      type: 'INVOICE_SEND',
      content: 'Hello {{name}}, Invoice #{{invoice_number}} for ${{total}} has been sent. Please complete payment by {{due_date}}. Thank you!',
      isActive: true,
      createdAt: '2024-02-10',
      usedCount: 67,
    },
    {
      id: '5',
      name: 'Payment Received',
      type: 'PAYMENT_RECEIPT',
      content: 'Thank you {{name}}! We received payment of ${{amount}} for Invoice #{{invoice_number}}. Your account is up to date.',
      isActive: true,
      createdAt: '2024-02-15',
      usedCount: 58,
    },
  ]);

  const [messages] = useState<WhatsAppMessage[]>([
    {
      id: '1',
      recipient: '+62 812 3456 7890',
      message: 'Hello John, your job for iPhone 14 Pro (JS-001) is complete. Total cost: $350. Ready for pickup!',
      status: 'DELIVERED',
      templateId: '2',
      referenceType: 'jobsheet',
      referenceId: 'JS-001',
      cost: 0.02,
      sentAt: '2024-03-20 09:30',
      deliveredAt: '2024-03-20 09:31',
      readAt: '2024-03-20 09:35',
    },
    {
      id: '2',
      recipient: '+62 813 4567 8901',
      message: 'Hello Sarah, Invoice #INV-002 for $250 has been sent. Please complete payment by 2024-04-01.',
      status: 'DELIVERED',
      templateId: '4',
      referenceType: 'invoice',
      referenceId: 'INV-002',
      cost: 0.02,
      sentAt: '2024-03-18 14:00',
      deliveredAt: '2024-03-18 14:01',
      readAt: '2024-03-18 14:05',
    },
    {
      id: '3',
      recipient: '+62 814 5678 9012',
      message: 'Reminder: You have an appointment at 10:00 AM tomorrow for your Samsung S23 repair.',
      status: 'DELIVERED',
      templateId: '3',
      referenceType: 'appointment',
      referenceId: 'APT-001',
      cost: 0.02,
      sentAt: '2024-03-19 08:00',
      deliveredAt: '2024-03-19 08:01',
    },
    {
      id: '4',
      recipient: '+62 815 6789 0123',
      message: 'Hello Emily, your job for iPhone 13 (JS-004) has started.',
      status: 'FAILED',
      templateId: '1',
      referenceType: 'jobsheet',
      referenceId: 'JS-004',
      cost: 0,
      failedAt: '2024-03-20 10:15',
      error: 'Invalid phone number format',
    },
    {
      id: '5',
      recipient: '+62 816 7890 1234',
      message: 'Special offer: 20% off all screen replacements this week! Use code SCREEN20.',
      status: 'DELIVERED',
      referenceType: 'promotion',
      cost: 0.02,
      sentAt: '2024-03-18 09:00',
      deliveredAt: '2024-03-18 09:01',
    },
  ]);

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.recipient.includes(searchQuery) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalSent = messages.filter((m) => m.status !== 'FAILED').length;
  const totalFailed = messages.filter((m) => m.status === 'FAILED').length;
  const totalCost = messages.reduce((sum, m) => sum + (m.cost || 0), 0).toFixed(2);
  const avgDeliveryTime = messages
    .filter((m) => m.sentAt && m.deliveredAt)
    .length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Messages Sent
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSent}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed Messages
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {totalFailed}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cost
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Templates
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter((t) => t.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {templates.length} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'templates' ? 'default' : 'outline'}
          onClick={() => setActiveTab('templates')}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          Templates
        </Button>
        <Button
          variant={activeTab === 'messages' ? 'default' : 'outline'}
          onClick={() => setActiveTab('messages')}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Message Log
        </Button>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <>
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog
              open={isTemplateDialogOpen}
              onOpenChange={setIsTemplateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable WhatsApp message template
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="template-name">Template Name *</Label>
                    <Input
                      id="template-name"
                      placeholder="e.g., Job Completed"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template-type">Template Type *</Label>
                    <Select>
                      <SelectTrigger id="template-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(templateTypeConfig).map(([type, config]) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center gap-2">
                              {config.icon}
                              <span>{config.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template-content">
                      Message Content *
                    </Label>
                    <Textarea
                      id="template-content"
                      placeholder="Enter your message. Use {{variable}} for dynamic content."
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Available variables: {{name}}, {{device}}, {{job_id}}, {{amount}}, {{invoice_number}}, {{due_date}}, {{time}}, etc.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsTemplateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsTemplateDialogOpen(false)}>
                    Create Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Message Templates ({filteredTemplates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredTemplates.map((template) => {
                  const typeConfig = templateTypeConfig[template.type];

                  return (
                    <Card
                      key={template.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="pt-6 space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge className={`${typeConfig.color} text-white`}>
                            <div className="flex items-center gap-1">
                              {typeConfig.icon}
                              <span>{typeConfig.label}</span>
                            </div>
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTemplate(template);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(
                                    `Testing template: ${template.name}`
                                  )
                                }
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Test
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(
                                    `Duplicating template: ${template.name}`
                                  )
                                }
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {template.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {template.content}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Send className="h-3 w-3" />
                              {template.usedCount} uses
                            </span>
                          </div>
                          <Badge
                            variant={template.isActive ? 'default' : 'secondary'}
                            className={
                              template.isActive
                                ? 'bg-green-500 hover:bg-green-600'
                                : ''
                            }
                          >
                            {template.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(v: MessageStatus | 'all') => setFilterStatus(v)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.entries(messageStatusConfig).map(([status, config]) => (
                  <SelectItem key={status} value={status}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog
              open={isSendDialogOpen}
              onOpenChange={setIsSendDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Custom Message</DialogTitle>
                  <DialogDescription>
                    Send a custom WhatsApp message
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="recipient">Recipient Phone *</Label>
                    <Input
                      id="recipient"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="custom-message">Message *</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Type your message..."
                      rows={6}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsSendDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      alert('Message queued for sending');
                      setIsSendDialogOpen(false);
                    }}
                  >
                    Send Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Message Log ({filteredMessages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Delivered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => {
                      const statusConfig = messageStatusConfig[message.status];

                      return (
                        <TableRow key={message.id}>
                          <TableCell>
                            <div className="font-medium">
                              {message.recipient}
                            </div>
                            {message.referenceType && (
                              <div className="text-xs text-muted-foreground">
                                Ref: {message.referenceId}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md truncate">
                              {message.message}
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
                            <div className="text-sm">
                              ${message.cost?.toFixed(2) || '0.00'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {message.sentAt || '-'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {message.deliveredAt || '-'}
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
        </>
      )}
    </div>
  );
}
