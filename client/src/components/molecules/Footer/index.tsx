import styles from './index.module.scss';
import IconButton from '@/components/atoms/IconButton';
import { ICON_NAME } from '@/constants/ui.constants';
import CircleButton from '@/components/atoms/CircleButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useIsVoter } from '@/services/hooks/useCandidateInfo';

/** 메인 화면에서 보여질 Footer */
function Footer() {
  const navigate = useNavigate();
  const { election_id } = useParams() as { election_id: string };
  const { data } = useIsVoter(Number(election_id));

  function handleHome() {
    navigate('/elections/list');
  }

  function handleMyPage() {
    if (data) {
      console.log(data);
      if (data === 'VOTER') {
        navigate('/mypage');
      } else {
        navigate(`/candidate/${election_id}`);
      }
    }
  }

  return (
    <nav id={styles.footer}>
      <IconButton name={ICON_NAME.HOME} onClick={handleHome} />
      <IconButton name={ICON_NAME.MYPAGE} onClick={handleMyPage} />
      <div className={styles['circle-section']}>
        <CircleButton type='button' />
      </div>
    </nav>
  );
}

export default Footer;
