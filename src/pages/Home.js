import React, { useEffect, useRef, useState } from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import CustomModal from '../components/CustomModal'
import { firestore, auth } from '../Firebase';
import { Outlet } from 'react-router-dom'
import '../index.css'
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderOptions, setFolderOptions] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const initialRef = useRef();

  const openModal = () => {
    console.log("What's on your mind?");
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }


       //   GETTING CURRENT USER
  useEffect(() => {
      const loggedInUser = auth.onAuthStateChanged( async (user) => {
          if (user) {
              const userUID = user.uid;
              setCurrentUserId(userUID);
              const userDocRef = doc(firestore, 'User', userUID);
              try {
                  const userData = await getDoc(userDocRef);

                  if (userData.exists()) {
                      const userInfo = userData.data();

                      if (userInfo) {
                          const loggedUser = userInfo.username;
                          setCurrentUser(loggedUser)
                          console.log(loggedUser)
                          console.log(currentUserId)
                      }
                  }
              }
              catch (err) {

              }
              
          }
          else {
              setCurrentUser('')
              setCurrentUserId('')
          }
      });
        return () => loggedInUser();
  }, [currentUserId]);


  const updateFolderOptions = (newFolders) => {
    setFolderOptions(newFolders);
  };




  

  const addFileModalConfig = {
    title: 'Add File',
    formFields: [
      { label: 'File Name', placeholder: 'Enter file name', type: 'input', id: 'file name' },
      { label: 'Save To', placeholder: 'Select where to save', type: 'select', id: 'save to', options: [
          {name: 'Tasks', value: 'Tasks'},
          {name: 'Notes', value: 'Notes'}
        ]
      },
      { label: 'Folder', placeholder: 'Select folder', type: 'select', id: 'folder', options: folderOptions },
      { label: 'Contents', placeholder: 'Write your thoughts here...', type: 'textarea', id: 'contents' },
    ],
  };






  // useEffect(() => {
  //   const fetchFolders = async () => {
  //     const folderCollection = collection(firestore, 'Folder');
  //     const retrievedFolders = await getDocs(folderCollection);
  //     const folders = retrievedFolders.docs.map(folderDoc => (
  //       { label: folderDoc.data().folderName, value: folderDoc.data().folderName }
  //     ))
  //     setFolderOptions(folders);
  //   };
  //   fetchFolders();
  // }, []);



const fetchFolders = async () => {
        

  const folderCollection = collection(firestore, 'Folder');
  // const usersFolders = query(folderCollection, where('ownerId', '==', currentUser.uid))

  try {

      if (!currentUser) {
          console.error('User not logged in or user data is incomplete.');
          console.log(currentUser)
          console.log(currentUserId)
      }
      else {
          const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));
          const folders = retrievedFolders.docs.map((folderDoc) => (
              { name: folderDoc.data().folderName, value: folderDoc.data().folderName }
          ));
          setFolderOptions(folders);
      }
      fetchFolders();
  } catch (error) {
        console.error("Error fetching folders: ", error);
  }
};





    //   USEEFFECT TO CALL AND RETREIVE FOLDERS FROM DATABASE
  useEffect(() => {
      if (currentUser) {
          fetchFolders();

          console.log(currentUser)
      }
      // eslint-disable-next-line
  }, [currentUser]);





  return (
    <div className={`flex w-full h-screen relative items-start font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar openModal={openModal} />

        <Outlet />

        <CustomModal isOpen={isModalOpen} onClose={closeModal} initialRef={initialRef} modalConfig={addFileModalConfig} updateFolderOptions={updateFolderOptions} />
      
    </div>
  )
}

export default Home