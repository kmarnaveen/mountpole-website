import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the path to the responses JSON file
const RESPONSES_FILE = path.join(process.cwd(), "data", "form-responses.json");

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(RESPONSES_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read existing responses
function readResponses(): FormResponse[] {
  ensureDataDirectory();
  if (!fs.existsSync(RESPONSES_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(RESPONSES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write responses to file
function writeResponses(responses: FormResponse[]) {
  ensureDataDirectory();
  fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2), "utf-8");
}

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

    // Read existing responses and add new one
    const responses = readResponses();
    responses.push(response);
    writeResponses(responses);

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
  try {
    const responses = readResponses();
    return NextResponse.json({
      success: true,
      count: responses.length,
      responses,
    });
  } catch (error) {
    console.error("Error reading form responses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read form responses" },
      { status: 500 }
    );
  }
}
