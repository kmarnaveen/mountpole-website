/**
 * Google Apps Script for handling contact form submissions
 *
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Update the SPREADSHEET_ID with your actual spreadsheet ID
 * 5. Deploy as web app with execute permissions for "Anyone"
 * 6. Copy the web app URL and update it in the MobileDock.tsx file
 */

// Configuration
const SPREADSHEET_ID = "1TaQdlFVywMx-ErwACd1CwHEnAHjQav73rXbhi_pAbzE";
const EMAIL_RECIPIENT = "kmarnaveen97@gmail.com";
const SHEET_NAME = "Lead Queries"; // You can change this sheet name

/**
 * Main function to handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Add CORS headers for all responses
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);

    // Log the submission to Google Sheets
    logToSheet(data);

    // Send email notification
    sendEmailNotification(data);

    // Return success response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Form submitted successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log error and return error response
    console.error("Error processing form submission:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error processing submission: " + error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
}

/**
 * Function to log form data to Google Sheets
 */
function logToSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Get or create the sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet
        .getRange(1, 1, 1, 6)
        .setValues([
          ["Timestamp", "Name", "Email", "Phone", "Query", "Status"],
        ]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }

    // Prepare the row data
    const rowData = [
      new Date(data.timestamp),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.query || "",
      "New",
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 6);
  } catch (error) {
    console.error("Error logging to sheet:", error);
    throw error;
  }
}

/**
 * Function to send email notification
 */
function sendEmailNotification(data) {
  try {
    const subject = `New Query from Mountpole Website - ${data.name}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #06B6D4); padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">New Query from Mountpole Website</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
          <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
          
          <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
              data.email
            }" style="color: #3B82F6;">${data.email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${
              data.phone || "Not provided"
            }</p>
            <p style="margin: 8px 0;"><strong>Submitted:</strong> ${new Date(
              data.timestamp
            ).toLocaleString()}</p>
          </div>
          
          <h3 style="color: #333;">Query:</h3>
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3B82F6;">
            <p style="margin: 0; line-height: 1.5;">${data.query}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #1565c0;">
              <strong>Action Required:</strong> Please respond to this query within 24 hours for the best customer experience.
            </p>
          </div>
        </div>
      </div>
    `;

    const plainBody = `
New Query from Mountpole Website

Contact Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Submitted: ${new Date(data.timestamp).toLocaleString()}

Query:
${data.query}

Please respond to this query within 24 hours.
    `;

    // Send the email
    GmailApp.sendEmail(EMAIL_RECIPIENT, subject, plainBody, {
      htmlBody: htmlBody,
      replyTo: data.email,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

/**
 * Function to handle GET requests (for testing)
 */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "Google Apps Script is running",
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the setup
 */
function testScript() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+1234567890",
    query: "This is a test query to verify the script is working correctly.",
    timestamp: new Date().toISOString(),
  };

  try {
    logToSheet(testData);
    sendEmailNotification(testData);
    console.log("Test completed successfully!");
    return "Test completed successfully!";
  } catch (error) {
    console.error("Test failed:", error);
    return "Test failed: " + error.toString();
  }
}
