import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import Header from '@/components/molecules/Header';
import CandidateInfoUpdateTemplate from './components/templates/CandidateInfoUpdateTemplate';

function App() {
  const location = useLocation();

  // 헤더가 사용되지 않는 곳
  const nonHeaderLocation = [
    '/login',
    '/elections/:election_id/cadindates/:candidate_id',
  ];

  // [/elections//candidates/] => id값을 빼고 나온 path를 기준으로 header 유무 판단
  const showHeader = !nonHeaderLocation.some((path) =>
    location.pathname.startsWith(
      path.replace(':election_id', '').replace(':candidate_id', '')
    )
  );

  return (
    <>
      {showHeader && <Header />}
      <main id='main-container'>
        <CandidateInfoUpdateTemplate></CandidateInfoUpdateTemplate>
        <Outlet />
      </main>
    </>
  );
}

export default App;
