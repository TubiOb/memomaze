import React, { useRef, useState, useEffect } from 'react'
import CustomModal from "../components/CustomModal";
import { CiSearch } from "react-icons/ci";
import { GoArchive } from "react-icons/go";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { addDoc, updateDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { firestore, auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'sonner'
import Toast from '../components/Toast';

const TasksLayout = ({ updateFolderOptions, updateFileOptions }) => {
    const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
    const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
    const initialRef = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [folderOptions, setFolderOptions] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [files, setFiles] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');

    const [isEditFileModalOpen, setIsEditFileModalOpen] = useState(false);
    const [editFileData, setEditFileData] = useState(null);
    const [initialEditData, setInitialEditData] = useState(null);
    

        //   OPENING ADD FOLDER MODAL
    const openAddFolderModal = () => {
        setIsAddFolderModalOpen(true);
    };
    
        //   CLOSING ADD FOLDER MODAL
    const closeAddFolderModal = () => {
        setIsAddFolderModalOpen(false);
    };

          //   OPENING ADD FILE MODAL
    const openAddFileModal = () => {
        setIsAddFileModalOpen(true);
    };
    
        //   CLOSING ADD FILE MODAL
    const closeAddFileModal = () => {
        setIsAddFileModalOpen(false);
    };


        //   HANDLING/FETCHING SELECTED FOLDER
    const handleFieldChange = (fieldName, selectedValue) => {
        // console.log(selectedValue);
        setSelectedFolder(selectedValue);
    };


    useEffect(() => {
        if (selectedFolder) {
            fetchFiles(selectedFolder).then((updatedFiles) => {
                setFiles(updatedFiles);
            });
        }
        // console.log(selectedFolder);
      }, [selectedFolder]);




      const openEditFileModal = (fileDetails) => {
        setEditFileData({
            id: fileDetails.id,
            fileName: fileDetails.name,
            category: 'Tasks',
            selectedFolder: fileDetails.folderName,
            contents: fileDetails.contents,
        });

        setInitialEditData({
            id: fileDetails.id,
            fileName: fileDetails.name,
            category: 'Tasks',
            selectedFolder: fileDetails.folderName,
            contents: fileDetails.contents,
        });
        
        setIsEditFileModalOpen(true);
    };



    useEffect(() => {
        // console.log('Initial Edit Data:', initialEditData);
        // console.log('Edit Data:', editFileData);
    }, [initialEditData]);





        //   ADD FOLDER MODAL CALL
    const addFolderModalConfig = {
        title: 'Add Folder',
        formFields: [
          { label: 'Folder Name', placeholder: 'Enter folder name', type: 'input', fieldName: 'folderName' },
        ],
    };



          //   ADD FILE MODAL CALL
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





        // Edit File Modal Configuration
    const editFileModalConfig = {
        title: 'Edit File',
        formFields: [
            { label: 'File Name', placeholder: 'Enter file name', type: 'input', id: 'file name', fieldName: 'fileName' },
            { label: 'Contents', placeholder: 'Write your thoughts here...', type: 'textarea', id: 'contents', fieldName: 'contents' },
        ],
    };






        //   GETTING CURRENT USER
    useEffect(() => {
        const loggedInUser = onAuthStateChanged(auth, async (user) => {
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
                        }
                    }
                }
                catch (err) {
                    showToastMessage('No user found', 'error');
                }
                
            }
            else {
                setCurrentUser('')
                setCurrentUserId('')
            }
        });
        return () => loggedInUser();
    }, [currentUserId]);






        //   SAVING FOLDERS TO DATABASE
    const handleSaveFolder = async (formData) => {
          const { folderName } = formData;
  
          try {
              if (!currentUser) {
              }
  
              else {
                  const folderCollectionRef = collection(firestore, 'Folder');
                  const queryRef = query(folderCollectionRef, where('folderName', '==', folderName));
                  const checkFolder = await getDocs(queryRef)
  
                  if (checkFolder.size > 0) {
                    showToastMessage('Folder with the same name already exists.', 'warning');
                  }
                  else {
                          // eslint-disable-next-line
                      const newFolderRef = await addDoc(folderCollectionRef, {
                          folderName,
                          createdAt: serverTimestamp(),
                          ownerId: currentUserId,
                      });
                          //   UPDATE THE FOLDER OPTIONS AND FILES IMMEDIATELY AFTER SAVING
                      setFolderOptions(prevFolders => [...prevFolders, { name: folderName, value: folderName }]);
                      updateFolderOptions = prevFolders => [...prevFolders, { name: folderName, value: folderName }];
  
                          //   FETCH AND UPDATE FILES FOR THE NEWLY ADDED FOLDER
                      const newFiles = await fetchFiles(folderName);
                      updateFileOptions(newFiles);
  
                      closeAddFolderModal();
                  }
              }
              
          } catch (err) {
            showToastMessage('Error adding folders', 'error');
          }
    };
  
  
  
  
  
        //   FETCHING FOLDERS FROM DATABASE
    useEffect(() => {
        const fetchFolders = async () => {
            const folderCollection = collection(firestore, 'Folder');
        
            try {
        
                if (!currentUser) {
                }
                else {
                    const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));
                    const folders = retrievedFolders.docs.map((folderDoc) => (
                        { name: folderDoc.data().folderName, value: folderDoc.data().folderName }
                    ));
                    setFolderOptions(folders);
                }
            } catch (error) {
                showToastMessage('Error fetching folders', 'error');
            }
        };

        fetchFolders();
    }, [currentUser, currentUserId]);
  
  
  
  
  
  
    const fetchFiles = async (folderName = '', category = 'Tasks', fileId = '') => {
      const filesCollection = collection(firestore, 'Folder', folderName, 'Files');
      const orderQuery = query(filesCollection, where('category', '==', category), orderBy('createdAt', 'desc'));
      const retrievedFiles = await getDocs(orderQuery, where('id', '==', fileId));
  
      const files = retrievedFiles.docs.map((fileDoc) => ({
          id: fileDoc.id,
          fileName: fileDoc.data().fileName,
          contents: fileDoc.data().contents,
          category: fileDoc.data().category,
          folderName: folderName,
      }));
  
      return files;
    };
      
        
      

        //   FETCHING FOLDER FILES FROM DATABASE
    const fetchFoldersAndFiles = async (selectedFolder = null) => {
        const folderCollection = collection(firestore, 'Folder');
    
        try {
            const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));

            const foldersData = await Promise.all(
                retrievedFolders.docs.map(async (folderDoc) => {
                    const folderData = folderDoc.data();
                    const folderName = folderData.folderName;

                    // Retrieve files from the "Files" collection under the current folder
                    if (selectedFolder && folderName === selectedFolder) {
                        const files = await fetchFiles(folderName);
                        // setFolderFiles(files);
                        setFiles(files);
                    }

                    return {
                        folder: { name: folderName, value: folderName },
                        files: files,
                    };
                })
            );

            setFolderOptions(foldersData.map((data) => data.folder));
        } catch (error) {
            showToastMessage('Error fetching folders and Tasks', 'error');
        }
    };
  
      
      
  
        //   FETCHING ALL FILES FROM DATABASE
    const fetchAllFiles = async () => {
        const folderCollection = collection(firestore, 'Folder');
    
        try {
            const allFiles = [];
            const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));

            for (const folderDoc of retrievedFolders.docs) {
                const folderData = folderDoc.data();
                const folderName = folderData.folderName;

                // Retrieve files from the "Files" collection under the current folder
                const files = await fetchFiles(folderName);

                // Add the files to the allFiles array
                allFiles.push(...files);
            }
                    // Set the state with all files from all folders
            setFiles(allFiles);
        } catch (error) {
            showToastMessage('Error fetching Tasks', 'error');
        }
    };
  




    useEffect(() => {
        if (selectedFolder) {
            fetchFoldersAndFiles(selectedFolder);
        }
        else {
            fetchAllFiles();
        }
        // eslint-disable-next-line
    }, [currentUser, currentUserId, selectedFolder]);
  
  
  

  
        //   SAVING FILES TO DATABASE
    const handleSaveFile = async (formData) => {
        const { fileName, category, selectedFolder, contents } = formData;
    
        try {
                // Check if all required fields are filled
            if (!fileName || !category || !selectedFolder || !contents) {
                showToastMessage('Please fill in all required fields', 'warning');
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
                showToastMessage('Task with the same name already exists', 'warning');
            }
            else {
                try {
                    // eslint-disable-next-line
                const newFileRef = await addDoc(collection(firestore, 'Folder', selectedFolder, 'Files'), fileDetails);

                const updatedFiles = await fetchFiles(selectedFolder);

                setFiles(updatedFiles);
                // eslint-disable-next-line
                updateFileOptions(prevFiles => [...prevFiles, { name: fileName, value: fileName }]);
                showToastMessage('File saved', 'success');
                }
                    
                catch (err) {
                showToastMessage('Error fetching Tasks', 'error');
                }

                closeAddFileModal();
            }
            
        } catch (err) {
            showToastMessage("Error adding Task", 'error');
        }
    };





    const handleFileClick = async (fileId) => {
        try {
          // Fetch the selected/clicked file details based on the file ID
          const fileDetails = files.find((file) => file.id === fileId);
      
          openEditFileModal(fileDetails);
        } catch (error) {
            showToastMessage('Error fetching Task details', 'error');
        }
    };






    const handleSaveEditedFile = async (formData) => {
        const { contents } = formData;
        const fileName = editFileData.fileName;
        const category = 'Tasks';
        const folderName = editFileData.selectedFolder;
        const fileId = editFileData.id;

        try {
            const fileDetails = {
                fileName,
                category,
                contents: contents || '',
                updatedAt: serverTimestamp(),
                ownerId: currentUserId,
            };

            const fileCollectionRef = collection(firestore, 'Folder', folderName, 'Files');
            const fileDocRef = editFileData.id ? doc(fileCollectionRef, fileId) : null;
            if (fileDocRef) {
                const fileDoc = await getDoc(fileDocRef);
                
                if (fileDoc.exists()) {
                    // Document exists, proceed with the update
                    await updateDoc(fileDocRef, fileDetails);
                    showToastMessage('Task updated successfully', 'success');

                    // Fetch and update the files for the edited file's folder
                    const updatedFiles = await fetchFiles(folderName);
                    setFiles(updatedFiles);

                    // Close the edit file modal
                    setIsEditFileModalOpen(false);
                } else {
                    // Document does not exist, handle accordingly (create new document or show an error)
                    showToastMessage('Task does not exist', 'error');
                }
            } else {
                showToastMessage('Invalid Task ID', 'error');
            }
        } catch (err) {
            showToastMessage('Error saving edited Task', 'error');
        }
    };







    const handleArchiveFile = async (fileId, folderName) => {
        try {
            const fileRef = doc(firestore, 'Folder', folderName, 'Files', fileId);
            await deleteDoc(fileRef);

            const fileDetails = files.find((file) => file.id === fileId);

            const archiveFileRef = collection(firestore, 'Archive Files');
            await addDoc(archiveFileRef, fileDetails);

            showToastMessage('File archived', 'success');

            const updatedFiles = files.filter((file) => file.id !== fileId);
            setFiles(updatedFiles);

        }
        catch (err) {
            showToastMessage('Error archiving file', 'error');
            console.log(err.message);
        }
    };





    const handleDeleteFile = async (fileId, folderName) => {
        try {
            const fileRef = doc(firestore, 'Folder', folderName, 'Files', fileId);
            await deleteDoc(fileRef);

            showToastMessage('File deleted', 'success');

            const updatedFiles = files.filter((file) => file.id !== fileId);
            setFiles(updatedFiles);
            
        }
        catch (err) {
            showToastMessage('Error deleting file', 'error');
        }
    };






    const handleCompletedFile = async (fileId, folderName) => {
        try {
            const fileRef = doc(firestore, 'Folder', folderName, 'Files', fileId);
            await deleteDoc(fileRef);

            const fileDetails = files.find((file) => file.id === fileId);

            const completedFileRef = collection(firestore, 'Completed');
            await addDoc(completedFileRef, fileDetails);

            showToastMessage('Completed', 'success');

            const updatedFiles = files.filter((file) => file.id !== fileId);
            setFiles(updatedFiles);
        }
        catch (err) {
            showToastMessage('Error completing item', 'error');
            console.log(err.message);
        }
    };







        //   CONFIGURING TOAST TO TOAST MESSAGE
    const showToastMessage = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message, {
                    position: 'top-right',
                    duration: 3000,
                    preventDefault: true,
                });
                break;
            case 'error':
                toast.error(message, {
                    position: 'top-right',
                    duration: 3000,
                    preventDefault: true,
                });
                break;
            case 'warning':
                toast.warning(message, {
                    position: 'top-right',
                    duration: 3000,
                    preventDefault: true,
                });
                break;
            default:
                break;
        }
    };




    



  return (
    <div className='flex-1 h-screen lg:h-full flex-grow flex flex-col md:flex-row gap-2 md:gap-0 w-full items-start'>
      <aside className="h-auto md:h-screen sticky flex-grow flex flex-col left-0 items-center justify-center md:justify-start md:items-start w-full md:max-w-[25%] xl:max-w-[20%] md:border-r md:border-r-neutral-200 shadow-md py-3 px-2 gap-2">
            <button className="flex items-center w-[95%] mx-auto text-sm 2xl:text-base hover:bg-neutral-300 dark:hover:bg-white cursor-pointer group py-2 px-1.5 rounded-lg hover:text-gray-700 gap-2" onClick={openAddFolderModal}>
                <MdAdd size='20' className="p-0.5 border border-neutral-400 rounded-md group-hover:border-white group-hover:shadow-md" />
                New Folder
            </button>

            <ul className="hidden md:grid grid-cols-1 items-center w-[95%] mx-auto text-sm 2xl:text-base font-medium overflow-y-auto max-h-[60%] group py-2 px-1.5 rounded-lg gap-2">
                Folders
                {folderOptions.map((folder, folderIndex) => (
                    <li key={folderIndex} onClick={() => handleFieldChange('folderName', folder.value)} className="flex items-center w-[95%] mx-auto text-sm 2xl:text-md bg-neutral-300 dark:bg-white text-gray-700 font-semibold cursor-pointer group py-2 px-1.5 rounded-lg gap-2 hover:shadow-md hover:shadow-black/20 dark:hover:shadow-white/40">{folder.name}</li>
                ))}
                
            </ul>

            <div className="flex md:hidden items-center w-[95%] mx-auto text-sm 2xl:text-base font-medium cursor-none group py-2 px-1.5 rounded-lg gap-2">
                <label className="text-sm 2xl:text-base font-medium text-gray-500 mb-1 w-full">Folders
                    <select id="foldersSelect" value='' onChange={(e) => handleFieldChange('folderName', e.target.value)} required className="peer border-none block bg-neutral-500 w-full text-white focus:bg-neutral-500 py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base font-normal focus:border-transparent focus:outline-none rounded-lg focus:ring-0">
                        <option value="" disabled>Select a folder</option>
                        {folderOptions.map((folder, folderIndex) => (
                            <option key={folderIndex} value={folder.name}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
      </aside>

      <div className="w-full md:w-[75%] lg:w-[80%] flex-1 min-h-[77%] md:max-h-[100%] flex flex-col items-start gap-1">
        <div className="w-full sticky flex border-b border-b-neutral-200 px-2 py-2 items-start justify-center">
            <Box className='w-full md:w-[60%] lg:w-[45%] xl:w-[70%]'>
                <InputGroup className='w-[90%] lg:w-[80%] mx-auto'>
                    <InputLeftElement py='0.5'>
                    <CiSearch />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search Memomaze' className='text-xs md:text-sm 2xl:text-base focus-within:border-neutral-200' focusBorderColor='#d3d3d3' _placeholder={{ fontSize: 'sm', fontWeight: 'thin' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </InputGroup>
            </Box>
        </div>
            

        <Box w='full' maxW='100%' display='flex' alignContent='center' justifyContent='center' overflowY='auto' overflowX='hidden'  className='h-screen sticky flex-grow' >
            <Box className="trick columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 mx-auto gap-3 items-start flex-wrap py-2 px-3 pb-10 flex-grow space-y-2" overflowY='auto' overflowX='hidden'>
                {files.length !== 0 && files.filter((file) => file.fileName.toLowerCase().includes(searchQuery.toLowerCase())).map((file) => (
                    <React.Fragment key={file.id}>
                        <div className='group relative cursor-pointer items-start max-w-[145px] md:max-w-[200px] max-h-[350px] break-inside-avoid rounded-md shadow-md shadow-neutral-600/40 dark:shadow-white/10 hover:shadow-neutral-600/80 dark:hover:shadow-white/40 border border-neutral-50/25 overflow-hidden' >
                            <div className='flex flex-col inset-0 pt-3 pb-0.5 px-2 w-full max-h-[300px] gap-2 overflow-hidden mb-6' onClick={() => handleFileClick(file.id)}>
                                <h5 className='font-semibold text-[16px]'>{file.fileName}</h5>
                                <div className='w-full items-center'>
                                    <p className='font-normal text-neutral-600 dark:text-neutral-200 text-[13px] lg:text-[15px] break-word'>{file.contents}</p>    
                                </div>
                                
                            </div>
                            <div className='flex absolute w-full h-auto py-1 px-2 items-center justify-between bottom-0 lg:-bottom-52 lg:group-hover:bottom-0 z-50 lg:transition-opacity'>
                                <GoArchive size='18' className='hover:cursor-pointer hover:font-semibold dark:text-slate-50/60 dark:hover:text-yellow-500 hover:text-yellow-500 text-black/60' onClick={() => handleArchiveFile(file.id, file.folderName)} />
                                <MdDeleteOutline size='20' className='hover:cursor-pointer hover:font-semibold dark:text-slate-50/60 hover:text-red-800 dark:hover:text-red-500 text-black/60' onClick={() => handleDeleteFile(file.id, file.folderName)} />
                                <IoCheckmarkDoneCircle size='20' className='hover:cursor-pointer hover:font-semibold dark:text-slate-50/60 hover:text-green-900 dark:hover:text-green-500 text-black/60' onClick={() => handleCompletedFile(file.id, file.folderName)} />
                            </div>
                        </div>
                    </React.Fragment>
                ))}
                <button className='flex fixed right-[5%] bottom-[4%] items-center justify-between cursor-pointer px-2 py-2 group rounded-xl shadow-sm bg-neutral-600 dark:bg-white dark:hover:bg-neutral-600 border-neutral-600 gap-1 border border-gray-300/40 hover:bg-white dark:shadow-neutral-200/50 dark:hover:shadow-white/30 text-white dark:hover:text-white dark:text-gray-700 hover:text-gray-700'>
                    <MdAdd size={24} onClick={openAddFileModal} /> 
                </button>
            </Box>
        </Box>
      </div>

      <Toast showToast={showToastMessage} />

      <CustomModal isOpen={isAddFolderModalOpen} onClose={closeAddFolderModal} initialRef={initialRef} modalConfig={addFolderModalConfig} onSubmit={handleSaveFolder} />

      <CustomModal isOpen={isAddFileModalOpen} onClose={closeAddFileModal} initialRef={initialRef} modalConfig={addFileModalConfig} onSubmit={handleSaveFile} />

      <CustomModal isOpen={isEditFileModalOpen} onClose={() => setIsEditFileModalOpen(false)} initialRef={initialRef} modalConfig={editFileModalConfig} onSubmit={handleSaveEditedFile} initialEditData={initialEditData} />
    </div>
  )
}

export default TasksLayout