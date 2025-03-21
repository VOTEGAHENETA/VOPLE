import App from '@/App';
import FinalTemplate from '@/components/templates/FinalTemplate';
import ElectionListTemplate from '@/components/templates/ElectionListTemplate';
import Login from '@/components/templates/LoginTemplate';
import ResultCurrentTemplate from '@/components/templates/ResultCurrentTemplate';
import VoteTemplate from '@/components/templates/VoteTemplate';
import Create from '@/pages/Election/Create';
import Manage from '@/pages/Election/Manage';
import Question from '@/pages/Election/Question';
import Main from '@/pages/Main';
import Streaming from '@/pages/Streaming';
import Candidate from '@/pages/UserInfo/Candidate';
import Voter from '@/pages/UserInfo/Voter';
import { createBrowserRouter } from 'react-router-dom';
import Error from '@/pages/Error';
import AuthError from '@/pages/Error/403';

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
        path: 'candidate/:session_id',
        element: <Candidate />,
      },
      {
        path: '/elections/:election_id/result',
        element: <ResultCurrentTemplate />,
      },
      {
        path: 'live/:session_id/:team_id',
        element: <Streaming />,
      },
      {
        path: 'elections/:election_id/final',
        element: <FinalTemplate />,
      },
      {
        path: 'mypage',
        element: <Voter />,
      },
      {
        path: 'error/global',
        element: <Error />,
      },
      {
        path: 'error/auth',
        element: <AuthError />,
      },
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
