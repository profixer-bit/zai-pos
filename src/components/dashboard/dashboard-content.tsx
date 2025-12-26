'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Wrench,
  Package,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

export function DashboardContent() {
  // Mock data for the dashboard
  const metrics = [
    {
      title: 'Total Jobs',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Wrench,
    },
    {
      title: 'Pending Jobs',
      value: '23',
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
    },
    {
      title: 'Sales Today',
      value: '$4,567',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Low Stock Items',
      value: '7',
      change: '+2',
      trend: 'up',
      icon: AlertTriangle,
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000, profit: 4800 },
    { month: 'Feb', revenue: 15000, profit: 6000 },
    { month: 'Mar', revenue: 13000, profit: 5200 },
    { month: 'Apr', revenue: 18000, profit: 7200 },
    { month: 'May', revenue: 16000, profit: 6400 },
    { month: 'Jun', revenue: 21000, profit: 8400 },
  ];

  const jobsData = [
    { status: 'Pending', count: 23 },
    { status: 'In Progress', count: 15 },
    { status: 'Waiting Parts', count: 8 },
    { status: 'Completed', count: 45 },
    { status: 'Delivered', count: 38 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'job',
      message: 'Job #1234 marked as completed by Tech John',
      time: '5 minutes ago',
    },
    {
      id: 2,
      type: 'customer',
      message: 'New customer: Sarah Johnson registered',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment of $450 received for Invoice #INV-001',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'inventory',
      message: 'Low stock alert: iPhone 12 Screens (2 remaining)',
      time: '2 hours ago',
    },
    {
      id: 5,
      type: 'whatsapp',
      message: 'WhatsApp notification sent to customer #456',
      time: '3 hours ago',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      customer: 'Michael Brown',
      device: 'iPhone 14 Pro',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      customer: 'Emily Davis',
      device: 'Samsung Galaxy S23',
      time: '11:30 AM',
      status: 'pending',
    },
    {
      id: 3,
      customer: 'James Wilson',
      device: 'iPad Air',
      time: '2:00 PM',
      status: 'confirmed',
    },
    {
      id: 4,
      customer: 'Lisa Anderson',
      device: 'MacBook Pro',
      time: '4:30 PM',
      status: 'pending',
    },
  ];

  const technicianPerformance = [
    { name: 'John Smith', jobs: 45, rating: 4.8 },
    { name: 'Sarah Johnson', jobs: 38, rating: 4.9 },
    { name: 'Mike Brown', jobs: 32, rating: 4.7 },
    { name: 'Emily Davis', jobs: 28, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositiveTrend = metric.trend === 'up';

          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  {isPositiveTrend ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      isPositiveTrend ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Jobs by Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Upcoming */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                    {activity.type === 'job' && <Wrench className="h-4 w-4" />}
                    {activity.type === 'customer' && (
                      <Users className="h-4 w-4" />
                    )}
                    {activity.type === 'payment' && (
                      <DollarSign className="h-4 w-4" />
                    )}
                    {activity.type === 'inventory' && (
                      <Package className="h-4 w-4" />
                    )}
                    {activity.type === 'whatsapp' && (
                      <TrendingUp className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {appointment.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.device}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <Badge
                      variant={
                        appointment.status === 'confirmed'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technician Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicianPerformance.map((tech, index) => (
              <div key={tech.name} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold">
                  {tech.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{tech.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {tech.jobs} jobs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(tech.jobs / 45) * 100}%` }}
                      />
                    </div>
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-yellow-100 text-[10px] font-semibold text-yellow-800">
                      {tech.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
