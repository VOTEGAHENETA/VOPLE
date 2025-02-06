import RoleNameTag from '@/components/molecules/RoleNameTag';
import Text from '@/components/atoms/Text';
import styles from './index.module.scss';

// 목업 데이터 Props 추후 수정 예정
interface Props {
  test: {
    voteId: number;
    voteName: string;
    username: string;
    sessionName?: string;
  }[];
}

function VotingBoard({ test }: Props) {
  return (
    <div className={styles.board}>
      <Text size='xs' weight='bold' color='#777777'>
        {test[0]?.sessionName}
      </Text>
      <div>
        <Text size='lg' weight='bold' color='#000000' className={styles.text}>
          이번 선거의
          <Text
            size='xl'
            weight='bold'
            color='#6255FF'
            className={styles.point}
          >
            국가권력
            <Text size='lg' weight='bold' color='#000000'>
              은?
            </Text>
          </Text>
        </Text>
      </div>
      <div className={styles.tag}>
        {test.map((candidate) => (
          <RoleNameTag
            key={candidate.voteId}
            voteId={candidate.voteId}
            voteName={candidate.voteName}
            username={candidate.username}
          />
        ))}
      </div>
    </div>
  );
}

export default VotingBoard;

// App.tsx mockup test 사용 예시

// interface Props {
//   voteId: number;
//   voteName: string;
//   username: string;
//   sessionName?: string;
// }

// const test: Props[] = [
//   {
//     voteId: 1,
//     voteName: '국가원수',
//     username: '김선명',
//     sessionName: '제 12대 싸피 중학교 회장 선거',
//   },
//   {
//     voteId: 2,
//     voteName: '와이프',
//     username: '카리나',
//     sessionName: '제 12대 싸피 중학교 회장 선거',
//   },
// ];

// return 문 안에서
// <VotingBoard test={test} />
