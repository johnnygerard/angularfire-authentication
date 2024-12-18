export const USER_MESSAGE = {
  LOGIN_SUCCESS: "Welcome back! You are now signed in.",
  LOGOUT_SUCCESS: "You’ve successfully signed out. Have a nice day!",
  REGISTRATION_SUCCESS: "Your account has been created. Welcome aboard!",
} as const;

export type UserMessage = (typeof USER_MESSAGE)[keyof typeof USER_MESSAGE];
