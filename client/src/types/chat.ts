export interface ChatReceiveMessage {
  userId: number;
  nickname: string;
  text: string;
  color: string;
  createdTime: string;
}

export interface ChatSendMessage {
  userId: number;
  text: string;
}
