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

    // Normalize the data based on form type
    const normalizedData = normalizeFormData(data);

    // Log the submission to Google Sheets
    logToSheet(normalizedData);
    console.log("✅ Form data logged to Google Sheets successfully");

    // Send email notification
    sendEmailNotification(normalizedData);
    console.log("✅ Email notification sent successfully");

    // Log success summary
    console.log("✅ SUCCESS: Form submission completed", {
      formType: normalizedData.formType,
      email: normalizedData.email,
      timestamp: normalizedData.timestamp,
    });

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
 * Normalize form data from different form types
 */
function normalizeFormData(data) {
  const formType = data.formType || "Unknown Form";

  // Extract common fields with fallbacks for different form structures
  const normalized = {
    formType: formType,
    timestamp: data.timestamp || new Date().toISOString(),

    // Name fields
    name: data.name || data.fullName || data.contactPersonName || "",

    // Email fields
    email: data.email || data.workEmail || "",

    // Phone fields
    phone: data.phone || data.phoneNumber || "",

    // Company fields
    companyName: data.companyName || "",

    // Message/Query fields
    message: data.message || data.query || "",

    // Additional fields
    inquiryType: data.inquiryType || "",
    attribution: data.attribution || "",

    // Product details (for quote forms)
    productDetails: data.productDetails || {},

    // Category (for category-specific forms)
    category: data.category || "",

    // Partnership fields
    businessType: data.businessType || "",
    businessWebsite: data.businessWebsite || "",

    // Tracking data
    userAgent: data.userAgent || "",
    referrer: data.referrer || "",
  };

  return normalized;
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
      // Add headers for comprehensive tracking
      sheet
        .getRange(1, 1, 1, 12)
        .setValues([
          [
            "Timestamp",
            "Form Type",
            "Name",
            "Email",
            "Phone",
            "Company",
            "Message/Query",
            "Inquiry Type",
            "Category",
            "Product Details",
            "Status",
            "Source",
          ],
        ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold");
    }

    // Format product details for display
    let productDetailsText = "";
    if (data.productDetails && typeof data.productDetails === "object") {
      if (data.productDetails.items) {
        productDetailsText += `Items: ${data.productDetails.items}\n`;
      }
      if (data.productDetails.quantities) {
        productDetailsText += `Quantities: ${data.productDetails.quantities}\n`;
      }
      if (data.productDetails.specifications) {
        productDetailsText += `Specs: ${data.productDetails.specifications}`;
      }
    }

    // Prepare the row data
    const rowData = [
      new Date(data.timestamp),
      data.formType || "Unknown",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.companyName || "",
      data.message || "",
      data.inquiryType || "",
      data.category || "",
      productDetailsText || "",
      "New",
      data.referrer || "Direct",
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);
    console.log("📊 Row added to sheet:", SHEET_NAME);

    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 12);
    console.log("📏 Columns auto-resized for readability");
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
    const subject = `New ${data.formType} - ${data.name || "Anonymous"} ${
      data.companyName ? `from ${data.companyName}` : ""
    }`;

    // Build product details section for email
    let productDetailsHtml = "";
    if (data.productDetails && typeof data.productDetails === "object") {
      productDetailsHtml = `
        <h3 style="color: #333;">Product Requirements:</h3>
        <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
          ${
            data.productDetails.items
              ? `<p style="margin: 8px 0;"><strong>Items:</strong><br>${data.productDetails.items.replace(
                  /\n/g,
                  "<br>"
                )}</p>`
              : ""
          }
          ${
            data.productDetails.quantities
              ? `<p style="margin: 8px 0;"><strong>Quantities:</strong><br>${data.productDetails.quantities.replace(
                  /\n/g,
                  "<br>"
                )}</p>`
              : ""
          }
          ${
            data.productDetails.specifications
              ? `<p style="margin: 8px 0;"><strong>Specifications:</strong><br>${data.productDetails.specifications.replace(
                  /\n/g,
                  "<br>"
                )}</p>`
              : ""
          }
        </div>
      `;
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #06B6D4); padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">New ${
            data.formType
          }</h2>
          <p style="color: white; margin: 5px 0 0 0; text-align: center; opacity: 0.9;">${new Date(
            data.timestamp
          ).toLocaleString()}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
          <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
          
          <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            ${
              data.name
                ? `<p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>`
                : ""
            }
            ${
              data.companyName
                ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${data.companyName}</p>`
                : ""
            }
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
              data.email
            }" style="color: #3B82F6;">${data.email}</a></p>
            ${
              data.phone
                ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${data.phone}</p>`
                : ""
            }
            ${
              data.inquiryType
                ? `<p style="margin: 8px 0;"><strong>Inquiry Type:</strong> ${data.inquiryType}</p>`
                : ""
            }
            ${
              data.category
                ? `<p style="margin: 8px 0;"><strong>Category:</strong> ${data.category}</p>`
                : ""
            }
            ${
              data.attribution
                ? `<p style="margin: 8px 0;"><strong>How they found us:</strong> ${data.attribution}</p>`
                : ""
            }
          </div>
          
          ${productDetailsHtml}
          
          ${
            data.message
              ? `
          <h3 style="color: #333;">Message:</h3>
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3B82F6;">
            <p style="margin: 0; line-height: 1.5;">${data.message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          `
              : ""
          }
          
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #1565c0;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours for the best customer experience.
            </p>
          </div>
          
          ${
            data.referrer
              ? `
          <div style="margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 6px; font-size: 12px; color: #666;">
            <p style="margin: 0;"><strong>Source:</strong> ${data.referrer}</p>
          </div>
          `
              : ""
          }
        </div>
      </div>
    `;

    const plainBody = `
New ${data.formType}
Submitted: ${new Date(data.timestamp).toLocaleString()}

Contact Details:
${data.name ? `Name: ${data.name}` : ""}
${data.companyName ? `Company: ${data.companyName}` : ""}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
${data.inquiryType ? `Inquiry Type: ${data.inquiryType}` : ""}
${data.category ? `Category: ${data.category}` : ""}

${
  data.productDetails && data.productDetails.items
    ? `
Product Requirements:
Items: ${data.productDetails.items}
${
  data.productDetails.quantities
    ? `Quantities: ${data.productDetails.quantities}`
    : ""
}
${
  data.productDetails.specifications
    ? `Specifications: ${data.productDetails.specifications}`
    : ""
}
`
    : ""
}

${data.message ? `Message:\n${data.message}` : ""}

Please respond to this inquiry within 24 hours.
    `;

    // Send the email
    GmailApp.sendEmail(EMAIL_RECIPIENT, subject, plainBody, {
      htmlBody: htmlBody,
      replyTo: data.email,
    });
    console.log("📧 Email sent to:", EMAIL_RECIPIENT);
    console.log("📧 Subject:", subject);
  } catch (error) {
    console.error("❌ Error sending email:", error);
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
