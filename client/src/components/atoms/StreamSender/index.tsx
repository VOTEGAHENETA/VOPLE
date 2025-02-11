import { useMediaStream } from '@/hooks/useMediaStream';

function StreamSender() {
  const { videoRef, startStream, stopStream, toggleCamera } = useMediaStream();

  return (
    <div>
      <h1>라이브 스트리밍 송신자</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxHeight: '300px' }}
      />
      <div>
        <button onClick={startStream}>방송 시작</button>
        <button onClick={stopStream}>방송 종료</button>
        <button onClick={toggleCamera}>카메라 전환</button>
      </div>
    </div>
  );
}

export default StreamSender;
