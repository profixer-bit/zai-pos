'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wrench,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
} from 'lucide-react';

export function ReportsAnalytics() {
  const [reportType, setReportType] = useState<
    'overview' | 'sales' | 'jobs' | 'inventory' | 'customers' | 'performance'
  >('overview');
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days' | '1year'>('30days');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf');

  // Revenue data
  const revenueData = [
    { month: 'Jan', revenue: 12000, profit: 4800, jobs: 45 },
    { month: 'Feb', revenue: 15000, profit: 6000, jobs: 52 },
    { month: 'Mar', revenue: 13000, profit: 5200, jobs: 48 },
    { month: 'Apr', revenue: 18000, profit: 7200, jobs: 58 },
    { month: 'May', revenue: 16000, profit: 6400, jobs: 55 },
    { month: 'Jun', revenue: 21000, profit: 8400, jobs: 62 },
  ];

  // Jobs by status
  const jobsByStatusData = [
    { name: 'Completed', value: 245, color: '#22c55e' },
    { name: 'In Progress', value: 45, color: '#3b82f6' },
    { name: 'Pending', value: 32, color: '#f59e0b' },
    { name: 'Waiting Parts', value: 18, color: '#8b5cf6' },
    { name: 'Delivered', value: 220, color: '#10b981' },
  ];

  // Jobs by priority
  const jobsByPriorityData = [
    { name: 'Low', count: 25 },
    { name: 'Normal', count: 180 },
    { name: 'High', count: 45 },
    { name: 'Urgent', count: 10 },
  ];

  // Sales by category
  const salesByCategoryData = [
    { category: 'Screens', amount: 15000, jobs: 45 },
    { category: 'Batteries', amount: 8000, jobs: 32 },
    { category: 'Charging', amount: 6000, jobs: 18 },
    { category: 'Storage', amount: 5000, jobs: 12 },
    { category: 'Accessories', amount: 3500, jobs: 28 },
  ];

  // Technician performance
  const technicianPerformanceData = [
    { name: 'John Smith', jobs: 156, revenue: 42000, rating: 4.8 },
    { name: 'Sarah Johnson', jobs: 142, revenue: 38000, rating: 4.9 },
    { name: 'Mike Brown', jobs: 128, revenue: 34000, rating: 4.7 },
    { name: 'Emily Davis', jobs: 112, revenue: 29000, rating: 4.6 },
  ];

  // Customer growth
  const customerGrowthData = [
    { month: 'Jan', newCustomers: 12, total: 45 },
    { month: 'Feb', newCustomers: 18, total: 63 },
    { month: 'Mar', newCustomers: 15, total: 78 },
    { month: 'Apr', newCustomers: 22, total: 100 },
    { month: 'May', newCustomers: 25, total: 125 },
    { month: 'Jun', newCustomers: 28, total: 153 },
  ];

  const handleExport = () => {
    alert(`Exporting report as ${exportFormat.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={(v: any) => setReportType(v)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="sales">Sales Report</SelectItem>
              <SelectItem value="jobs">Jobs Report</SelectItem>
              <SelectItem value="inventory">Inventory Report</SelectItem>
              <SelectItem value="customers">Customer Report</SelectItem>
              <SelectItem value="performance">Performance Report</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={(v: any) => setDateRange(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export {exportFormat.toUpperCase()}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${revenueData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">
                +18.5%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Jobs
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {revenueData.reduce((sum, d) => sum + d.jobs, 0)}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">
                +12.3%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Profit
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${revenueData.reduce((sum, d) => sum + d.profit, 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">
                +22.1%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Job Value
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {Math.round(
                revenueData.reduce((sum, d) => sum + d.revenue, 0) /
                  revenueData.reduce((sum, d) => sum + d.jobs, 0)
              ).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">
                -3.2%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Jobs by Status Pie Chart */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobsByStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {jobsByStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {jobsByStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <Badge variant="secondary">{item.value}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jobs by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobsByPriorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  name="Sales Amount"
                />
                <Bar
                  dataKey="jobs"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  name="Jobs"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Technician Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    Technician
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Jobs Completed
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Avg Job Value
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {technicianPerformanceData.map((tech) => (
                  <tr key={tech.name} className="border-b">
                    <td className="py-3 px-4">
                      <div className="font-medium">{tech.name}</div>
                    </td>
                    <td className="text-right py-3 px-4">
                      <Badge variant="secondary">{tech.jobs}</Badge>
                    </td>
                    <td className="text-right py-3 px-4 font-medium">
                      ${tech.revenue.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4">
                      ${(tech.revenue / tech.jobs).toFixed(0)}
                    </td>
                    <td className="text-right py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {tech.rating}/5.0
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="New Customers"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="total"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Total Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="export-type">Report Type</Label>
              <Select value={reportType}>
                <SelectTrigger id="export-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview Report</SelectItem>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="jobs">Jobs Report</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                  <SelectItem value="customers">Customer Report</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="export-date">Date Range</Label>
              <Select value={dateRange}>
                <SelectTrigger id="export-date">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="export-format">Format</Label>
              <Select value={exportFormat} onValueChange={(v: any) => setExportFormat(v)}>
                <SelectTrigger id="export-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleExport} className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" onClick={() => alert('Scheduling report...')} className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
