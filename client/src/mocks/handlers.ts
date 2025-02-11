import { http, HttpResponse } from 'msw';
import { mockElectionList } from './data/electionList';
import { mockChatMessages } from './data/chatMessages';
import { mockCandidateData } from './data/candidateData';
import { CandidateUpdateRequest } from '@/types/candidate';

const { VITE_PUBLIC_API_URL } = import.meta.env;
const isMocking = import.meta.env.MODE === 'development';
const baseURL = isMocking ? '/' : VITE_PUBLIC_API_URL;

export const handlers = [
  http.post('/election', async ({ request }) => {
    const requestData = await request.json();
    console.log('데이터:', requestData);
    return HttpResponse.json(
      {
        message: '선거 만들기 성공',
        createdData: requestData,
      },
      { status: 201 }
    );
  }),

  http.get('/election', async (request) => {
    console.log('test data', request);
    return HttpResponse.json(mockElectionList, { status: 200 });
  }),

  // 채팅 메세지 수신 핸들러
  http.get(`${baseURL}/room/:type/:roomId`, async ({ params }) => {
    const { type, roomId } = params;
    console.log('type / roomId : ' + type + '/' + roomId);

    return HttpResponse.json({
      httpStatus: 200,
      message: 'success',
      data: mockChatMessages,
    });
  }),

  // 후보자 정보 송수신 핸들러
  // GET 요청 처리
  http.get(`${baseURL}/candidate/:sessionId/:userId`, ({ params }) => {
    const { sessionId, userId } = params;
    console.log('msw candidateHandlers catched http.get');
    // sessionId와 userId 검증
    if (!sessionId || !userId) {
      return HttpResponse.json(
        {
          httpStatus: 400,
          message: 'Invalid session or user ID',
          data: null,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(mockCandidateData, { status: 200 });
  }),

  // POST 요청 처리
  http.post(`${baseURL}/candidate/:sessionId`, async ({ request, params }) => {
    try {
      const requestData = (await request.json()) as CandidateUpdateRequest;
      const { sessionId } = params;
      console.log('msw sessionId : ', sessionId);

      // 요청 데이터 구조 검증
      if (!requestData.user || !requestData.voteTeam || !requestData.pledges) {
        return HttpResponse.json(
          {
            httpStatus: 400,
            message: 'Invalid request data structure',
            data: null,
          },
          { status: 400 }
        );
      }

      // 성공 응답 - 기존 mockCandidateData 구조 유지
      return HttpResponse.json(
        {
          httpStatus: 200,
          message: 'Profile updated successfully',
          data: {
            user: {
              userId: requestData.user.userId,
              nickname: requestData.user.username,
              username: requestData.user.username,
            },
            voteTeam: {
              poster: requestData.voteTeam.poster,
              prefix: requestData.voteTeam.prefix,
              candidateStatement: requestData.voteTeam.candidateStatement,
            },
            pledges: requestData.pledges.map((pledge) => ({
              content: pledge.content,
            })),
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return HttpResponse.json(
        {
          httpStatus: 500,
          message: 'Failed to update profile',
          data: null,
        },
        { status: 500 }
      );
    }
  }),
];
