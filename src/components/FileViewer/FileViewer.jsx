import CenterContainer from '../CenterContainer/CenterContainer';
import { useUser } from '../UserContext/UserContext';
import { useEffect, useState } from 'react';
import { getDir } from '../../api/backend';
import { getDateString } from '../../utils/dateParser';
import sizeConverter from '../../utils/sizeConverter';
import { inputForm, textRow } from '../../assets/tailwindClasses';

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
      <div key={file.filename} className={textRow + ' grid grid-cols-7'}>
        <span className='col-span-4'>{file.filename}</span>
        <span className='col-span-2'>{getDateString(file.dateCreated)}</span>
        <span className='col-span-1'>{sizeConverter(file.size)}</span>
      </div>
    ))
  ) : (
    <div>No file</div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <CenterContainer>
      <div className={inputForm + 'flex w-xl flex-col'}>
        <div className='grid grid-cols-7'>
          <span className='col-span-4 text-xs'>Filename</span>
          <span className='col-span-2 text-xs'>Date</span>
          <span className='col-span-1 text-xs'>Size</span>
        </div>
        <div>{datafiles}</div>
      </div>
    </CenterContainer>
  );
}
