import IconUsers from '@/assets/icons/IconUsers';
import styles from './index.module.scss';
import IconLogo from '@/assets/icons/IconLogo';
import Text from '@/components/atoms/Text';
import InputField from '@/components/molecules/InputField';
import React, { useState } from 'react';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import { useQuestionGet, useQuestionPost } from '@/services/hooks/question';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

function QuestionSection() {
  const navigate = useNavigate();
  const { election_id } = useParams() as { election_id: string };
  const { data: questionData, isLoading } = useQuestionGet(Number(election_id));
  const [answer, setAnswer] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  function handleChangeAnswer(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
    setErrMsg('');
  }

  const mutation = useQuestionPost(Number(election_id), setErrMsg);
  function handleSumbitAnswer() {
    mutation.mutate({ sessionId: Number(election_id), answer: answer });
  }
  function handleCancel() {
    navigate('/elections/list');
  }

  return (
    <div className={styles['question-container']}>
      <div className={styles['img-section']}>
        <IconUsers size={66} />
        <IconLogo width={140} height={30} />
      </div>
      <div className={styles['qna-section']}>
        <div className={styles['qna-wrapper']}>
          <Text size='s' weight='bold' color='var(--color-main-orange)'>
            우리만 아는 이야기
          </Text>
          <div className={styles['qna-question']}>
            {isLoading ? (
              <div className={styles.loading}>
                <LoadingSpinner />
              </div>
            ) : (
              <Text size='m' color='var(--color-black)'>
                {questionData}
              </Text>
            )}
          </div>
        </div>
        <div className={styles['qna-answer']}>
          <InputField
            id='answer'
            value={answer}
            onChange={handleChangeAnswer}
          />
          <div className={styles['qna-answer-error']}>
            <Text size='s' color='var(--color-error)' weight='bold'>
              {errMsg}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles['btn-seciton']}>
        <BaseButton
          type='reset'
          kind='base'
          status={BASE_BUTTON_STATUS.OUTLINE}
          onClick={handleCancel}
        >
          취소
        </BaseButton>
        <BaseButton
          type='submit'
          kind='base'
          status={BASE_BUTTON_STATUS.FILL}
          onClick={handleSumbitAnswer}
        >
          확인
        </BaseButton>
      </div>
    </div>
  );
}

export default QuestionSection;
