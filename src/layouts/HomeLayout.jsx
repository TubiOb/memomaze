import React, { useRef, useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { MdAdd } from "react-icons/md";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import Blank from '../assets/No Item.png'
import { PiSmileyDuotone } from "react-icons/pi";
import CustomModal from "../components/CustomModal";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { firestore, auth } from '../Firebase';

const HomeLayout = () => {
    // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [folderOptions, setFolderOptions] = useState([]);
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
        console.log(selectedValue);
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



        //   SAVING FOLDERS TO DATABASE
    const handleSaveFolder = async (formData) => {
        const { folderName } = formData;
        console.log(folderName);

        const folderCollectionRef = collection(firestore, 'Folder');

        console.log('folderCollectionRef:', folderCollectionRef);
        try {
            if (!currentUser) {
                console.error('User not logged in or user data is incomplete.');
                console.log(currentUser)
                console.log(currentUserId)
            }

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
                console.log(currentUserId)

                closeModal();
            }
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }




        //   FETCHING FOLDERS FROM DATABASE
    const fetchFolders = async () => {
        if (!currentUser) {
            console.error('User not logged in or user data is incomplete.');
            console.log(currentUser)
            console.log(currentUserId)
        }

        const folderCollection = collection(firestore, 'Folder');
        // const usersFolders = query(folderCollection, where('ownerId', '==', currentUser.uid))

        try {
          const retrievedFolders = await getDocs(query(folderCollection, where('ownerId', '==', currentUserId)));
          const folders = retrievedFolders.docs.map((folderDoc) => (
              { name: folderDoc.data().folderName, value: folderDoc.data().folderName }
          ));
          setFolderOptions(folders);
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
    <div className='flex-1 h-full static flex-grow flex flex-col md:flex-row gap-2 md:gap-0 w-full overflow-y-auto items-start'>
        <aside className="h-auto md:h-screen sticky flex-grow flex flex-col bg-white left-0 items-center justify-center md:justify-start md:items-start w-full md:w-[25%] xl:w-[20%] md:border-r md:border-r-neutral-200 shadow-md py-3 px-2 gap-2">
            <button className="flex items-center w-[95%] mx-auto text-sm 2xl:text-base hover:bg-blue-300 cursor-pointer group py-2 px-1.5 rounded-lg hover:text-white gap-2" onClick={openModal}>
                <MdAdd size='20' className="p-0.5 border border-neutral-400 rounded-md group-hover:border-white group-hover:shadow-md" />
                New Folder
                {/* <button className="p-1 ">New Folder</button> */}
            </button>

            <ul className="hidden md:grid grid-cols-1 items-center w-[95%] mx-auto text-sm 2xl:text-base font-medium cursor-none group py-2 px-1.5 rounded-lg gap-2">
                Folders
                {folderOptions.map(folder => (
                    <li key={folder.value} className="flex items-center w-[95%] mx-auto text-sm 2xl:text-md font-normal bg-blue-300 cursor-pointer group py-2 px-1.5 rounded-lg hover:text-white gap-2">{folder.label}</li>
                ))}
                
            </ul>

            <div className="flex md:hidden items-center w-[95%] mx-auto text-sm 2xl:text-base font-medium cursor-none group py-2 px-1.5 rounded-lg gap-2">
                <label className="text-sm 2xl:text-base font-medium text-gray-500 mb-1 w-full">Folders
                    <select id="foldersSelect" value='' onChange={(e) => handleFieldChange('folderName', e.target.value)} required className="peer border-none block bg-blue-50 w-full focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base font-normal focus:border-transparent focus:outline-none rounded-lg focus:ring-0">
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
            

            <Box w='full' display='flex' alignContent='center' justifyContent='center' h='screen'>
                <Tabs variant='soft-rounded' colorScheme='blue' p='1' w='full' align="center" h='full' className="flex-grow" isLazy>
                    <TabList display='flex' alignItems='center' gap={['7', '32']} cursor='pointer'>
                        <Tab>All</Tab>
                        <Tab>Notes</Tab>
                        <Tab>Tasks</Tab>
                    </TabList>
                    <TabPanels h={['79.5vh', '90vh', '85vh', '81.5vh']} w='full' p='1' className="overflow-y-auto" overflowY='auto'>
                        <TabPanel className="flex-grow items-center w-full" h='full' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                                <PiSmileyDuotone size='150' opacity='60%' />
                                <p className=" font-medium tracking-wide">Create a Task/Note to get started.</p>
                             </div>
                        </TabPanel>
                        <TabPanel className="flex-grow items-center w-full" h='full' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                                <PiSmileyDuotone size='150' opacity='60%' />
                                <p className=" font-medium tracking-wide">Create a Note to get started.</p>
                             </div>
                        </TabPanel>
                        <TabPanel className="flex-grow items-center w-full" h='full' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                                <PiSmileyDuotone size='150' opacity='60%' />
                                <p className=" font-medium tracking-wide">Create a Task to get started.</p>
                             </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </div>

        <CustomModal isOpen={isModalOpen} onClose={closeModal} initialRef={initialRef} modalConfig={addFolderModalConfig} onSubmit={handleSaveFolder} />
    </div>
  )
}

export default HomeLayout