import { useState } from 'react';
import { postRegister } from '../../api/backend';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';

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
    <form onSubmit={e => submitData(e)}>
      <label htmlFor='username'>Username: </label>
      <input
        type='text'
        id='username'
        className='border'
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor='email'>Email: </label>
      <input
        type='text'
        id='email'
        className='border'
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password: </label>
      <input
        type='password'
        className='border'
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor='confirm'>Confirm password: </label>
      <input
        type='password'
        id='confirm'
        className='border'
        onChange={e => setConfirm(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
