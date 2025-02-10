import { http, HttpResponse } from 'msw';
import { mockElectionList } from './data/electionList';

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

  http.post('/api/vote/:sessionId/castvote', async ({ params, request }) => {
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
];
