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
];
