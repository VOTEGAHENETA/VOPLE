import App from '@/App';
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
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
