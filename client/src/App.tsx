import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import Header from '@/components/molecules/Header';

function App() {
  const location = useLocation();

  // 헤더가 사용되지 않는 곳
  const nonHeaderLocation = [
    /^\/login$/,
    /^\/elections\/\d+\/candidates\/\d+$/,
    /^\/elections\/\d+\/question$/,
    /^\/live\/\d+$/,
  ];

  const showHeader = !nonHeaderLocation.some((regex) =>
    regex.test(location.pathname)
  );

  return (
    <>
      {showHeader && <Header />}
      <main id='main-container' className={showHeader ? 'show-header' : ''}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
