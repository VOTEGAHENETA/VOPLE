import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface Props {
  streamKey: string;
}

function StreamReceiver({ streamKey }: Props) {
  const hlsPlayerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (Hls.isSupported() && hlsPlayerRef.current) {
      const hls = new Hls();
      hls.loadSource(`http://i12b102.p.ssafy.io:8050/hls/${streamKey}.m3u8`);
      hls.attachMedia(hlsPlayerRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (hlsPlayerRef.current) {
          hlsPlayerRef.current.muted = true;
          hlsPlayerRef.current.play().catch((err) => {
            console.error('Auto-play blocked:', err);
          });
        }
      });
    }
  }, [streamKey]);

  return (
    <div>
      <h2>라이브 스트리밍 수신자</h2>
      <video
        ref={hlsPlayerRef}
        controls
        autoPlay
        playsInline
        muted // ✅ 자동 재생 허용
        style={{ width: '100%', maxHeight: '300px' }}
      />
    </div>
  );
}

export default StreamReceiver;
