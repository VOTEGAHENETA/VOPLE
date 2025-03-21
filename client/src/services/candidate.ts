import {
  VoteTeamInfoResponse,
  VoteTeamInfoRequest,
  LiveTeamInfoResponse,
} from '@/types/user';
import instance from './api';

export const getCandidateInfo = async (
  sessionId: number
): Promise<VoteTeamInfoResponse> => {
  return await instance.get(`/candidate/${sessionId}`);
};

export interface UpdateCandidateParams {
  sessionId: number;
  voteTeamInfoRequest: VoteTeamInfoRequest;
  file?: File | null;
}

export const updateCandidateInfo = async ({
  sessionId,
  voteTeamInfoRequest,
  file,
}: UpdateCandidateParams) => {
  try {
    const formData = new FormData();

    formData.append(
      'voteTeamInfoRequest',
      new Blob([JSON.stringify(voteTeamInfoRequest)], {
        type: 'application/json',
      })
    );

    if (file) {
      formData.append('file', file);
    }

    await instance.post(`/candidate/${sessionId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('후보자 정보 업데이트 에러:', error);
    throw error;
  }
};

export const getVoteTeamInfo = async (
  teamId: number
): Promise<LiveTeamInfoResponse> => {
  return await instance.get(`candidate/${teamId}/detail`);
};
