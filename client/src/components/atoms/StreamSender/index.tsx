import { useMediaStream } from '@/hooks/useMediaStream';
import { useStreamControl, useStreamData } from '@/services/hooks/live';
import { useState } from 'react';
import styles from './index.module.scss';

interface Props {
  streamId: number;
}

function StreamSender({ streamId }: Props) {
  const { data: streamData } = useStreamData(streamId);
  const { mutate: updateStreamStatus } = useStreamControl();
  const { videoRef, startStream, stopStream } = useMediaStream({
    streamKey: streamData?.streamId,
  });
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  function handleStart() {
    updateStreamStatus(
      { streamId, isStreaming: true },
      {
        onSuccess: () => {
          setIsStreaming(true);
          startStream();
        },
      }
    );
  }

  function handleStop() {
    updateStreamStatus(
      { streamId, isStreaming: false },
      {
        onSuccess: () => {
          setIsStreaming(false);
          stopStream();
        },
      }
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>라이브 스트리밍 송신자</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxHeight: '300px' }}
      />
      <div>
        <button onClick={handleStart} disabled={isStreaming}>
          방송 시작
        </button>
        <button onClick={handleStop} disabled={!isStreaming}>
          방송 종료
        </button>
      </div>
    </div>
  );
}

export default StreamSender;
