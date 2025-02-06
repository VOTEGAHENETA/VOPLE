import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import { ChatReceiveMessage } from '@/types/chat';

type WebSocketProps = {
  type: string;
  roomId: string;
  sessionId: string;
  userId: number;
};

export const useWebSocket = ({
  type,
  roomId,
  sessionId,
  userId,
}: WebSocketProps) => {
  const [messages, setMessages] = useState<ChatReceiveMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stompClient = useRef<Client | null>(null);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (stompClient.current?.connected) {
      return;
    }
    // SockJS를 사용하여 WebSocket 연결 생성
    const socket = new SockJS('/ws');
    stompClient.current = Stomp.over(socket);

    // 서버에 연결
    stompClient.current.connect(
      {
        sessionId: sessionId,
        roomId: roomId,
      },
      (frame) => {
        console.log('Connected:', frame);
        setConnected(true);
        setError(null);

        // 해당 채팅방의 메시지를 구독
        stompClient.current?.subscribe(
          `/api/room/${type}/${roomId}`,
          (message) => {
            try {
              // 받은 메시지를 JSON 형태로 파싱
              const receivedMessage: ChatReceiveMessage = JSON.parse(
                message.body
              );
              // 받은 메시지를 상태에 추가
              setMessages((prev) => {
                const newMessages = [...prev, receivedMessage];
                console.log('newMessages : ', newMessages);
                return newMessages;
              });
            } catch (error) {
              console.error('메시지 파싱 에러:', error);
            }
          }
        );
      },
      (error) => {
        console.error('STOMP 에러:', error);
        setError('연결에 실패했습니다.');
        setConnected(false);
      }
    );

    return () => {
      // 컴포넌트 언마운트 시 isMounted를 false로 설정
      isMounted.current = false;
      // 연결이 되어 있다면 연결 해제
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, [sessionId, roomId, userId, type]);

  // 메시지 전송 함수
  const sendMessage = (text: string) => {
    // 메시지가 비어있지 않고 연결되어 있다면 메시지 전송
    if (text.trim() && stompClient.current?.connected) {
      stompClient.current.send(
        `/api/send/${type}/${roomId}`,
        {},
        JSON.stringify({
          type: 'CHAT',
          roomId,
          sessionId,
          userId,
          text,
        })
      );
    }
  };

  return {
    messages,
    connected,
    error,
    sendMessage,
    setMessages,
    setError,
  };
};
