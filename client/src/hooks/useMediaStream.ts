import { useRef, useState } from 'react';

type FacingMode = 'user' | 'environment'; // 카메라 전면(user), 후면(environment)

export const useMediaStream = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('user');

  const constraints = {
    audio: false,
    video: { facingMode },
  };

  const startStream = async () => {
    try {
      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('카메라 접근 에러:', err);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
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
