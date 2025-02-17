export function combineDateAndTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export const getFormattedDate = (now: Date = new Date()) => {
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().split('T')[0];
};

export const getFormattedTime = (now: Date = new Date()) => {
  return now.toLocaleTimeString('ko-KR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function convertUTCToKST(utcString: Date) {
  const data = new Date(utcString);
  return new Date(data.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가
}
