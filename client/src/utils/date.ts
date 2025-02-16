export function combineDateAndTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export const getFormattedDate = (now: Date = new Date()) => {
  return now.toISOString().split('T')[0];
};

export const getFormattedTime = (now: Date = new Date()) => {
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};
