import { Link } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import MenuDropdown from '../MenuDropdown/MenuDropdown';

export default function Header() {
  const { loading, user, logout, isAuth } = useUser();

  if (loading) return <div>Loading...</div>;

  const loggedIn = (
    <>
      <Link to='/bla'>Bla</Link>
      <MenuDropdown />
      <input type='button' onClick={() => logout()} value='Logout' />
    </>
  );
  const notLoggedIn = (
    <>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </>
  );

  return (
    <nav className='flex flex-row justify-evenly'>
      <h1 className='text-xl'>.dotFile</h1>
      {isAuth() ? loggedIn : notLoggedIn}
    </nav>
  );
}
