import axios from 'axios';

export async function postLogin(data) {
  const response = await axios.post('/api/login', data);
  return response.data;
}

export async function getLogout() {
  console.log('clicked');
  const response = await axios.get('/api/logout');
  return response.data;
}

export async function postRegister(data) {
  const response = await axios.post('/api/register', data);
  return response.data;
}

export async function postUpload(data) {
  const response = await axios.post('/api/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function authStatus() {
  const response = await axios.get('/api/auth/status', {
    withCredentials: true,
  });
  return response.data;
}

export async function getTest() {
  console.log('inside getTest');
  const response = await axios.get('/api/test');
  console.log(response.data);
  return response;
}

export async function logDir() {
  const response = await axios.get('/api/logDir');
  return response;
}

export async function getDir() {
  const response = await axios.get('/api/getDir');
  return response.data;
}
