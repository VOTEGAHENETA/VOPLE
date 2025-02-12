import App from '@/App';
import Result from '@/components/organisms/Result/Result';
import ElectionListTemplate from '@/components/templates/ElectionListTemplate';
import VoteTemplate from '@/components/templates/VoteTemplate';
import Channel from '@/pages/Channel';
import Create from '@/pages/Election/Create';
import Manage from '@/pages/Election/Manage';
import Home from '@/pages/Home';
import Main from '@/pages/Main';
import Streaming from '@/pages/Streaming';
import Candidate from '@/pages/UserInfo/Candidate';
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
        path: 'elections/:election_id/result/',
        element: <Result />,
      },
      { path: 'elections/:election_id/vote', element: <VoteTemplate /> },
      {
        path: 'candidate/:sessionId/:userId',
        element: <Candidate />,
      },
      {
        path: 'live/:teamId',
        element: <Streaming />,
      },
      {
        path: '/elections/:election_id/result',
        element: <Result />,
      },
      {
        path: '/elections/list',
        element: <ElectionListTemplate />,
      },
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
