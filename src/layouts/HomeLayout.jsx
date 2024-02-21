import React, { useRef, useState, useEffect, /* useCallback */ } from 'react'
import { CiSearch } from "react-icons/ci";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { MdAdd } from "react-icons/md";
import { PiSmileyDuotone } from "react-icons/pi";
import CustomModal from "../components/CustomModal";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { firestore, auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const HomeLayout = ({ updateFolderOptions }) => {
    // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [folderOptions, setFolderOptions] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [files, setFiles] = useState([]);
    // eslint-disable-next-line
    const [folderFiles, setFolderFiles] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const initialRef = useRef();
  

        //   OPENING ADD FOLDER MODAL
    const openModal = () => {
      console.log("What's on your mind?");
      setIsModalOpen(true);
    }
  

        //   CLOSING ADD FOLDER MODAL
    const closeModal = () => {
      setIsModalOpen(false);
    }


        //   HANDLING/FETCHING SELECTED FOLDER
    const handleFieldChange = (fieldName, selectedValue) => {
        // console.log(selectedValue);
        setSelectedFolder(selectedValue);
    };


    useEffect(() => {
        // console.log(selectedFolder);
      }, [selectedFolder]);


    const updateFileOptions = (newFiles) => {
        setFiles(newFiles);
      };



        //   ADD FOLDER MODAL CALL
    const addFolderModalConfig = {
        title: 'Add Folder',
        formFields: [
          { label: 'Folder Name', placeholder: 'Enter folder name', type: 'input', fieldName: 'folderName' },
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
                            // console.log(loggedUser)
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





        //   SAVING FOLDERS TO DATABASE
    const handleSaveFolder = async (formData) => {
        const { folderName } = formData;
        // console.log(folderName);

        try {
            if (!currentUser) {
                console.error('User not logged in or user data is incomplete.');
                // console.log(currentUser)
                // console.log(currentUserId)
            }

            else {
                const folderCollectionRef = collection(firestore, 'Folder');
                const queryRef = query(folderCollectionRef, where('folderName', '==', folderName));
                const checkFolder = await getDocs(queryRef)

                if (checkFolder.size > 0) {
                    console.error('Folder with the same name already exists.');
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

                    closeModal();
                }
            }
            
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    };








        //   FETCHING FOLDERS FROM DATABASE
    useEffect(() => {
        const fetchFolders = async () => {
            const folderCollection = collection(firestore, 'Folder');
        
            try {
        
                if (!currentUser) {
                    console.error('User not logged in or user data is incomplete.');
                    // console.log(currentUser)
                    // console.log(currentUserId)
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
        };

        fetchFolders();
    }, [currentUser, currentUserId]);
    









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
    
      
    
            //   FETCHING FOLDER FILES FROM DATABASE
    useEffect(() => {
        const fetchFoldersAndFiles = async () => {
            const folderCollection = collection(firestore, 'Folder');
        
            try {
                if (!currentUser) {
                    console.error('User not logged in or user data is incomplete.');
                    // console.log(currentUser);
                    // console.log(currentUserId);
                } else {
                    const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));
        
                    const foldersData = await Promise.all(
                        retrievedFolders.docs.map(async (folderDoc) => {
                            const folderData = folderDoc.data();
                            const folderName = folderData.folderName;
        
                            // Retrieve files from the "Files" collection under the current folder
                            const files = await fetchFiles(folderName);
        
                            return {
                                folder: { name: folderName, value: folderName },
                                files: files,
                            };
                        })
                    );
        
                    setFolderOptions(foldersData.map((data) => data.folder));
                    setFolderFiles(foldersData.flatMap((data) => data.files));
                }
            } catch (error) {
                console.error("Error fetching folders: ", error);
            }
          };

        fetchFoldersAndFiles();
    }, [currentUser, currentUserId]);
    








    
    

            //   FETCHING ALL FILES FROM DATABASE
    useEffect(() => {
        const fetchAllFiles = async () => {
            const folderCollection = collection(firestore, 'Folder');
        
            try {
                if (!currentUser) {
                    console.error('User not logged in or user data is incomplete.');
                    // console.log(currentUser);
                    // console.log(currentUserId);
                } else {
                    const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));
                    const allFiles = [];
        
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
                }
            } catch (error) {
                console.error("Error fetching all files: ", error);
            }
        };
       
        fetchAllFiles();
    }, [currentUser, currentUserId]);
    




    




  return (
    <div className='flex-1 h-screen lg:h-full flex-grow flex flex-col md:flex-row gap-2 md:gap-0 w-full items-start'>
        <aside className="h-auto md:h-screen sticky flex-grow flex flex-col left-0 items-center justify-center md:justify-start md:items-start w-full md:w-[25%] xl:w-[20%] md:border-r md:border-r-neutral-200 shadow-md py-3 px-2 gap-2">
            <button className="flex items-center w-[95%] mx-auto text-sm 2xl:text-base hover:bg-blue-300 cursor-pointer group py-2 px-1.5 rounded-lg hover:text-white gap-2" onClick={openModal}>
                <MdAdd size='20' className="p-0.5 border border-neutral-400 rounded-md group-hover:border-white group-hover:shadow-md" />
                New Folder
                {/* <button className="p-1 ">New Folder</button> */}
            </button>

            <ul className="hidden md:grid grid-cols-1 items-center w-[95%] mx-auto text-sm 2xl:text-base font-medium overflow-y-auto max-h-[60%] group py-2 px-1.5 rounded-lg gap-2">
                Folders
                {folderOptions.map((folder, folderIndex) => (
                    <li key={folderIndex} onClick={() => handleFieldChange('folderName', folder.value)} className="flex items-center w-[95%] mx-auto text-sm 2xl:text-md bg-neutral-300 text-gray-700 font-semibold cursor-pointer group py-2 px-1.5 rounded-lg gap-2">{folder.name}</li>
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

        <div className="w-full h-screen flex flex-col items-start gap-1">
            <div className="w-full sticky flex border-b border-b-neutral-200 px-2 py-2 items-start justify-center">
                <Box className='w-full md:w-[60%] lg:w-[45%] xl:w-[70%]'>
                    <InputGroup className='w-[90%] lg:w-[80%] mx-auto'>
                        <InputLeftElement py='0.5'>
                        <CiSearch />
                        </InputLeftElement>
                        <Input type='text' placeholder='Search Memomaze' className='text-xs md:text-sm 2xl:text-base focus-within:border-neutral-200' focusBorderColor='#d3d3d3' _placeholder={{ fontSize: 'sm', fontWeight: 'thin' }} />
                    </InputGroup>
                </Box>
            </div>
            

            <Box w='full' display='flex' alignContent='center' justifyContent='center' className='h-full' overflowY='auto'>
                <Box className="grid grid-cols-2 lg:grid-cols-5 gap-y-4 gap-x-3 items-start justify-center py-2 mb-10 px-3 w-full h-full" overscroll='auto' overflowX='auto'>
                    {files.map((file) => (
                        <React.Fragment key={file.id}>
                            <div className='group max-w-[200px] col-span-1 lg:col-auto items-start max-h-[350px]'>
                                <div className='flex flex-col pt-3 pb-0.5 px-2 w-full h-full rounded-md border dark:border-white border-neutral-300 shadow-lg gap-2'>
                                    <h5 className='font-semibold text-[16px]'>{file.name}</h5>
                                    <div className='w-full items-center'>
                                        <p className='font-normal text-neutral-600 dark:text-neutral-200 text-[13px] lg:text-[15px] break-all'>{file.contents}</p>    
                                    </div>
                                    <div className='flex w-full h-auto py-0.5 px-0.5 items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <p>Oba</p>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                    {files.length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                            <PiSmileyDuotone size='150' opacity='60%' />
                            <p className=" font-medium tracking-wide">Create a Task/Note to get started.</p>
                        </div>
                    )}
                </Box>
            </Box>
        </div>

        <CustomModal isOpen={isModalOpen} onClose={closeModal} initialRef={initialRef} modalConfig={addFolderModalConfig} onSubmit={handleSaveFolder} updateFileOptions={updateFileOptions} />
    </div>
  )
}

export default HomeLayout