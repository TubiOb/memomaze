import React, { useEffect, useRef, useState } from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import CustomModal from '../components/CustomModal'
import { firestore, auth } from '../Firebase';
import { Outlet } from 'react-router-dom'
import '../index.css'
import { collection, getDocs, getDoc, doc, query, where, addDoc, serverTimestamp } from 'firebase/firestore';

const Home = ({ updateFileOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderOptions, setFolderOptions] = useState([]);
  // eslint-disable-next-line
  const [fileOptions, setFileOptions] = useState([]);
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
                          // console.log(currentUserId)
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
      { label: 'File Name', placeholder: 'Enter file name', type: 'input', id: 'file name', fieldName: 'fileName' },
      { label: 'Save To', placeholder: 'Select where to save', type: 'select', id: 'activity', fieldName: 'category', options: [
          {name: 'Tasks', value: 'Tasks'},
          {name: 'Notes', value: 'Notes'}
        ]
      },
      { label: 'Folder', placeholder: 'Select folder', type: 'select', id: 'folder', fieldName: 'selectedFolder', options: folderOptions },
      { label: 'Contents', placeholder: 'Write your thoughts here...', type: 'textarea', id: 'contents', fieldName: 'contents' },
    ],
  };





      //   FETCHING FOLDERS FROM DATABASE
  const fetchFolders = async () => {
    const folderCollection = collection(firestore, 'Folder');

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






      //   SAVING FILES TO THEIR RESPECTIVE FOLDERS IN THE DATABASE
          // eslint-disable-next-line
  const handleSaveFile = async (formData) => {
    const { fileName, category, selectedFolder, contents } = formData;
    console.log(fileName, '\n', category, '\n', selectedFolder, '\n', contents);

    try {
        if (!currentUser) {
            console.error('User not logged in or user data is incomplete.');
            console.log(currentUser)
            console.log(currentUserId)
        }

        else {
              // Check if all required fields are filled
            if (!fileName || !category || !selectedFolder || !contents) {
              console.error('Please fill in all required fields.');
              return;
            }

            const fileDetails = {
              fileName,
              category,
              contents,
              createdAt: serverTimestamp(),
              ownerId: currentUserId,
            };

            const fileCollectionRef = collection(firestore, 'Folder', selectedFolder, 'Files');
            const queryRef = query(fileCollectionRef, where('fileName', '==', fileName));
            const checkFile = await getDocs(queryRef)

            if (checkFile.size > 0) {
                console.error('Folder with the same name already exists.');
            }
            else {
              try {
                    // eslint-disable-next-line
                const newFileRef = await addDoc(collection(firestore, 'Folder', selectedFolder, 'Files'), fileDetails);
                // console.log(currentUserId)
                setFileOptions((prevFiles) => [...prevFiles, { name: fileName, value: fileName }]);
                // // eslint-disable-next-line
                updateFileOptions = prevFiles => [...prevFiles, { name: fileName, value: fileName }];

                closeModal();
              }
                    
              catch (err) {

              }
            }
        }
        
    } catch (err) {
        console.error("Error adding document: ", err);
    }
  }







    //   USEEFFECT TO CALL AND RETREIVE FOLDERS FROM DATABASE
  useEffect(() => {
      if (currentUser) {
          fetchFolders();

          // console.log(currentUser)
      }
      // eslint-disable-next-line
  }, [currentUser]);





  return (
    <div className={`flex w-full h-screen relative items-start font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar openModal={openModal} />

        <Outlet />

        <CustomModal isOpen={isModalOpen} onClose={closeModal} initialRef={initialRef} modalConfig={addFileModalConfig} updateFolderOptions={updateFolderOptions} onSubmit={handleSaveFile} />
      
    </div>
  )
}

export default Home