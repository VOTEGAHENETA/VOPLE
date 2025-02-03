import poster from '@/assets/sample/sample.png';

interface MockType {
  id: number;
  perfix?: string;
  username?: string;
  poster?: string;
  candidate_statement?: string;
}

export const mockCandidate: MockType = {
  id: 1,
  perfix: '신용1등급',
  username: '이은빈',
  poster: poster,
  candidate_statement: `😎 ENFJ
                ❤️ 독서, 음악감상
                👌 고민상담 환영
                🎤 Youtube 채널명: 2은빈
                @leeeunbin`,
};
