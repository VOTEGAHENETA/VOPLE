import App from '@/App';
import FinalTemplate from '@/components/templates/FinalTemplate';
import ElectionListTemplate from '@/components/templates/ElectionListTemplate';
import Login from '@/components/templates/LoginTemplate';
import ResultCurrentTemplate from '@/components/templates/ResultCurrentTemplate';
import VoteTemplate from '@/components/templates/VoteTemplate';
import Channel from '@/pages/Channel';
import Create from '@/pages/Election/Create';
import Manage from '@/pages/Election/Manage';
import Question from '@/pages/Election/Question';
import Home from '@/pages/Home';
import Main from '@/pages/Main';
import Streaming from '@/pages/Streaming';
import Candidate from '@/pages/UserInfo/Candidate';
import { createBrowserRouter } from 'react-router-dom';
import Error from '@/pages/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/elections/:election_id/question',
        element: <Question />,
      },
      {
        path: '/elections/list',
        element: <ElectionListTemplate />,
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
        path: '/elections/:election_id/result',
        element: <ResultCurrentTemplate />,
      },
      {
        path: 'live/:teamId',
        element: <Streaming />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'channel',
        element: <Channel />,
      },
      {
        path: '/elections/:election_id/final',
        element: <FinalTemplate />,
      },
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
