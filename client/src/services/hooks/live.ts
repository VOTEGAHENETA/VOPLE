import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getIsMine, getStreamData, sendStreamData } from '../stream';

export function useStreamData(streamId: number) {
  return useQuery({
    queryKey: ['stream', streamId],
    queryFn: () => getStreamData(streamId),
    select: (res) => {
      console.log('getStreamData:', res);
      return res;
    }, // 응답 데이터 정리
  });
}

export function useStreamControl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      streamId,
      isStreaming,
    }: {
      streamId: number;
      isStreaming: boolean;
    }) => sendStreamData(streamId, isStreaming),
    onSuccess: (_, { streamId }) => {
      queryClient.invalidateQueries({ queryKey: ['stream', streamId] });
    },
  });
}

export function useIsMine(streamId: number) {
  return useQuery({
    queryKey: ['mine', streamId],
    queryFn: async () => {
      const response = await getIsMine(streamId);
      console.log('## useIsMine response:', response);
      return response;
    },
  });
}
