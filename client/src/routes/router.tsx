import App from '@/App';
import ElectionListTemplate from '@/components/templates/ElectionListTemplate';
import Login from '@/components/templates/LoginTemplate';
import ResultCurrentTemplate from '@/components/templates/ResultCurrentTemplate';
import VoteTemplate from '@/components/templates/VoteTemplate';
import Channel from '@/pages/Channel';
import Create from '@/pages/Election/Create';
import Manage from '@/pages/Election/Manage';
import Home from '@/pages/Home';
import Main from '@/pages/Main';
import Streaming from '@/pages/Streaming';
import Candidate from '@/pages/UserInfo/Candidate';
import Voter from '@/pages/UserInfo/Voter';
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
        path: 'elections/:election_id/vote',
        element: <VoteTemplate />,
      },
      {
        path: 'candidate/:session_id/:vote_team_id',
        element: <Candidate />,
      },
      {
        path: 'live/:teamId',
        element: <Streaming />,
      },
      {
        path: '/elections/:election_id/result',
        element: <ResultCurrentTemplate />,
      },
      {
        path: '/elections/list',
        element: <ElectionListTemplate />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: 'mypage',
        element: <Voter />,
      },
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
