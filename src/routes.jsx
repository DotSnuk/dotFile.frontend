import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Upload from './components/Upload/Upload';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/upload', element: <Upload /> },
    ],
  },
];
