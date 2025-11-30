import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Admin credentials (in production, use environment variables and proper hashing)
const ADMIN_EMAIL = "gauravdev@mountpole.com";
const ADMIN_PASSWORD = "g@urav@2901";

// Simple token generation (in production, use JWT)
function generateToken(): string {
  return `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateToken();

      // Set secure cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Login successful",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
