import { useQuery } from '@tanstack/react-query';
import { fetchInitialChats } from '../chat';

export const useChatMessages = (type: string, roomId: number) => {
  return useQuery({
    queryKey: ['chats', type, roomId],
    queryFn: () => fetchInitialChats(type, roomId),
    enabled: !!type && !!roomId,
  });
};
