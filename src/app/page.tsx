'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Wrench,
  Package,
  MessageSquare,
  BarChart3,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Smartphone,
  Globe,
  Clock,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">RepairFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <a href="/dashboard">View Dashboard Demo</a>
            </Button>
            <Button>Start Free Trial</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Zap className="mr-1 h-3 w-3" />
              New: WhatsApp Automation
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Modern Repair Shop Management Made Simple
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Streamline your repair business with AI-powered tools, real-time inventory tracking,
              automated WhatsApp notifications, and comprehensive reporting. Everything you need to grow.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2">
                Start 14-Day Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • Setup in minutes • Cancel anytime
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-sm text-muted-foreground">Active Shops</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-sm text-muted-foreground">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Run Your Shop
            </h2>
            <p className="text-lg text-muted-foreground">
              From customer management to automated invoicing, we've got you covered
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Customer Management"
              description="Track customer history, preferences, and communications all in one place"
              features={['Complete database', 'WhatsApp integration', 'Bulk operations']}
            />
            <FeatureCard
              icon={<Wrench className="h-6 w-6" />}
              title="Job Sheets & Repair Tickets"
              description="Complete workflow management from pending to delivered"
              features={['Drag & drop status', 'Technician assignment', 'Photo documentation']}
            />
            <FeatureCard
              icon={<Package className="h-6 w-6" />}
              title="Inventory Management"
              description="Real-time stock tracking with automatic deductions and low stock alerts"
              features={['Barcode support', 'Supplier management', 'Stock adjustments']}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Dashboard & Analytics"
              description="Comprehensive reports with real-time statistics and insights"
              features={['Revenue tracking', 'Performance metrics', 'Custom reports']}
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="WhatsApp Automation"
              description="Automated notifications for job updates, appointments, and invoices"
              features={['Custom templates', 'Message logs', 'Credit management']}
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Role-Based Access"
              description="Granular permissions for admin, manager, technician, and cashier roles"
              features={['Multi-role support', 'Activity logs', 'Secure access']}
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with a 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <PricingCard
              title="Basic"
              description="Perfect for small repair shops"
              price={29}
              period="month"
              features={[
                'Up to 3 users',
                '500 jobs/month',
                'Basic inventory',
                'Email support',
                'Basic reports',
              ]}
              cta="Start Free Trial"
              highlighted={false}
            />
            <PricingCard
              title="Pro"
              description="For growing businesses"
              price={79}
              period="month"
              features={[
                'Up to 10 users',
                'Unlimited jobs',
                'Advanced inventory',
                'WhatsApp automation',
                'Priority support',
                'Advanced analytics',
                'Custom invoice templates',
              ]}
              cta="Start Free Trial"
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              description="For large operations"
              price={199}
              period="month"
              features={[
                'Unlimited users',
                'Unlimited everything',
                'Multi-location support',
                'Dedicated account manager',
                '24/7 phone support',
                'Custom integrations',
                'White-label option',
                'SLA guarantee',
              ]}
              cta="Contact Sales"
              highlighted={false}
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Repair Shops Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say about RepairFlow
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <TestimonialCard
              name="Ahmad Rahman"
              role="Owner, FixIt Phones"
              content="RepairFlow transformed how we manage our repair shop. The WhatsApp automation alone saved us hours every week. Highly recommended!"
              rating={5}
            />
            <TestimonialCard
              name="Siti Nurhaliza"
              role="Manager, TechRepair Hub"
              content="The inventory management is a game changer. We never run out of parts anymore, and the low stock alerts are super helpful."
              rating={5}
            />
            <TestimonialCard
              name="Michael Chen"
              role="CEO, QuickFix Pro"
              content="We've tried 3 different systems before finding RepairFlow. This is by far the most intuitive and feature-rich solution out there."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/50">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Repair Business?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of repair shops already using RepairFlow to grow their business.
              Start your free trial today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2">
                Start 14-Day Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Wrench className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">RepairFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern repair shop management software for growing businesses.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Integrations</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Status</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 RepairFlow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <div className="text-primary">{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PricingCard({
  title,
  description,
  price,
  period,
  features,
  cta,
  highlighted,
}: {
  title: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}) {
  return (
    <Card className={`relative ${highlighted ? 'border-primary shadow-lg scale-105' : ''}`}>
      {highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={highlighted ? 'default' : 'outline'}>
          {cta}
        </Button>
      </CardFooter>
    </Card>
  );
}

function TestimonialCard({
  name,
  role,
  content,
  rating,
}: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <CardDescription className="text-base leading-relaxed">
          {content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
