import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import { useNavigate } from 'react-router-dom';

interface StreamMobileBlockProps {
  sessionId: number;
}

function StreamMobileBlock({ sessionId }: StreamMobileBlockProps) {
  const navigate = useNavigate();

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const handleBack = useCallback(() => {
    navigate(`/elections/${sessionId}`);
  }, [navigate, sessionId]);

  useEffect(() => {
    const checkDevice = () => {
      // 모바일/태블릿 감지를 위한 정규식
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobileOrTablet(mobileRegex.test(navigator.userAgent));
    };

    checkDevice();

    // 화면 크기 변경 시 재확인
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  if (!isMobileOrTablet) {
    return null;
  }

  return (
    <div className={styles.mobileBlock}>
      <div className={styles.content}>
        <p className={styles.title}>알림</p>
        <p className={styles.detail1}>
          안녕하세요. 후보님 !<br />
          라이브 시작은 데스크톱 환경에서
          <br /> 이용해주세요.
        </p>
        <p className={styles.detail2}>
          이 기능은 모바일/태블릿 환경에서 지원되지 않습니다. <br />
          원활한 이용을 위해 데스크톱 환경에서 접속해주세요.
        </p>
        <BaseButton
          kind='base'
          type='button'
          status='outline'
          onClick={handleBack}
        >
          뒤로 가기
        </BaseButton>
      </div>
    </div>
  );
}

export default StreamMobileBlock;
