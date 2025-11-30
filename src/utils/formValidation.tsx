// Form validation utilities
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// Disposable email domains to block
export const disposableEmailDomains = [
  "10minutemail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "mailinator.com",
  "throwaway.email",
  "tempmail.net",
  "yopmail.com",
  "7mail.ga",
  "sharklasers.com",
  "tempmailo.com",
];

// Spam words/patterns to detect
export const spamPatterns = [
  /^test$/i,
  /^asdf$/i,
  /^qwerty$/i,
  /^admin$/i,
  /^user$/i,
  /^example$/i,
  /^sample$/i,
  /^\d+$/,
  /^.{1,2}$/,
];

export const validateEmail = (
  email: string
): { isValid: boolean; error?: string } => {
  if (!email) return { isValid: false, error: "Email is required" };

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (disposableEmailDomains.includes(domain)) {
    return { isValid: false, error: "Please use a business email address" };
  }

  return { isValid: true };
};

export const validatePhone = (
  phone: string
): { isValid: boolean; error?: string; formatted?: string } => {
  if (!phone) return { isValid: true }; // Optional field

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  if (!phoneRegex.test(cleaned)) {
    return {
      isValid: false,
      error: "Please enter a valid phone number with country code",
    };
  }

  // Format the phone number
  const formatted = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;

  return { isValid: true, formatted };
};

// Format phone number for display
export const formatPhone = (phone: string): string => {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
};

export const validateCompanyName = (
  name: string
): { isValid: boolean; error?: string } => {
  if (!name) return { isValid: false, error: "Company name is required" };

  if (name.length < 2) {
    return {
      isValid: false,
      error: "Company name must be at least 2 characters",
    };
  }

  // Check against spam patterns
  for (const pattern of spamPatterns) {
    if (pattern.test(name)) {
      return { isValid: false, error: "Please enter a valid company name" };
    }
  }

  return { isValid: true };
};

export const validateMessage = (
  message: string,
  minLength = 10
): { isValid: boolean; error?: string } => {
  if (!message) return { isValid: false, error: "Message is required" };

  if (message.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters`,
    };
  }

  return { isValid: true };
};

// Honeypot field component (hidden from users, filled by bots)
export const HoneypotField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <input
    type="text"
    name="website"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      position: "absolute",
      left: "-9999px",
      width: "1px",
      height: "1px",
      opacity: 0,
      pointerEvents: "none",
    }}
    tabIndex={-1}
    autoComplete="off"
  />
);

// Attribution options
export const attributionOptions = [
  "Google Search",
  "Social Media",
  "Referral from Partner",
  "Industry Event/Trade Show",
  "LinkedIn",
  "Existing Customer",
  "Sales Representative",
  "Website/Organic",
  "Email Campaign",
  "Other",
];

// Analytics tracking
export const trackFormEvent = (
  formType: string,
  action: string,
  category?: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: "Form",
      event_label: formType,
      custom_parameter_1: category,
    });
  }

  // Also log for debugging
  console.log(`Form Event: ${formType} - ${action}`, { category });
};
