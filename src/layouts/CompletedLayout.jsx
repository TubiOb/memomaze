import React, { useRef, useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineUnarchive } from "react-icons/md";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CustomModal from "../components/CustomModal";
import { toast } from 'sonner'
import Toast from '../components/Toast';

const CompletedLayout = () => {
    const initialRef = useRef();
    const [files, setFiles] = useState([]);
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');

    const [isEditFileModalOpen, setIsEditFileModalOpen] = useState(false);
    const [editFileData, setEditFileData] = useState(null);
    const [initialEditData, setInitialEditData] = useState(null);
    
    const [searchQuery, setSearchQuery] = useState('');

    const openEditFileModal = (fileDetails) => {
        setEditFileData({
            id: fileDetails.id,
            fileName: fileDetails.name,
            category: fileDetails.category,
            selectedFolder: fileDetails.folderName,
            contents: fileDetails.contents,
        });

        setInitialEditData({
            id: fileDetails.id,
            fileName: fileDetails.name,
            category: fileDetails.category,
            selectedFolder: fileDetails.folderName,
            contents: fileDetails.contents,
        });
        
        setIsEditFileModalOpen(true);
    };



    useEffect(() => {
        // console.log('Initial Edit Data:', initialEditData);
        // console.log('Edit Data:', editFileData);
    }, [initialEditData]);




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






    const fetchFiles = async () => {
        const archiveCollection = collection(firestore, 'Completed');
        try {
            const retrievedFiles = await getDocs(archiveCollection);

            const files = retrievedFiles.docs
            .filter(fileDoc => fileDoc.data().ownerId === currentUserId)
            .map((fileDoc) => ({
                id: fileDoc.id,
                fileName: fileDoc.data().fileName,
                contents: fileDoc.data().contents,
                category: fileDoc.data().category,
                folderName: fileDoc.data().folderName,
            }));

            setFiles(files);
        }
        catch (err) {

        };
    };




    useEffect(() => {
        fetchFiles();
        // eslint-disable-next-line
    }, []);






    const handleFileClick = async (fileId) => {
        try {
          // Fetch the selected/clicked file details based on the file ID
          const fileDetails = files.find((file) => file.id === fileId);
      
          openEditFileModal(fileDetails);
        } catch (error) {
          showToastMessage('Error fetching file details:', 'error');
        }
    };






    const handleSaveEditedFile = async (formData) => {
        const { contents } = formData;
        const fileName = editFileData.fileName;
        const category = editFileData.category;
        try {
            const fileDetails = {
                fileName,
                category,
                contents: contents || '',
                updatedAt: serverTimestamp(),
                ownerId: currentUserId,
            };

            const fileCollectionRef = collection(firestore, 'Folder', editFileData.selectedFolder, 'Files');
            const fileDocRef = editFileData.id ? doc(fileCollectionRef, editFileData.id) : null;
            if (fileDocRef) {
                const fileDoc = await getDoc(fileDocRef);
                
                if (fileDoc.exists()) {
                    // Document exists, proceed with the update
                    await updateDoc(fileDocRef, fileDetails);
                    showToastMessage('File updated', 'success');

                    // Fetch and update the files for the edited file's folder
                    const updatedFiles = files.filter((file) => file.id !== editFileData.id);
                    setFiles(updatedFiles);

                    // Close the edit file modal
                    setIsEditFileModalOpen(false);
                } else {
                    // Document does not exist, handle accordingly (create new document or show an error)
                    showToastMessage('File does not exist', 'error');
                }
            } else {
                showToastMessage('Invalid file ID', 'error');
            }   
        } catch (err) {
            showToastMessage('Error saving edited file', 'error');
        }
    };






    const handleUncompleteFile = async (fileId, folderName) => {
        try {
            const completedFileRef = doc(firestore, 'Completed', fileId);
            const completedFileDoc = await getDoc(completedFileRef);
            const fileDetails = completedFileDoc.data();

            await deleteDoc(completedFileRef);

            const fileCollectionRef = collection(firestore, 'Folder', folderName, 'Files');
            await addDoc(fileCollectionRef, {
                ...fileDetails,
                createdAt: serverTimestamp(),
            });

            showToastMessage('File restored', 'success');

            const updatedFiles = files.filter((file) => file.id !== fileId);
            setFiles(updatedFiles);
        }
        catch (err) {
            showToastMessage('Error restoring file', 'error');
            console.log(err.message);
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
        <div className="w-full flex-1 min-h-[77%] md:max-h-[100%] flex flex-col items-start gap-1">
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
                            <div className='group relative cursor-pointer items-start max-w-[145px] md:max-w-[200px] max-h-[350px] break-inside-avoid rounded-md shadow-md shadow-neutral-600/40 dark:shadow-white/10 hover:shadow-neutral-600/80 dark:hover:shadow-white/40 border border-neutral-50/25 overflow-hidden'>
                                <div className='flex flex-col inset-0 pt-3 pb-0.5 px-2 w-full max-h-[300px] gap-2 overflow-hidden mb-6' onClick={() => handleFileClick(file.id)}>
                                    <h5 className='font-semibold text-[16px]'>{file.fileName}</h5>
                                    <div className='w-full items-center'>
                                        <p className='font-normal text-neutral-600 dark:text-neutral-200 text-[13px] lg:text-[15px] break-word'>{file.contents}</p>    
                                    </div>
                                    
                                </div>
                                <div className='flex absolute w-full h-auto py-1 px-2 items-center justify-between bottom-0 lg:-bottom-52 lg:group-hover:bottom-0 z-50 lg:transition-opacity'>
                                    <MdOutlineUnarchive size='20' className='hover:cursor-pointer hover:font-semibold dark:text-slate-50/60 dark:hover:text-yellow-500 hover:text-yellow-500 text-black/60' onClick={() => handleArchiveFile(file.id, file.folderName)} />
                                    <MdDeleteOutline size='20' className='hover:cursor-pointer hover:font-semibold dark:text-slate-50/60 hover:text-red-800 dark:hover:text-red-500 text-black/60' onClick={() => handleDeleteFile(file.id, file.folderName)} />
                                    <IoCheckmarkDoneCircle size='20' className='hover:cursor-pointer hover:font-semibold dark:text-slate-50/60 hover:text-green-900 dark:hover:text-green-500 text-black/60' onClick={() => handleUncompleteFile(file.id, file.folderName)} />
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </div>

        <Toast showToast={showToastMessage} />

        <CustomModal isOpen={isEditFileModalOpen} onClose={() => setIsEditFileModalOpen(false)} initialRef={initialRef} modalConfig={editFileModalConfig} onSubmit={handleSaveEditedFile} initialEditData={initialEditData} />
    </div>
  )
}

export default CompletedLayout