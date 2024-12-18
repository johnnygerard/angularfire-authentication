export const USER_MESSAGE = {
  EMAIL_EXISTS:
    "This email address is already in use. Please sign in or use a different email address.",
  LOGIN_SUCCESS: "Welcome back! You are now signed in.",
  LOGOUT_SUCCESS: "You’ve successfully signed out. Have a nice day!",
  REGISTRATION_SUCCESS: "Your account has been created. Welcome aboard!",
  UNKNOWN_ERROR: "An unknown error has occurred. Please try again later.",
} as const;

export type UserMessage = (typeof USER_MESSAGE)[keyof typeof USER_MESSAGE];
