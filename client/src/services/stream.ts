import instance from './api';

interface IStream {
  streamId: number;
  streamingUrl: string;
  isStreaming: boolean;
}

export const sendStreamData = async (
  streamId: number,
  isStreaming: boolean
) => {
  return await instance.put(
    `/live/${streamId}/status?isStreaming=${isStreaming}`
  );
};

export const getStreamData = async (streamId: number): Promise<IStream> => {
  return await instance.get(`/live/${streamId}`);
};

export const getIsMine = async (streamId: number): Promise<boolean> => {
  return await instance.get(`/live/${streamId}/status`);
};
