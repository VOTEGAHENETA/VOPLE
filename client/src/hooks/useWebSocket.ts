import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import { StompSubscription } from '@stomp/stompjs';
import { ChatReceiveMessage } from '@/types/chat';

type WebSocketProps = {
  type: string;
  roomId: number;
  sessionId: number;
};

export const useWebSocket = ({ type, roomId, sessionId }: WebSocketProps) => {
  const [messages, setMessages] = useState<ChatReceiveMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stompClient = useRef<Client | null>(null);
  const subscription = useRef<StompSubscription | null>(null); // 구독 추적용

  const isMounted = useRef(false);

  // messages 업데이트 시 유효성 검사 추가
  const updateMessages = (newMessage: ChatReceiveMessage) => {
    setMessages((prev) => [...(Array.isArray(prev) ? prev : []), newMessage]);
  };

  useEffect(() => {
    isMounted.current = true;

    // 이미 연결되어 있으면 리턴
    if (stompClient.current?.connected) return;

    const socket = new SockJS('https://i12b102.p.ssafy.io/ws', null, {});
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      { sessionId, roomId },
      (frame) => {
        if (!isMounted.current) return;

        console.log('Connected:', frame);
        setConnected(true);
        setError(null);

        // 기존 구독 해제
        if (subscription.current) {
          subscription.current.unsubscribe();
        }

        // 새로운 구독 설정
        const newSubscription = stompClient.current?.subscribe(
          `/api/room/${type}/${roomId}`,
          (message) => {
            if (!isMounted.current) return;

            try {
              const data = JSON.parse(message.body);
              console.log('Received message:', data); // 디버깅용

              if ('nickname' in data && Object.keys(data).length === 1) {
                updateMessages({
                  userId: 0,
                  nickname: 'System',
                  color: '#333',
                  text: `${data.nickname}님이 입장하셨습니다.`,
                  createdTime: new Date().toLocaleTimeString(),
                  type: 'ENTER',
                });
                return;
              }

              updateMessages(data);
            } catch (error) {
              console.error('메시지 파싱 에러:', error);
            }
          }
        );

        if (newSubscription) {
          subscription.current = newSubscription;
        }
      },
      (error) => {
        if (!isMounted.current) return;
        console.error('STOMP 에러:', error);
        setError('연결에 실패했습니다.');
        setConnected(false);
      }
    );

    return () => {
      isMounted.current = false;
      if (subscription.current) {
        subscription.current.unsubscribe();
        subscription.current = null;
      }
      if (stompClient.current?.connected) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected');
          stompClient.current = null;
        });
      }
    };
  }, [sessionId, roomId, type]);
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
