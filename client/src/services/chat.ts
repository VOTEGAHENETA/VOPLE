import axios from 'axios';
import { ChatResponse } from '@/types/chat';
const { VITE_PUBLIC_API_URL } = import.meta.env;

export const fetchInitialChats = async (
  type: string,
  roomId: number
): Promise<ChatResponse> => {
  const response = await axios.get(
    `${VITE_PUBLIC_API_URL}/room/${type}/${roomId}`
  );
  return response.data;
};
