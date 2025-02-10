// hooks/queries/useChatMessages.ts
import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages, createEnterMessage } from '@/services/chat';
import { useWebSocket } from '@/hooks/useWebSocket';
import { ChatResponse } from '@/types/chat';

export const useChatMessages = (
  type: string,
  roomId: number,
  sessionId: number,
  userId: number
) => {
  // WebSocket 연결 및 실시간 메시지 관리
  console.log('2222222 - useChatMessages');
  const {
    messages: wsMessages,
    connected,
    error: wsError,
    sendMessage,
    setMessages,
    // setError,
  } = useWebSocket({
    type,
    roomId,
    sessionId,
    userId,
  });

  // 초기 메시지 로딩
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error: queryError,
  } = useQuery<ChatResponse>({
    queryKey: ['chatMessages', type, roomId],
    queryFn: () => fetchChatMessages(type, roomId),
    // WebSocket이 메시지 업데이트를 처리하므로 추가 refetch 방지
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  // 초기 메시지와 입장 메시지 설정
  if (isSuccess) {
    if (data.httpStatus === 200) {
      setMessages([...data.data.reverse(), createEnterMessage()]);
    } else if (data.httpStatus === 204) {
      setMessages([createEnterMessage()]);
    }
  }

  return {
    messages: wsMessages, // WebSocket의 실시간 메시지 사용
    isLoading,
    isError,
    error: queryError || wsError,
    connected,
    sendMessage,
  };
};
