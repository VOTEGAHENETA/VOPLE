import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendChatMessage } from '@/services/chat';
import { SendMessageParams } from '@/services/chat';

export const useSendChatMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SendMessageParams) => sendChatMessage(params),
    onSuccess: (_, variables) => {
      // 메시지 전송 성공 시 채팅 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['chatMessages', variables.type, variables.roomId],
      });
    },
    onError: (error) => {
      console.error('메시지 전송 실패:', error);
    },
  });
};
