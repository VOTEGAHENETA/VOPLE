import BaseButton from '@/components/atoms/BaseButton';
import Poster from '@/components/atoms/Poster';
import Text from '@/components/atoms/Text';
import InputField from '@/components/molecules/InputField';
import TextAreaField from '@/components/molecules/TextAreaField';
import X from '@/assets/icons/x.svg';
import { ChangeEvent, RefObject, useState } from 'react';
import styles from './index.module.scss';
import { UserInfoFormData } from '@/types/candidate';

interface CandidateInfoSectionProps {
  prefix: string;
  candidateStatement: string;
  pledges: string[];
  posterSrc: string;
  fileInputRef: RefObject<HTMLInputElement>;
  onChangeField: <T extends HTMLInputElement | HTMLTextAreaElement>(
    fieldName: keyof UserInfoFormData,
    e: ChangeEvent<T>
  ) => void;
  onUploadClick: () => void;
  onFileChange: (file: File) => void;
  handlePledgeChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  handleAddPledge: () => void;
  handleDeletePledge: (index: number) => void;
}

export default function CandidateInfoSection({
  prefix,
  candidateStatement,
  pledges,
  posterSrc,
  fileInputRef,
  onChangeField,
  onUploadClick, // 클릭 시 업로드창 뜨는 것
  onFileChange,
  handlePledgeChange,
  handleAddPledge,
  handleDeletePledge,
}: CandidateInfoSectionProps) {
  const [previewImage, setPreviewImage] = useState<string>(posterSrc);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (예: 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 이미지 프리뷰 생성
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 부모 컴포넌트에 파일 전달
    onFileChange(file);
  };
  return (
    <section className={styles.section}>
      <Text size='m' className={styles.sectionTitle}>
        선거 채널 정보 수정
      </Text>
      <div className={styles.section__wrap}>
        <div className={styles.poster__wrap}>
          <Poster src={previewImage} size='m' />
        </div>
        <BaseButton
          customClass={styles.upload__btn}
          kind='base'
          status='fill'
          type='button'
          onClick={onUploadClick}
        >
          포스터 업로드
        </BaseButton>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleFileChange}
        />
        <InputField
          value={prefix}
          onChange={(e) => onChangeField('prefix', e)}
          id='prefix-input'
          label='칭호'
          placeholder='후보님(들)의 센스 넘치는 칭호를 지어보세요 😀'
        />
        <TextAreaField
          id='candidateStatement-input'
          label='상태 메세지'
          value={candidateStatement}
          onChange={(e) => onChangeField('candidateStatement', e)}
          maxLength={100}
          placeholder='후보님(들)을 자유롭게 소개해보세요 📢'
        />
        <div className={styles.pledgeField}>
          <div className={styles.pledgeHeader}>
            <Text size='sm'>공약</Text>
            <Text size='xs' className={styles.pledgeCount}>
              {pledges.length} / 5
            </Text>
          </div>
          <div className={styles.pledgeContainer}>
            {pledges.map((pledge, index) => (
              <div key={index} className={styles.pledge}>
                <InputField
                  key={index}
                  value={pledge}
                  onChange={(e) => handlePledgeChange(index, e)}
                  id={`pledge-input-${index}`}
                  placeholder='매력적인 공약🗒️을 작성해보세요(개당 100자)'
                />
                {index !== 0 && (
                  <button
                    type='button'
                    onClick={() => handleDeletePledge(index)}
                    className={styles.x__btn}
                  >
                    <img src={X} alt='공약 삭제 버튼' />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className={styles.btn_wrap}>
            <BaseButton
              customClass={styles.add__btn}
              type='button'
              kind='chip'
              status='fill'
              onClick={handleAddPledge}
            >
              + 추가
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
}
