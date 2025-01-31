import { useEffect, useState } from 'react';

/**
 *
 * @param {number} time : 포매팅할 시간
 * @returns HH:MM:SS 형식으로 포매팅
 */
function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 *
 * @param {Date} targetTime : 남은 시간
 * @returns 남은 시간은 현재 시간과 계산하여 '밀리초(ms)'를 '초(seconds)'로 반환
 */
function getLeftTime(targetTime: Date): number {
  const now = new Date();
  // Math.max를 이용해 값이 음수로 가지 않음
  return Math.max(Math.floor((targetTime.getTime() - now.getTime()) / 1000), 0);
}

/**
 *
 * @param {Date} targetTime : 남은 시간
 * @returns 1초마다 남은 시간을 표시
 */
function useTimer(targetTime: Date) {
  const [left, setLeft] = useState<string>(formatTime(getLeftTime(targetTime)));

  useEffect(() => {
    function updateTime() {
      const remaining = getLeftTime(targetTime);
      setLeft(formatTime(remaining));

      if (remaining <= 0) {
        clearInterval(timer);
      }
    }

    const timer = setInterval(updateTime, 1000); // 1000ms(1초) 마다 갱신

    return () => clearInterval(timer); // 컴포넌트가 언마운트(unmount)될 때 마다 정리
  }, [targetTime]);

  return left;
}

export default useTimer;
