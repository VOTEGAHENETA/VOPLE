export interface ChatReceiveMessage {
  userId: number;
  nickname: string;
  text: string;
  color: string;
  createdTime: string;
  type?: 'CHAT' | 'ENTER'; // 입장 메시지 판별 위한 타입
}

export interface NicknameResponse {
  nickname: string;
}

export interface ChatSendMessage {
  text: string;
}

export interface ChatResponse {
  httpStatus: number;
  message: string;
  data: ChatReceiveMessage[];
}

export type RoomType = 'session' | 'team';
