import { convertUTCToKST } from '@/utils/date';
import { useEffect, useState } from 'react';

/**
 * @param {number} time : 포매팅할 시간(초)
 * @returns HH:MM:SS 형식의 문자열 반환
 */
function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * @param {Date} targetTime : 목표 시각
 * @returns 현재 시각과의 차이를 초단위로 반환(음수일 경우 0을 반환)
 */
function getLeftTime(targetTime: Date): number {
  const now = new Date();
  return Math.max(Math.floor((targetTime.getTime() - now.getTime()) / 1000), 0);
}

/**
 * @param {Date} targetTime : 타이머 종료 목표 시각
 * @returns targetTime까지 남은 시간을 HH:MM:SS 형식으로 반환하며,
 *          targetTime이 바뀌면 새로운 타이머를 생성합니다.
 */
function useTimer(targetTime: Date) {
  const [left, setLeft] = useState<number>(
    getLeftTime(convertUTCToKST(targetTime))
  );

  useEffect(() => {
    // deadline이 바뀌면 초기 남은 시간을 새로 계산합니다.
    setLeft(getLeftTime(targetTime));
    const timer = setInterval(() => {
      setLeft(getLeftTime(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return formatTime(left);
}

export default useTimer;
