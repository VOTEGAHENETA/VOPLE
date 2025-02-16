// import BaseButton from '@/components/atoms/BaseButton';
import TabContainer from '@/components/organisms/TabContainer';
import styles from './index.module.scss';
import StreamSender from '@/components/atoms/StreamSender';

function Streaming() {
  return (
    <div className={styles.streaming__section}>
      <StreamSender streamId={1} />
      {/* <BaseButton kind='base' status='fill' type='button'>
            라이브 시작
          </BaseButton> */}
      <TabContainer
        sessionId={1}
        theme='dark'
        type='team'
        userId={1}
        voteTeamId={1}
      />
    </div>
  );
}

export default Streaming;
