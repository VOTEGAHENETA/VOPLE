import { http, HttpResponse } from 'msw';
import dummyQR from '@/assets/icons/dummyQR.svg';
import { electionDetailEditMock } from './data/electionDetailEdit';
import { mockElectionList } from './data/electionList';
import { mockChatMessages } from './data/chatMessages';

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

  http.get(`/election/${1}/qrcode`, async () => {
    return HttpResponse.json(
      {
        message: 'qr 가져오기 성공',
        data: dummyQR,
      },
      { status: 200 }
    );
  }),

  http.post(`/vote/12`, async () => {
    return HttpResponse.json(
      {
        message: '투표 등록 성공',
      },
      { status: 201 }
    );
  }),

  http.get('/election/1/edit', async () => {
    return HttpResponse.json(
      {
        message: '선거 정보 디테일 가져오기 성공',
        data: electionDetailEditMock,
      },
      { status: 200 }
    );
  }),

  http.get('/election', async (request) => {
    console.log('test data', request);
    return HttpResponse.json(mockElectionList, { status: 200 });
  }),

  http.post('/vote/:sessionId/castvote', async ({ params, request }) => {
    const { sessionId } = params;
    const requestData = await request.json();

    console.log(`세션 아이디: ${sessionId}`);
    console.log('요청 데이터:', requestData);

    return HttpResponse.json(
      {
        message: '투표 완료 제발',
        sessionId,
        receivedData: requestData,
      },
      { status: 200 }
    );
  }),

  // 채팅 메세지 수신 핸들러
  http.get('/api/room/:type/:roomId', async ({ params }) => {
    const { type, roomId } = params;
    console.log('type / roomId : ' + type + '/' + roomId);

    return HttpResponse.json({
      httpStatus: 200,
      message: 'success',
      data: mockChatMessages,
    });
  }),
];
