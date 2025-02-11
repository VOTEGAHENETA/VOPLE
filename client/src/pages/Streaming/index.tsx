// import BaseButton from '@/components/atoms/BaseButton';
import TabContainer from '@/components/organisms/TabContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './index.module.scss';

const queryClient = new QueryClient();

function Streaming() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* 임시 스트리밍 화면 */}
        <div className={styles.streaming__section}>
          {/* <BaseButton kind='base' status='fill' type='button'>
            라이브 시작
          </BaseButton> */}
          <TabContainer
            sessionId={1}
            theme='dark'
            type='team'
            userId={1}
            voteTeamId={1}
          ></TabContainer>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default Streaming;
