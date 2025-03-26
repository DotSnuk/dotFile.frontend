import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className='flex flex-row justify-evenly'>
      <Link to='/login'>Login</Link>
      <Link to='/temp'>Temp</Link>
    </nav>
  );
}
