import { ChatReceiveMessage } from '@/types/chat';

export const mockChatMessages: ChatReceiveMessage[] = [
  {
    userId: 1,
    nickname: '김모범',
    text: '안녕하세요! 저는 1번 후보 김모범입니다.',
    color: '#FF5733',
    createdTime: '07:16:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '후보님 공약에 대해 질문드리고 싶습니다.',
    color: '#33FF57',
    createdTime: '07:16:51',
  },
  {
    userId: 1,
    nickname: '김모범',
    text: '네, 어떤 점이 궁금하신가요?',
    color: '#FF5733',
    createdTime: '07:17:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '학교 급식 개선 공약에 대해 구체적인 계획이 있으신가요?',
    color: '#33FF57',
    createdTime: '07:17:50',
  },
  {
    userId: 3,
    nickname: '유권자2',
    text: '저도 같은 궁금증이 있었습니다!',
    color: '#5733FF',
    createdTime: '07:18:50',
  },
  {
    userId: 1,
    nickname: '김모범',
    text: '안녕하세요! 저는 1번 후보 김모범입니다.',
    color: '#FF5733',
    createdTime: '07:16:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '후보님 공약에 대해 질문드리고 싶습니다.',
    color: '#33FF57',
    createdTime: '07:16:51',
  },
  {
    userId: 1,
    nickname: '김모범',
    text: '네, 어떤 점이 궁금하신가요?',
    color: '#FF5733',
    createdTime: '07:17:50',
  },
  {
    userId: 2,
    nickname: '유권자1',
    text: '학교 급식 개선 공약에 대해 구체적인 계획이 있으신가요?',
    color: '#33FF57',
    createdTime: '07:17:50',
  },
  {
    userId: 3,
    nickname: '유권자2',
    text: '저도 같은 궁금증이 있었습니다!',
    color: '#5733FF',
    createdTime: '07:18:50',
  },
];

export const MOCK_PLEDGES = [
  '학생 자치회 예산 50% 증액 및 투명한 예산 사용 보고 시스템 도입',
  '교내 카페테리아 운영시간 연장 및 메뉴 다양화 추진',
  '분기별 학생-교사 간담회 정례화로 소통 강화',
  '동아리실 시설 개선 및 신규 동아리 설립 지원 확대',
  '교내 휴게공간 확충 및 현대화 사업 추진',
];
