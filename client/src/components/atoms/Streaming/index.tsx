import { useMediaStream } from '@/hooks/useMediaStream';
import { sendStreamData } from '@/services/stream';

function Streaming() {
  const { videoRef, startStream, stopStream, toggleCamera } = useMediaStream();

  const handleStreamUpload = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaRecorder = new MediaRecorder(
        videoRef.current.srcObject as MediaStream,
        {
          mimeType: 'video/webm',
        }
      );

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          await sendStreamData(event.data);
        }
      };

      mediaRecorder.start(1000); // 1초마다 스트림 데이터 전송
    }
  };

  return (
    <div>
      <h1>Live Stream Camera</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', maxHeight: '400px' }}
      />
      <div>
        <button onClick={startStream}>Start Camera</button>
        <button onClick={stopStream}>Stop Camera</button>
        <button onClick={toggleCamera}>Toggle Camera</button>
        <button onClick={handleStreamUpload}>Start Upload</button>
      </div>
    </div>
  );
}

export default Streaming;
