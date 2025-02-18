import { useMediaStream } from '@/hooks/useMediaStream';
import { useStreamControl, useStreamData } from '@/services/hooks/live';
import { useState } from 'react';
import styles from './index.module.scss';
import IconButton from '../IconButton';
import BaseButton from '../BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';

interface Props {
  streamId: number;
}

function StreamSender({ streamId }: Props) {
  const { data: streamData } = useStreamData(streamId);
  const { mutate: updateStreamStatus } = useStreamControl();
  const { videoRef, isMic, startStream, stopStream, toggleCamera, toggleMic } =
    useMediaStream({
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
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%' }}
      />
      <div className={styles.buttons}>
        {streamData?.isStreaming ? (
          <div className={styles.stream_ing}>
            <IconButton
              onClick={() => toggleCamera()}
              className={styles.startButton}
              name='videoCall'
            />
            <IconButton
              onClick={handleStop}
              className={styles.stopButton}
              name='rectangle'
            />
            {isMic ? (
              <IconButton
                onClick={() => toggleMic()}
                className={styles.microphone}
                name='microphone'
              />
            ) : (
              <IconButton
                onClick={() => toggleMic()}
                className={styles.microphone}
                name='nonMicrophone'
              />
            )}
          </div>
        ) : (
          <div className={styles.stream_start}>
            <BaseButton
              type='button'
              kind='base'
              status={BASE_BUTTON_STATUS.FILL}
              onClick={handleStart}
            >
              방송하기
            </BaseButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default StreamSender;
