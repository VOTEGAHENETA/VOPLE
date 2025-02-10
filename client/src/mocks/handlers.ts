import { http, HttpResponse } from 'msw';
import dummyQR from '@/assets/icons/dummyQR.svg';
import { electionDetailEditMock } from './data/electionDetailEdit';

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
];
