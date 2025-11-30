import { NextRequest, NextResponse } from "next/server";

// Form response interface
interface FormResponse {
  id: string;
  formType: string;
  timestamp: string;
  data: Record<string, unknown>;
  metadata: {
    userAgent?: string;
    referrer?: string;
    ip?: string;
  };
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Google Sheets Web App URL (optional - set in environment variable)
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

// Send to Google Sheets if configured
async function sendToGoogleSheets(data: Record<string, unknown>): Promise<boolean> {
  if (!GOOGLE_SHEETS_URL) {
    console.log("Google Sheets URL not configured, skipping...");
    return true; // Return true so form submission still succeeds
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.formType) {
      return NextResponse.json(
        { success: false, error: "formType is required" },
        { status: 400 }
      );
    }

    // Create response object
    const response: FormResponse = {
      id: generateId(),
      formType: body.formType,
      timestamp: body.timestamp || new Date().toISOString(),
      data: { ...body },
      metadata: {
        userAgent:
          body.userAgent || request.headers.get("user-agent") || undefined,
        referrer: body.referrer || request.headers.get("referer") || undefined,
        ip:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          undefined,
      },
    };

    // Remove metadata fields from data to avoid duplication
    delete response.data.userAgent;
    delete response.data.referrer;
    delete response.data.timestamp;

    // Log the submission (will appear in Netlify function logs)
    console.log("Form submission received:", JSON.stringify(response, null, 2));

    // Try to send to Google Sheets (optional)
    await sendToGoogleSheets({
      ...response.data,
      formType: response.formType,
      timestamp: response.timestamp,
      id: response.id,
    });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: response.id,
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // In serverless environment, we can't read from filesystem
  // Return empty array or implement database storage
  return NextResponse.json({
    success: true,
    message: "Form responses are logged to Netlify function logs and Google Sheets (if configured)",
    count: 0,
    responses: [],
  });
}
