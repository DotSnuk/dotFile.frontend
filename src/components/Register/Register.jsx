import { useState } from 'react';
import { postRegister } from '../../api/backend';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import * as tailwindClasses from '../../assets/tailwindClasses';
import CenterContainer from '../CenterContainer/CenterContainer';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { checkAuthStatus } = useUser();
  const navigate = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    const response = await postRegister({
      username,
      email,
      password,
      confirm,
    });
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
            className={tailwindClasses.inputText}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className={tailwindClasses.inputContainer}>
          <label htmlFor='email' className={tailwindClasses.inputLabel}>
            Email
          </label>
          <input
            type='text'
            id='email'
            className={tailwindClasses.inputText}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={tailwindClasses.inputContainer}>
          <label htmlFor='password' className={tailwindClasses.inputLabel}>
            Password
          </label>
          <input
            type='password'
            id='password'
            className={tailwindClasses.inputText}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className={tailwindClasses.inputContainer}>
          <label htmlFor='confirm' className={tailwindClasses.inputLabel}>
            Confirm password
          </label>
          <input
            type='password'
            id='confirm'
            className={tailwindClasses.inputText}
            onChange={e => setConfirm(e.target.value)}
          />
        </div>

        <button type='submit' className={tailwindClasses.formButton}>
          Submit
        </button>
      </form>
    </CenterContainer>
  );
}
