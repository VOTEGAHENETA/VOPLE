import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useStreamData } from '@/services/hooks/live';

interface Props {
  streamId: number;
}

function StreamReceiver({ streamId }: Props) {
  const hlsPlayerRef = useRef<HTMLVideoElement | null>(null);
  const { data: streamData } = useStreamData(streamId);
  const streamKey = streamData?.streamingUrl?.split('/').pop() || null;

  useEffect(() => {
    if (!streamKey || !hlsPlayerRef.current) return;

    const hls = new Hls();
    hls.loadSource(`http://i12b102.p.ssafy.io:8050/hls/${streamKey}.m3u8`);
    hls.attachMedia(hlsPlayerRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      hlsPlayerRef.current
        ?.play()
        .catch((err) => console.error('📡 HLS 재생 오류:', err));
    });

    return () => {
      hls.destroy();
    };
  }, [streamKey]);

  return (
    <div>
      <h2>라이브 스트리밍 수신자</h2>
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
