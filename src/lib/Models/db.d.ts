interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}
interface Session {
  user: User;
  expires: string;
}

interface Message {
  id: string;
  senderId: string;
  recieverId: string;
  text: string;
  timestamp: number;
  status: "error" | "pending" | "seen" | "unseen" | "success";
}

interface Chat {
  id: string;
  messages: Message[];
}

interface FriendRequest {
  id: string;
  senderId: string;
  recieverId: string;
}
