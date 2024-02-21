import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  const [files, setFiles] = useState([]);
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
                          setCurrentUser(loggedUser);
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
  const fetchFolders = useCallback(async () => {
    const folderCollection = collection(firestore, 'Folder');

    try {

        if (!currentUser) {
            console.error('User not logged in or user data is incomplete.');
        }
        else {
            const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));
            const folders = retrievedFolders.docs.map((folderDoc) => (
                { name: folderDoc.data().folderName, value: folderDoc.data().folderName }
            ));
            setFolderOptions(folders);
        }
    } catch (error) {
          console.error("Error fetching folders: ", error);
    }
  }, [currentUser, currentUserId]);

  useEffect(() => {
      fetchFolders();
  }, [fetchFolders]);








  const fetchFiles = async (folderName) => {
    const filesCollection = collection(firestore, 'Folder', folderName, 'Files');
    const retrievedFiles = await getDocs(filesCollection);

    const files = retrievedFiles.docs.map((fileDoc) => ({
        id: fileDoc.id,
        name: fileDoc.data().fileName,
        contents: fileDoc.data().contents,
    }));

    return files;
  };
  






      //   SAVING FILES TO THEIR RESPECTIVE FOLDERS IN THE DATABASE
  const handleSaveFile = async (formData) => {
    const { fileName, category, selectedFolder, contents } = formData;

    try {
        if (!currentUser) {
            console.error('User not logged in or user data is incomplete.');
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

                const updatedFiles = await fetchFiles(selectedFolder);

                setFiles(updatedFiles);
                // // eslint-disable-next-line
                updateFileOptions(prevFiles => [...prevFiles, { name: fileName, value: fileName }]);

                closeModal();
              }
                    
              catch (err) {

              }
            }
        }
        
    } catch (err) {
        console.error("Error adding document: ", err);
    }
  };


  // useEffect(() => {
  //   handleSaveFile();
  // })







    //   USEEFFECT TO CALL AND RETREIVE FOLDERS FROM DATABASE
  





  return (
    <div className={`flex w-full h-screen items-start justify-start overflow-y-hidden`}>
      {/* <Navigation /> */}
        <Sidebar openModal={openModal} />

        <Outlet />

        <CustomModal isOpen={isModalOpen} onClose={closeModal} initialRef={initialRef} modalConfig={addFileModalConfig} updateFolderOptions={updateFolderOptions} updateFileOptions={updateFileOptions} onSubmit={handleSaveFile} />
      
    </div>
  )
}

export default Home