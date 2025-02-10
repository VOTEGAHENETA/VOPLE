import instance from './api';

export const sendStreamData = async (
  streamId: number,
  isStreaming: boolean
) => {
  return await instance.patch(`/live/${streamId}/status`, {
    isStreaming: isStreaming,
  });
};

export const getStreamData = async (streamId: number) => {
  return await instance.get(`/live/${streamId}`);
};
