import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subdomain = searchParams.get('subdomain');

    if (!subdomain) {
      return NextResponse.json(
        { error: 'Subdomain is required' },
        { status: 400 }
      );
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        { error: 'Invalid subdomain format' },
        { status: 400 }
      );
    }

    // Check if subdomain exists
    const tenant = await db.tenant.findUnique({
      where: { subdomain },
      select: {
        id: true,
        name: true,
        isActive: true,
        isTrial: true,
        trialEndsAt: true,
      },
    });

    return NextResponse.json({
      available: !tenant,
      exists: !!tenant,
      tenant: tenant ? {
        name: tenant.name,
        isActive: tenant.isActive,
        isTrial: tenant.isTrial,
        trialEndsAt: tenant.trialEndsAt,
      } : null,
    });
  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
