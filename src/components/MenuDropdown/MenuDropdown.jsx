import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';

const MENU_CLICKED_STATES = [
  `transition duration-300 rotate-0`,
  `transition duration-300 rotate-90 `,
];

const SETTINGS_CLICKED_STATES = [
  `pointer-events-none`,
  `opacity-100 left-0 scale-100 mt-6 pointer-events-auto`,
];

const SETTINGS_DROPDOWN = `absolute transition-all duration-300 ease-out transform opacity-0 scale-95  `;

export default function MenuDropdown() {
  const [clickedIndex, setClickedIndex] = useState(0);
  const { logout } = useUser();

  function toggleClassnames() {
    setClickedIndex(value => 1 - value);
  }
  const settings = (
    <nav className={SETTINGS_DROPDOWN + SETTINGS_CLICKED_STATES[clickedIndex]}>
      <Link>Test</Link>
      <input type='button' onClick={() => logout()} value='Logout' />
    </nav>
  );

  return (
    <>
      <div className='relative left-0 flex flex-col'>
        <Menu
          className={MENU_CLICKED_STATES[clickedIndex]}
          onClick={() => toggleClassnames()}
        />
        {settings}
      </div>
    </>
  );
}
