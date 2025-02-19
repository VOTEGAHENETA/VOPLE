import { IStream } from '@/types/api';
import instance from './api';

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

export interface IsCandidate {
  isCandidate: boolean;
}

export const getIsMine = async (teamId: number): Promise<IsCandidate> => {
  try {
    return await instance.get(`/live/${teamId}/status`);
  } catch (error) {
    console.log('API Error:', error);
    throw new Error('후보자 정보를 가져오는데 실패했습니다.');
  }
};
