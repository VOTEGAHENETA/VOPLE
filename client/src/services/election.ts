import {
  ElectionSection,
  ISessionDetail,
  ElectionList,
} from '@/types/election';
import {
  CandidateSessionData,
  ElectionResponse,
  VoteResultsResponse,
} from '@/types/voteSession';
import { TCreateElection } from '@/types/election';
import instance from './api';
import { VoteRequest } from '@/types/vote';
import { TPostResponse } from '@/types/api';

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

export const getQRCode = async (sessionId: number): Promise<string> => {
  return await instance.get(`/election/${sessionId}/qrcode`);
};

export const getElectionDetail = async (
  sessionId: number
): Promise<ISessionDetail> => {
  return await instance.get(`/election/${sessionId}/edit`);
};

export const getElectionList = async (): Promise<ElectionList> => {
  return await instance.get(`/election`);
};

export const getElectionSession = async (
  sessionId: number
): Promise<ElectionResponse> => {
  return await instance.get(`/election/${sessionId}`);
};

// 투표하기 (POST 요청)
export const postVote = async ({
  sessionId,
  payload,
}: {
  sessionId: number;
  payload: VoteRequest;
}) => {
  const response = await instance.post(`/vote/${sessionId}/castvote`, payload);
  return response.data;
};

export const getResultCurrent = async (
  sessionId: number
): Promise<VoteResultsResponse> => {
  return await instance.get(`/vote/${sessionId}/result/current`);
};

export const getQuestion = async (sessionId: number): Promise<string> => {
  return await instance.get(`/election/${sessionId}/question`);
};

export const postQuestion = async (
  sessionId: number,
  answer: string
): Promise<TPostResponse> => {
  return await instance.post(`/election/${sessionId}/question`, {
    answer: answer,
  });
};
