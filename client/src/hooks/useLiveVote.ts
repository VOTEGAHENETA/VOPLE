import { VoteResultsResponse } from '@/types/voteSession';
import { useEffect, useState, useRef } from 'react';
import Stomp, { Client } from 'stompjs';
import SockJS from 'sockjs-client';

interface Props {
  sessionId: number;
}

const useLiveVote = ({ sessionId }: Props) => {
  const [liveVote, setLiveVote] = useState<VoteResultsResponse[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stompClient = useRef<Client | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (stompClient.current?.connected) {
      return;
    }
    const socket = new SockJS('/ws');
    stompClient.current = Stomp.over(socket);
    stompClient.current?.connect(
      { sessionId },
      (frame) => {
        console.log('Connected:', frame);
        setConnected(true);
        setError(null);

        stompClient.current?.subscribe(`/api/vote/${sessionId}`, (message) => {
          try {
            const realTimeVote: VoteResultsResponse = JSON.parse(message.body);
            setLiveVote((prev) => [...prev, realTimeVote]);
            console.log('새로운 투표 데이터:', realTimeVote);
          } catch (parseError) {
            console.error('투표 파싱 에러:', parseError);
          }
        });
      },
      (connectError) => {
        console.error('STOMP 에러:', connectError);
        setError('저런; 안되네요;.');
        setConnected(false);
      }
    );

    return () => {
      isMounted.current = false;
      if (stompClient.current?.connected) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, [sessionId]);

  return {
    liveVote,
    connected,
    error,
    setLiveVote,
  };
};

export default useLiveVote;
