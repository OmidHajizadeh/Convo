export type PushMessage = {
  title: string;
  body: string;
  tag: "system-notification" | "new-message";
  image?: string;
  url: string;
};
