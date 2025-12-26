import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, subdomain } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find tenant by subdomain if provided
    let tenant = null;
    if (subdomain) {
      tenant = await db.tenant.findUnique({
        where: { subdomain },
      });

      if (!tenant) {
        return NextResponse.json(
          { error: 'Invalid subdomain' },
          { status: 404 }
        );
      }

      if (!tenant.isActive) {
        return NextResponse.json(
          { error: 'Tenant account is inactive' },
          { status: 403 }
        );
      }
    }

    // Find user by email
    const user = await db.user.findFirst({
      where: { email },
      include: {
        tenant: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'User account is inactive' },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          subdomain: user.tenant.subdomain,
          isTrial: user.tenant.isTrial,
          trialEndsAt: user.tenant.trialEndsAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
