// src/api/chatApi.ts
export const fetchInitialChats = async (type: string, roomId: number) => {
  const response = await fetch(`/api/room/${type}/${roomId}`);
  const data = await response.json();
  return data;
};
