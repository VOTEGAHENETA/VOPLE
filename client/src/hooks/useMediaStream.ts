import { useEffect, useRef, useState } from 'react';

interface UseLiveStreamProps {
  streamKey: string;
}
type FacingMode = 'user' | 'environment'; // 카메라 전면(user), 후면(environment)

export const useMediaStream = ({ streamKey }: UseLiveStreamProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('user');

  useEffect(() => {
    if (!stream) return;

    const socket = new WebSocket(
      `ws://i12b102.p.ssafy.io:8000/stream?streamKey=${streamKey}`
    );

    socket.onopen = () => console.log('WebSocket 연결됨');
    socket.onerror = (err) => console.error(' WebSocket 오류', err);
    socket.onclose = () => console.log('WebSocket 종료');

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [stream, streamKey]);

  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true,
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      if (!ws) return;

      const recorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm; codecs=vp9',
      });

      recorder.ondataavailable = (event) => {
        console.log('녹화된 데이터 크기:', event.data.size);
        if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
          ws.send(event.data);
        }
      };

      recorder.start(1000); // 1초 단위로 데이터 전송
    } catch (err) {
      console.error('스트리밍 시작 오류:', err);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  const toggleCamera = async () => {
    stopStream();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    await startStream(); // 카메라 다시 연결
  };

  return {
    videoRef,
    startStream,
    stopStream,
    toggleCamera,
  };
};
