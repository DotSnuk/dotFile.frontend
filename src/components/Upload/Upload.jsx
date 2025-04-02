import { useUser } from '../UserContext/UserContext';
import { useState } from 'react';
import { postUpload } from '../../api/backend';

export default function Upload() {
  const { loading, isAuth } = useUser();

  async function uploadFile(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      inputfile: formData.get('inputfile'),
    };
    const response = await postUpload(formValues);
  }

  if (loading) return <div>Loading...</div>;
  return (
    <form
      onSubmit={e => uploadFile(e)}
      method='post'
      encType='multipart/form-data'
    >
      <label htmlFor=''></label>
      <input type='file' name='inputfile' />
      <button type='submit'>Upload</button>
    </form>
  );
}
