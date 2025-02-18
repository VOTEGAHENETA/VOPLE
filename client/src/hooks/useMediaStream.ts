import { useEffect, useRef, useState } from 'react';

interface Props {
  streamKey: number | undefined;
}

type FacingMode = 'user' | 'environment'; // 전면(user), 후면(environment)

export const useMediaStream = ({ streamKey }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('user');
  const [isMic, setIsMic] = useState<boolean>(true);
  const { VITE_PUBLIC_SOCKET_URL } = import.meta.env;

  useEffect(() => {
    if (!streamKey) {
      return;
    }

    wsConnection();

    return () => {
      ws.current?.close();
    };
  }, [streamKey]);

  function wsConnection() {
    ws.current = new WebSocket(
      `${VITE_PUBLIC_SOCKET_URL}/stream?streamKey=${streamKey}`
    );

    ws.current.onopen = () => console.log('WebSocket 연결됨');
    ws.current.onerror = (err) => console.error('WebSocket 오류', err);
    ws.current.onclose = () => {
      console.log('WebSocket 종료');
      ws.current = null;
      videoRef.current = null;
      streamRef.current = null;
    };
  }

  async function startStream() {
    try {
      wsConnection();
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true,
      });

      streamRef.current = mediaStream;

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
        return;
      }

      const recorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm; codecs=vp8,opus',
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0 && ws.current?.readyState === WebSocket.OPEN) {
          ws.current.send(event.data);
        }
      };

      recorder.start(1000); // 1초 단위로 데이터 전송
    } catch (err) {
      console.log(err);
    }
  }

  async function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    ws.current?.close();
    ws.current = null;
  }

  async function toggleCamera() {
    stopStream();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    await startStream();
  }

  function toggleMic() {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });

      setIsMic((prev) => !prev);
    }
  }

  return {
    videoRef,
    isMic,
    startStream,
    stopStream,
    toggleCamera,
    toggleMic,
  };
};
