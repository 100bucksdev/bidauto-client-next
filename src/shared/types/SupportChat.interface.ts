export interface SupportChatMessage {
  message: string;
  timestamp: string;
  role: "ai" | "operator" | "user";
}
