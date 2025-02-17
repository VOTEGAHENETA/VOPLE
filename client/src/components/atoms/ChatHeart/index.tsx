import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import HeartImg from '@/assets/icons/heart.svg';

interface AnimatedHeart {
  id: number;
  x: number; // 좌우 이동을 위한 x 좌표
}

export default function ChatHeart() {
  const heartCount = useRef(0);
  const [hearts, setHearts] = useState<AnimatedHeart[]>([]);

  const handleHeartClick = () => {
    const newHeartId = heartCount.current++; // 추후 websoket 구현 시 날릴 heartId
    const randomX = Math.random() * 40 - 20;
    setHearts((prev) => [...prev, { id: newHeartId, x: randomX }]);

    console.log('newHeartId : ', newHeartId);

    // WebSocket을 통해 하트 이벤트 전송 - 추후 구현 예정
    // if (stompClient?.connected) {
    //   stompClient.send(
    //     `/api/send/${type}/${type === 'session' ? sessionId : voteTeamId}`,
    //     {},
    //     JSON.stringify({
    //       type: 'HEART',
    //       roomId: type === 'session' ? sessionId : voteTeamId,
    //       sessionId,
    //       userId,
    //       heartId: newHeartId,
    //     })
    //   );
    // }
  };

  // 애니메이션이 끝난 하트 제거
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 1000); // 애니메이션 지속 시간과 동일하게 설정

      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div className={styles.heartContainer}>
      <IconButton
        name='heart'
        onClick={handleHeartClick}
        className={styles.heartButton}
      />
      {/* 애니메이션되는 하트들 */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={styles.floatingHeart}
          style={{ '--heart-x': `${heart.x}px` } as React.CSSProperties}
        >
          <img src={HeartImg} alt='하트 아이콘' />
        </div>
      ))}
    </div>
  );
}
