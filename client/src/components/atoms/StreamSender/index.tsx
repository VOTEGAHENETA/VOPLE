import { useMediaStream } from '@/hooks/useMediaStream';
import { useStreamControl, useStreamData } from '@/services/hooks/live';
import { useState } from 'react';
import styles from './index.module.scss';
import IconButton from '../IconButton';

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
  console.log(isStreaming);

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
      <div className={styles.buttons}>
        <IconButton
          onClick={handleStart}
          className={styles.startButton}
          name='videoCall'
        />
        <IconButton
          onClick={handleStop}
          className={styles.stopButton}
          name='rectangle'
        />
        <IconButton
          onClick={handleStop}
          className={styles.microphone}
          name='microphone'
        />
      </div>
    </div>
  );
}

export default StreamSender;
