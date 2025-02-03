import App from '@/App';
import Home from '@/pages/Home';
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
      // ... 같은 방식 진행 추후 errorElement 추가 예정
    ],
  },
]);
