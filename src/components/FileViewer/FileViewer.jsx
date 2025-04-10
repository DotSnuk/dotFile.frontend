import CenterContainer from '../CenterContainer/CenterContainer';
import { useUser } from '../UserContext/UserContext';
import { useEffect, useState } from 'react';
import { getDir } from '../../api/backend';
import { getDateString } from '../../utils/dateParser';
import sizeConverter from '../../utils/sizeConverter';

export default function FileViewer() {
  const { loading, isAuth } = useUser();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getDir();
      console.log(data);
      setFiles(data.data);
    }
    getData();
  }, []);

  const datafiles = Array.isArray(files) ? (
    files.map(file => (
      <div key={file.filename} className='flex flex-row'>
        <div>{file.filename}</div>
        <div>{getDateString(file.dateCreated)}</div>
        size:
        <div>{sizeConverter(file.size)}</div>
      </div>
    ))
  ) : (
    <div>No file</div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <CenterContainer>
      <div className='flex flex-col'>{datafiles}</div>
    </CenterContainer>
  );
}
