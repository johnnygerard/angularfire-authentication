export type Notification = {
  id: number;
  message: string;
  timeout: number;
  type: "success" | "error";
};
