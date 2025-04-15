import CenterContainer from '../CenterContainer/CenterContainer';
import { useUser } from '../UserContext/UserContext';
import { useEffect, useState } from 'react';
import { getDateString } from '../../utils/dateParser';
import sizeConverter from '../../utils/sizeConverter';
import { inputForm, textRow, formButton } from '../../assets/tailwindClasses';
import { makeDir, getDir } from '../../api/backend';
import { Folder } from 'lucide-react';

export default function FileViewer() {
  const { loading, isAuth } = useUser();
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState(new PathNode('/'));
  const [newFolder, setNewFolder] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await getDir();
      setFiles(data.data.items);
      setFolders(data.data.folders);
    }
    getData();
  }, []);

  const currentFolders = folders.map(folder => (
    <div key={folder} className='flex flex-row gap-1'>
      <Folder />
      <div
        onClick={() => {
          setCurrentPath(value => new PathNode(folder, value));
        }}
      >
        {folder}
      </div>
    </div>
  ));

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

  const path = (
    <div>
      <span>Path: </span>
      <span className={textRow}>{getFullPath(currentPath)}</span>
    </div>
  );

  async function submitNewFolder(e) {
    e.preventDefault();
    await makeDir({ newFolder });
  }

  const buttons = (
    <div>
      <form onSubmit={e => submitNewFolder(e)}>
        <input
          type='text'
          name='foldername'
          id='foldername'
          onChange={e => setNewFolder(e.target.value)}
        />
        <button type='submit' className={formButton}>
          New folder
        </button>
      </form>
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <CenterContainer>
      <div className={inputForm + 'flex w-xl flex-col'}>
        {path}
        <div className='grid grid-cols-7'>
          <span className='col-span-4 text-xs'>Filename</span>
          <span className='col-span-2 text-xs'>Date</span>
          <span className='col-span-1 text-xs'>Size</span>
        </div>
        {currentFolders}
        <div>{datafiles}</div>
        {buttons}
      </div>
    </CenterContainer>
  );
}

function PathNode(path, parent = null) {
  return { path, parent };
}

function getFullPath(node, path = '') {
  while (node.parent !== null)
    return getFullPath(node.parent, path + '/' + node.path);
  return path + node.path;
}
