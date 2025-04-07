import { Link } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import MenuDropdown from '../MenuDropdown/MenuDropdown';

export default function Header() {
  const { loading, user, logout, isAuth } = useUser();

  if (loading) return <div>Loading...</div>;

  const loggedIn = (
    <div className='col-span-1'>
      <MenuDropdown />
    </div>
  );
  const notLoggedIn = (
    <div className='col-span-1'>
      <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
    </div>
  );

  return (
    <nav className='grid grid-cols-2 place-items-center'>
      <h1 className='col-span-1 text-xl'>.dotFile</h1>
      {isAuth() ? loggedIn : notLoggedIn}
    </nav>
  );
}
