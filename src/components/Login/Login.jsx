import './Login.css';
import { useState } from 'react';
import { postLogin } from '../../api/backend';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import CenterContainer from '../CenterContainer/CenterContainer';
import * as tailwindClasses from '../../assets/tailwindClasses';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { checkAuthStatus } = useUser();
  const navigate = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    const response = await postLogin({ username, password });
    console.log(response);
    if (response.success) {
      checkAuthStatus();
      navigate('/');
    }
  }

  return (
    <CenterContainer>
      <form onSubmit={e => submitData(e)} className={tailwindClasses.inputForm}>
        <div className={tailwindClasses.inputContainer}>
          <label htmlFor='username' className={tailwindClasses.inputLabel}>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            className={tailwindClasses.inputText}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <label htmlFor='password' className={tailwindClasses.inputLabel}>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className={tailwindClasses.inputText}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className={tailwindClasses.formButton}>
          Login
        </button>
      </form>
    </CenterContainer>
  );
}
