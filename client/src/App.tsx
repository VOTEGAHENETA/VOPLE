import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import Header from '@/components/molecules/Header';
import ElectionListItem from './components/molecules/ElectionListItem';

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
      <main id='main-container' className={showHeader ? 'show-header' : ''}>
        app page
        <Outlet />
        <ElectionListItem
          id={1}
          title='제목'
          endDate='2045-234'
          isClosed={true}
        ></ElectionListItem>
      </main>
    </>
  );
}

export default App;
