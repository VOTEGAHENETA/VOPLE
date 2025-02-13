import IconUsers from '@/assets/icons/IconUsers';
import styles from './index.module.scss';
import IconLogo from '@/assets/icons/IconLogo';
import Text from '@/components/atoms/Text';
import InputField from '@/components/molecules/InputField';
import React, { useState } from 'react';
import BaseButton from '@/components/atoms/BaseButton';
import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';

function QuestionSection() {
  const [answer, setAnswer] = useState<string>('');

  function handleChangeAnswer(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
  }
  return (
    <div className={styles['question-container']}>
      <div className={styles['img-section']}>
        <IconUsers size={66} />
        <IconLogo width={140} height={30} />
      </div>
      <div className={styles['qna-section']}>
        <Text size='s' weight='bold' color='var(--color-main-orange)'>
          우리만 아는 이야기
        </Text>
        <div className={styles['qna-question']}>
          <Text size='m' weight='bold' color='var(--color-black)'>
            우리 소풍 때 처음 만난 벌레는 무엇일까요?
          </Text>
        </div>
        <div className={styles['qna-answer']}>
          <InputField
            id='answer'
            value={answer}
            onChange={handleChangeAnswer}
          />
        </div>
      </div>
      <div className={styles['btn-seciton']}>
        <BaseButton
          type='reset'
          kind='base'
          status={BASE_BUTTON_STATUS.OUTLINE}
        >
          취소
        </BaseButton>
        <BaseButton type='submit' kind='base' status={BASE_BUTTON_STATUS.FILL}>
          확인
        </BaseButton>
      </div>
    </div>
  );
}

export default QuestionSection;
