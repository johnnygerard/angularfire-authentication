export type AppNotification = {
  id: number;
  message: string;
  timeout: number;
  type: "success" | "error";
};
