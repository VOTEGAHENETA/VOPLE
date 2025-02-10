import { ElectionList, ElectionSection } from '@/types/election';
import { CandidateSessionData } from '@/types/voteSession';
import { TCreateElection } from '@/types/election';
import instance from './api';

/**
 *
 * @returns 선거 세션 데이터 (GET 요청)
 */

export const getElection = async (
  sessionId: number
): Promise<ElectionSection> => {
  return await instance.get(`/election/${sessionId}`);
};

// 투표 상세 페이지 데이터(GET 요청)
export const getVoteDetail = async (
  sessionId: number
): Promise<CandidateSessionData> => {
  return await instance.get(`/vote/${sessionId}/detail`);
};

export const postElection = async (createData: TCreateElection) => {
  const response = await instance.post('/election', createData);
  return response;
};

export const getElectionList = async (): Promise<ElectionList> => {
  return await instance.get(`/election`);
};
