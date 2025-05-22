import CenterContainer from '../CenterContainer/CenterContainer';
import { useUser } from '../UserContext/UserContext';
import { useEffect, useState } from 'react';
import { getDateString } from '../../utils/dateParser';
import sizeConverter from '../../utils/sizeConverter';
import { inputForm, textRow, formButton } from '../../assets/tailwindClasses';
import {
  makeDir,
  getDir,
  postUpload,
  getHomeDir,
  getFolderStructure,
  getChildFolders,
} from '../../api/backend';
import { Folder } from 'lucide-react';

export default function FileViewer() {
  const { loading, user, isAuth } = useUser();
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [currentPath, setCurrentPath] = useState('');
  const [newFolder, setNewFolder] = useState('');

  useEffect(() => {
    async function init() {
      await homeDir();
      getFolderData();
    }
    init();
  }, []);

  useEffect(() => {
    getFolderData();
  }, [currentFolderId]);

  const currentFolders = folders.map(folder => (
    <div
      key={folder.id}
      className='flex flex-row gap-1'
      onClick={() => {
        setCurrentFolderId(folder.id);
      }}
    >
      <Folder />
      <div>{folder.name}</div>
    </div>
  ));

  const datafiles = Array.isArray(files) ? (
    files.map(file => (
      <div key={file.name} className={textRow + ' grid grid-cols-7'}>
        <span className='col-span-4'>{file.name}</span>
        <span className='col-span-2'>{getDateString(file.createdAt)}</span>
        <span className='col-span-1'>{sizeConverter(file.sizeBytes)}</span>
      </div>
    ))
  ) : (
    <div>No file</div>
  );

  const path = (
    <div>
      <span>Path: </span>
      <span className={textRow}>{currentPath}</span>
    </div>
  );

  async function homeDir() {
    const folderData = await getHomeDir();
    setCurrentFolderId(folderData.id);
  }

  async function getFolderData() {
    // const folderData = await getDir({ path: getFullPath(currentFolderId) });
    // setFiles folderData.items);
    // setFolders folderData.folders);
    if (user !== null) {
      // needed for  first render
      const folderData = await getDir({ folderId: currentFolderId });
      setFiles(folderData);
      const childFolders = await getChildFolders({ currentFolderId });
      console.log(childFolders);
      setFolders(childFolders);

      const folderStucture = await getFolderStructure({
        folderId: currentFolderId,
      });
      setCurrentPath(getFullPath(folderStucture));
      // setCurrentPath(getFullPath(folderData));
    }
  }

  async function getFiles() {}

  async function uploadFile(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      inputfile: formData.get('inputfile'),
      folderId: currentFolderId,
    };

    await postUpload(formValues);
  }

  async function submitNewFolder(e) {
    e.preventDefault();
    await makeDir({ folderName: newFolder, currentFolderId });
  }

  const buttons = (
    <div>
      <form onSubmit={e => submitNewFolder(e)}>
        <input
          type='text'
          name='foldername'
          id='foldername'
          className='border-2'
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

        {/* {currentFolderId.parent !== null && (
          <div
            className='flex flex-row gap-1'
            onClick={() => setCurrentFolderId(prev => prev.parent)}
          >
            <Folder />
            <div>..</div>
          </div>
        )} */}
        <div className=''>
          {currentFolders}
          {datafiles}
        </div>
        {buttons}
        <form
          onSubmit={e => uploadFile(e)}
          method='post'
          encType='multipart/form-data'
        >
          <label htmlFor=''></label>
          <input type='file' name='inputfile' />
          <button type='submit'>Upload</button>
        </form>
      </div>
    </CenterContainer>
  );
}

function PathNode(path, parent = null) {
  return { path, parent };
}

// function getFullPath(node, path = '') {
//   while (node.parent !== null)
//     return getFullPath(node.parent, path + '/' + node.path);
//   return path + node.path;
// }

function getFullPath(node, path = '') {
  while (node.parent !== null) return getFullPath(node.parent, node.name + '/');
  return '/' + path;
}
