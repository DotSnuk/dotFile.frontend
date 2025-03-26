import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

export default function App() {
  return (
    <div className='flex flex-col justify-start h-full margin'>
      <Header />
      <Outlet />
    </div>
  );
}
