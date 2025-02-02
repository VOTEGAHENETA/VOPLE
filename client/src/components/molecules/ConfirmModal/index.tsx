import { ReactNode } from 'react';
import styles from './index.module.scss';
import Text from '@/components/atoms/Text';

interface Props {
  /** 이미지 파일이 존재하다면 src 첨부 */
  imgSrc?: string;
  /** 확인창의 설명 */
  label: string;
  /** 컨텐츠가 있는 경우 추가 */
  children?: ReactNode;
}

function ConfirmModal({ imgSrc, children, label }: Props) {
  return (
    <dialog id={styles.modal}>
      {imgSrc && <img src={imgSrc} alt='img' />}
      <Text weight='bold'>{label}</Text>
      <main className={styles['modal-contents']}>{children}</main>
    </dialog>
  );
}

export default ConfirmModal;
