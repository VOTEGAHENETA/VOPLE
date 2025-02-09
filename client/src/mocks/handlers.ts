import { http, HttpResponse } from 'msw';
import { mockChatMessages } from './mockDatas';

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
