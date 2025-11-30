import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const RESPONSES_FILE = path.join(process.cwd(), "data", "form-responses.json");

// Check if user is authenticated
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  return !!token?.value?.startsWith("admin_");
}

// Read responses from file
function readResponses() {
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

export async function GET(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const responses = readResponses();

    // Get query params for filtering
    const { searchParams } = new URL(request.url);
    const formType = searchParams.get("formType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let filteredResponses = responses;

    // Filter by form type
    if (formType && formType !== "all") {
      filteredResponses = filteredResponses.filter(
        (r: { formType: string }) => r.formType === formType
      );
    }

    // Filter by date range
    if (startDate) {
      filteredResponses = filteredResponses.filter(
        (r: { timestamp: string }) =>
          new Date(r.timestamp) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredResponses = filteredResponses.filter(
        (r: { timestamp: string }) => new Date(r.timestamp) <= new Date(endDate)
      );
    }

    // Sort by timestamp (newest first)
    filteredResponses.sort(
      (a: { timestamp: string }, b: { timestamp: string }) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Get unique form types for filter dropdown
    const formTypes = [
      ...new Set(responses.map((r: { formType: string }) => r.formType)),
    ];

    return NextResponse.json({
      success: true,
      count: filteredResponses.length,
      totalCount: responses.length,
      formTypes,
      responses: filteredResponses,
    });
  } catch (error) {
    console.error("Error reading responses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read responses" },
      { status: 500 }
    );
  }
}

// Delete a response
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const responses = readResponses();
    const filteredResponses = responses.filter(
      (r: { id: string }) => r.id !== id
    );

    if (responses.length === filteredResponses.length) {
      return NextResponse.json(
        { success: false, error: "Response not found" },
        { status: 404 }
      );
    }

    fs.writeFileSync(
      RESPONSES_FILE,
      JSON.stringify(filteredResponses, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      success: true,
      message: "Response deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting response:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete response" },
      { status: 500 }
    );
  }
}
