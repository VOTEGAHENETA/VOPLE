import axios from 'axios';
import { ChatResponse } from '@/types/chat';

export const fetchInitialChats = async (
  type: string,
  roomId: number
): Promise<ChatResponse> => {
  const response = await axios.get(`/api/room/${type}/${roomId}`);
  return response.data;
};
