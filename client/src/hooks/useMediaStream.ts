import { useRef, useState } from 'react';

type FacingMode = 'user' | 'environment';

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
      console.error('Camera access error:', err);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleCamera = () => {
    stopStream();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return {
    videoRef,
    startStream,
    stopStream,
    toggleCamera,
  };
};
