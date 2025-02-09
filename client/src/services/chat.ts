import { ChatSendMessage } from '@/types/chat';
import instance from './api';

/**
 * 채팅 메시지 조회
 */
export const getChatMessages = async (
  type: string,
  roomId: number
): Promise<ChatSendMessage> => {
  return await instance.get(`/api/room/${type}/${roomId}`);
};

/**
 * 채팅 메시지 전송
 */
export const sendChatMessage = async (
  type: string,
  roomId: number,
  message: {
    type: 'CHAT';
    roomId: number;
    sessionId: number;
    userId: number;
    text: string;
  }
) => {
  return await instance.post(`/api/send/${type}/${roomId}`, message);
};
