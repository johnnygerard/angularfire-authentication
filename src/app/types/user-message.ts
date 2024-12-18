export const USER_MESSAGE = {
  EMAIL_EXISTS:
    "This email address is already in use. Please sign in or use a different email address.",
  EMAIL_VERIFICATION_FAILED:
    "An error occurred while sending the email verification. Please try again later.",
  INVALID_LOGIN_CREDENTIALS: "Invalid email or password. Please try again.",
  LOGIN_FAILED: "An error occurred while signing in. Please try again later.",
  LOGIN_SUCCESS: "Welcome back! You are now signed in.",
  LOGOUT_FAILED: "An error occurred while signing out. Please try again later.",
  LOGOUT_SUCCESS: "You’ve successfully signed out. Have a nice day!",
  REGISTRATION_FAILED:
    "An error occurred while creating your account. Please try again later.",
  REGISTRATION_SUCCESS: "Your account has been created. Welcome aboard!",
  UNKNOWN_ERROR: "An unknown error has occurred. Please try again later.",
} as const;

export type UserMessage = (typeof USER_MESSAGE)[keyof typeof USER_MESSAGE];
