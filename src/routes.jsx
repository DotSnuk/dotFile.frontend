import App from './App';
import Login from './components/Login/Login';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: 'login', element: <Login /> }],
  },
];
