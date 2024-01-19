import React, { useEffect, useRef, useState } from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import CustomModal from '../components/CustomModal'
import { firestore } from '../Firebase';
import { Outlet } from 'react-router-dom'
import '../index.css'
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderOptions, setFolderOptions] = useState([]);
  const initialRef = useRef();

  const openModal = () => {
    console.log("What's on your mind?");
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  

  const addFileModalConfig = {
    title: 'Add File',
    formFields: [
      { label: 'File Name', placeholder: 'Enter file name', type: 'input', id: 'file name' },
      { label: 'Save To', placeholder: 'Select where to save', type: 'select', id: 'save to', options: [
          {label: 'Tasks', value: 'Tasks'},
          {label: 'Notes', value: 'Notes'}
        ]
      },
      { label: 'Folder', placeholder: 'Select folder', type: 'select', id: 'folder', options: folderOptions },
      { label: 'Contents', placeholder: 'Write your thoughts here...', type: 'textarea', id: 'contents' },
    ],
  };


  useEffect(() => {
    const fetchFolders = async () => {
      const folderCollection = collection(firestore, 'Folder');
      const retrievedFolders = await getDocs(folderCollection);
      const folders = retrievedFolders.docs.map(folderDoc => (
        { label: folderDoc.data().folderName, value: folderDoc.data().folderName }
      ))
      setFolderOptions(folders);
    };
    fetchFolders();
  }, []);


  return (
    <div className={`flex w-full h-screen relative items-start font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar openModal={openModal} />

        <Outlet />

        <CustomModal isOpen={isModalOpen} onClose={closeModal} initialRef={initialRef} modalConfig={addFileModalConfig} />
      
    </div>
  )
}

export default Home