import './Login.css';
import { useState } from 'react';
import { postLogin } from '../../api/backend';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitData(e) {
    e.preventDefault();
    const response = await postLogin({ username, password });
    console.log(response);
    // postLogin({ username, password });
  }

  return (
    <form onSubmit={e => submitData(e)}>
      <label htmlFor='username' className=''>
        username:
        <input
          type='text'
          name='username'
          className='border-2 border-solid border-indigo-500 rounded-sm p-1 indent-1'
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor='password'>password: </label>
      <input
        type='password'
        name='password'
        className='border-2 border-solid border-indigo-500 rounded-sm p-1 indent-1'
        onChange={e => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  );
}
