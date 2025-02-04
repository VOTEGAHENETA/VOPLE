export interface Candidate {
  userId: number;
}

export interface Team {
  pollPercent: number;
  poster: string;
  perfix: string;
  candidateStatement: string;
  candidates: Candidate[];
}

export interface Vote {
  voteName: string;
  teams: Team[];
}

export interface ElectionContents {
  hostId: number;
  sessionName: string;
  voteStartTime: string;
  voteEndTime: string;
  voteRemainTime: string;
  votes: Vote;
}

export interface ElectionListProps {
  id: number;
  title: string;
  startDate?: string;
  endDate?: string;
  status?: 'participating' | 'created';
  isClosed?: boolean;
  onMenuClick?: () => void;
}

export interface ChatMessage {
  type: 'CHAT_MESSAGE'; // 메시지 타입 구분
  payload: {
    message: string; // 실제 입력한 메시지
    roomId: string; // 채팅방 ID
    timestamp: number; // 메시지 전송 시간
  };
}
