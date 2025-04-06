import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

export default function App() {
  return (
    <div className='margin flex h-dvh flex-col justify-start'>
      <Header />
      <Outlet />
    </div>
  );
}
