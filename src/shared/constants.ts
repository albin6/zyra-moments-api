export const ROLES = {
  ADMIN: "admin",
  USER: "client",
  VENDOR: "vendor",
} as const;

export type TRole = "client" | "admin" | "vendor";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const SUCCESS_MESSAGES = {
  FUND_RELEASE_REQ_CREATED: "Fund release request created successfully",
  ATTENDANCE_RETRIEVED: "Attendance retrieved successfully",
  BOOKING_SUCCESS: "Booking completed.",
  CREATED: "Created successfully.",
  LOGIN_SUCCESS: "Login successful.",
  REGISTRATION_SUCCESS: "Registration completed successfully.",
  OTP_SEND_SUCCESS: "OTP sent successfully",
  LOGOUT_SUCCESS: "Logged out successfully.",
  UPDATE_SUCCESS: "Updated successfully.",
  CANCEL_SUCCESS: "Cancelled successfully.",
  DELETE_SUCCESS: "Deleted successfully.",
  OPERATION_SUCCESS: "Operation completed successfully.",
  PASSWORD_RESET_SUCCESS: "Password reset successfully.",
  VERIFICATION_SUCCESS: "Verification completed successfully.",
  DATA_RETRIEVED: "Data retrieved successfully.",
  ACTION_SUCCESS: "Action performed successfully.",
  SUBMIT_SUCCESS: "Submitted successfully."
};

export const ERROR_MESSAGES = {
  NO_TOKEN: "Authentication error: No token provided",
  PAYMENT_NOT_FOUND: 'Payment not found.',
  TICKET_NOT_FOUND: 'Ticket not found.',
  ALREADY_REVIEWED: "Client has already reviewed this vendor",
  FAILED_TO_RESET: "Failed to reset unread count",
  FAILED_TO_MARK_ATTENDANCE: "Failed to mark messages as read",
  CHAT_NOT_FOUND: "Chat room not found",
  LAT_LON_REQUIRED: "Longitude and latitude are required for nearby search",
  INVALID_ROLE: "Invalid user role",
  UNAUTH_NO_USER_FOUND: "Unauthorized: No user found in request",
  BOOKING_NOT_FOUND: "Booking not found",
  TICKET_ID_REQUIRED: "Ticket ID is required",
  INCOMPLETE_INFO: "Incomplete information.",
  NO_CHARGE_FOUND: "No charge found for this payment",
  CONFIRM_PAYMENT_FAILED: "Failed to confirm payment",
  FAILED_TO_PROCESS_REFUND: "Failed to process refund",
  WRONG_ID: "Wrong ID",
  ID_REQUIRED: "ID required",
  TOKEN_EXPIRED: "Token Expired",
  EMAIL_NOT_FOUND: "Email Not Found",
  FORBIDDEN:
    "Access denied. You do not have permission to access this resource.",
  BLOCKED: "Your account has been blocked.",
  NOT_ALLOWED: "You are not allowed",
  EMAIL_EXISTS: "Email Already Exists",
  REQUEST_NOT_FOUND: "Request Not Found",
  CATEGORY_EXISTS: "Category Already Exists",
  CATEGORY_NOT_FOUND: "Category Not Found",
  INVALID_TOKEN: "Authentication error: Invalid token",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  USER_NOT_FOUND: "User not found.",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  SERVER_ERROR: "An error occurred, please try again later.",
  VALIDATION_ERROR: "Validation error occurred.",
  MISSING_PARAMETERS: "Missing required parameters.",
  WRONG_CURRENT_PASSWORD: "Current password is wrong",
  SAME_CURR_NEW_PASSWORD: "Please enter a different password from current",
  INVALID_BOOKING_DATE: "The requested booking date is not available",
  INVALID_TIME_SLOT: "The requested time slot is not available",
  TIME_SLOT_FULL: "The requested time slot is already at full capacity",
  ROUTE_NOT_FOUND: "Route not found.",
  ID_NOT_PROVIDED: "ID not provided",
  NOT_ABLE_TO_MARK_ATTENDANCE:
    "You are not able to mark the attendance. Not the Host.",
};

export const VERIFICATION_MAIL_CONTENT = (otp: string) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #0a74da;">Welcome to Zyra Moments!</h2>
    <p>Dear user,</p>
    <p>Thank you for signing up with <strong>Zyra Moments</strong>. We’re excited to have you on board! To complete your registration, please verify your email address using the OTP code provided below:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="font-size: 24px; font-weight: bold; background-color: #f2f2f2; padding: 10px; border-radius: 5px;">${otp}</span>
    </div>
    <p>With Zyra Moments, you can explore, organize, and attend amazing events seamlessly.</p>
    <p>If you didn’t request this, please ignore this email or reach out to our support team.</p>
    <p>We can't wait to help you create and discover unforgettable moments!</p>
    <p>Best regards,<br/>The Zyra Moments Team</p>
    <hr style="border: none; border-top: 1px solid #ccc;" />
    <p style="font-size: 12px; color: #777;">This email was sent from an unmonitored account. Please do not reply to this email.</p>
  </div>
`;
