import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';
import { UserRole } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      tenantName,
      subdomain,
      planType = 'BASIC',
    } = body;

    // Validate required fields
    if (!name || !email || !password || !tenantName || !subdomain) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Check if subdomain is already taken
    const existingTenant = await db.tenant.findUnique({
      where: { subdomain },
    });

    if (existingTenant) {
      return NextResponse.json(
        { error: 'Subdomain is already taken' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create tenant with subscription
    const tenant = await db.tenant.create({
      data: {
        name: tenantName,
        subdomain,
        isTrial: true,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        subscription: {
          create: {
            planId: planType,
            status: 'ACTIVE',
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          },
        },
        users: {
          create: {
            email,
            password: hashedPassword,
            name,
            role: UserRole.ADMIN,
            isActive: true,
          },
        },
      },
      include: {
        users: true,
      },
    });

    // Generate JWT token
    const user = tenant.users[0];
    const token = await signToken({
      userId: user.id,
      tenantId: tenant.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        tenant: {
          id: tenant.id,
          name: tenant.name,
          subdomain: tenant.subdomain,
          isTrial: tenant.isTrial,
          trialEndsAt: tenant.trialEndsAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
