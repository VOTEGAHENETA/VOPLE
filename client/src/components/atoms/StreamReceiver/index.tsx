import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useStreamData } from '@/services/hooks/live';

interface Props {
  streamId: number;
}

function StreamReceiver({ streamId }: Props) {
  const hlsPlayerRef = useRef<HTMLVideoElement | null>(null);
  const { data: streamData } = useStreamData(streamId);
  useEffect(() => {
    if (!streamData || !hlsPlayerRef.current) return;
    const hls = new Hls({ debug: true });
    hls.loadSource(streamData.streamingUrl);
    hls.attachMedia(hlsPlayerRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      hlsPlayerRef.current
        ?.play()
        .catch((err) => console.error('📡 HLS 재생 오류:', err));
    });
    hls.on(Hls.Events.ERROR, (_, data) => {
      console.error('HLS.js 오류 발생:', data);
    });

    return () => {
      hls.destroy();
    };
  }, [streamData]);

  return (
    <div>
      <video
        ref={hlsPlayerRef}
        controls
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxHeight: '300px' }}
      />
    </div>
  );
}

export default StreamReceiver;
