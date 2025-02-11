// import BaseButton from '@/components/atoms/BaseButton';
import TabContainer from '@/components/organisms/TabContainer';
import styles from './index.module.scss';

function Streaming() {
  return (
    <div>
      {/* 임시 스트리밍 화면 */}
      <div className={styles.streaming__section}>
        {/* <BaseButton kind='base' status='fill' type='button'>
            라이브 시작
          </BaseButton> */}
        <TabContainer
          sessionId={1}
          theme='dark'
          type='team'
          voteTeamId={1}
          userId={2}
        ></TabContainer>
      </div>
    </div>
  );
}

export default Streaming;
