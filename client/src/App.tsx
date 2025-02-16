import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import Header from '@/components/molecules/Header';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/elections/list', { replace: true });
    }
  }, [location.pathname, navigate]);

  // 헤더가 사용되지 않는 곳
  const nonHeaderLocation = [
    /^\/login$/,
    /^\/elections\/\d+\/candidates\/\d+$/,
    /^\/elections\/\d+\/question$/,
    /^\/live\/\d+\/\d+$/,
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
