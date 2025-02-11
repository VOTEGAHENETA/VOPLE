import App from '@/App';
import Result from '@/components/templates/ResultTemplate/Result';
import VoteTemplate from '@/components/templates/VoteTemplate';
import Channel from '@/pages/Channel';
import Create from '@/pages/Election/Create';
import Manage from '@/pages/Election/Manage';
import Home from '@/pages/Home';
import Main from '@/pages/Main';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'channel',
        element: <Channel />,
      },
      {
        path: 'elections/:election_id',
        element: <Main />,
      },
      {
        path: 'elections/create',
        element: <Create />,
      },
      {
        path: 'elections/:election_id/manage',
        element: <Manage />,
      },
      {
        path: 'vote/:session_id/result/current',
        element: <Result />,
      },
      { path: 'vote/:session_id/detail', element: <VoteTemplate /> },
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
