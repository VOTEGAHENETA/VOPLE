// services/chat.ts
import { ChatReceiveMessage, ChatResponse, RoomType } from '@/types/chat';

export interface SendMessageParams {
  type: RoomType; // 'type'을 'roomType'으로 변경
  roomId: number;
  sessionId: number;
  userId: number;
  text: string;
}

// 초기 채팅 메시지 조회
export const fetchChatMessages = async (
  roomType: string,
  roomId: number
): Promise<ChatResponse> => {
  try {
    const response = await fetch(`/api/room/${roomType}/${roomId}`);
    if (!response.ok) {
      throw new Error('메세지를 불러오는 데 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('초기 채팅 로딩 에러:', error);
    throw error;
  }
};

// 시스템 입장 메시지 생성
export const createEnterMessage = (): ChatReceiveMessage => ({
  userId: 0,
  nickname: 'System',
  text: '[ 채팅방에 입장하셨습니다 ]',
  color: '#fff',
  createdTime: new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }),
});

// WebSocket을 통한 메시지 전송을 위한 데이터 포맷팅
export const formatChatMessage = ({
  roomId,
  sessionId,
  userId,
  text,
}: SendMessageParams) => {
  // 기존에 넘어오던 type 변수명이 websocket에서 사용하는 type 변수명과 겹침
  // type에 대한 정보가 필요한가하여 일단 배제처리
  // 문제시 'type'을 'roomType'으로 변경 필요, 서버 변수명도 변경 필요
  return JSON.stringify({
    type: 'CHAT',
    roomId,
    sessionId,
    userId,
    text,
  });
};

// HTTP를 통한 메시지 전송 (MSW 테스트용)
export const sendChatMessage = async (params: SendMessageParams) => {
  try {
    const response = await fetch(`/api/send/${params.type}/${params.roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formatChatMessage(params),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
