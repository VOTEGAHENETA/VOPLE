import {
  ElectionSection,
  ISessionDetail,
  ElectionList,
  QuestionResponse,
} from '@/types/election';
import {
  CandidateSessionData,
  ElectionResponse,
  VoteResultsResponse,
} from '@/types/voteSession';
import { TCreateElection } from '@/types/election';
import instance from './api';
import { VoteRequest } from '@/types/vote';
import { ElectionResult } from '@/types/final';

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

export const deleteElection = async (sessionId: number) => {
  return await instance.delete(`/election/${sessionId}`);
};

export const putElection = async (sessionId: number, data: TCreateElection) => {
  return await instance.put(`/election/${sessionId}`, data);
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
  sessionId: number,
  query: string
): Promise<ElectionResponse> => {
  const url = query
    ? `/election/${sessionId}?${query}`
    : `/election/${sessionId}`;
  return await instance.get(url);
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

export const getFinalResult = async (
  sessionId: number
): Promise<ElectionResult> => {
  return await instance.get(`/vote/${sessionId}/result/final`);
};
export const getQuestion = async (sessionId: number): Promise<string> => {
  return await instance.get(`/election/${sessionId}/question`);
};

export const postQuestion = async (
  sessionId: number,
  answer: string
): Promise<QuestionResponse> => {
  return await instance.post(`/election/${sessionId}/question`, {
    answer: answer,
  });
};

export const getUserRole = async (sessionId: number): Promise<string> => {
  try {
    return await instance.get(`/election/${sessionId}/status`);
  } catch (error) {
    console.error(error);
    throw new Error('사용자 역할 조회 실패');
  }
};

export const getIsVoter = async (sessionId: number): Promise<string> => {
  return await instance.get(`/election/${sessionId}/status`);
};
