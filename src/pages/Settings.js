import React, { useState, useEffect } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdSaveAs } from "react-icons/md";
import { VscEdit } from "react-icons/vsc";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth, storage } from '../Firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'sonner'
import Toast from '../components/Toast';


const Settings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userImage, setUserImage] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [imageFile, setImageFile] = useState(null);



        //   FETCHING USER'S PROFILE IMAGE
        // eslint-disable-next-line
    const fetchUserImage = async () => {
        try {
            if (userImage) {
                const imageURL = await getDownloadURL(ref(storage, userImage));
                return imageURL;
            } else {
                return null;
            }
        }
        catch (err) {
            showToastMessage('Error fteching image', 'error');
            return null;
        }
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
                            const usersMail = userInfo.email;
                            setCurrentUser(loggedUser);
                            setUserEmail(usersMail);

                            if (userInfo.fullName) setFullName(userInfo.fullName);
                            if (userInfo.phoneNumber) setPhoneNumber(userInfo.phoneNumber);
                            if (userInfo.bio) setBio(userInfo.bio);
                            if (userInfo.username) setUsername(userInfo.username);
                            if (userInfo.userImage) {
                                const imageURL = await getDownloadURL(ref(storage, userInfo.userImage));
                                setUserImage(imageURL);
                            }
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
                setUserEmail('')
                setUserImage('')
                setFullName('')
                setPhoneNumber('')
                setBio('')
            }
        });
        return () => loggedInUser();
    }, [currentUserId]);







    const updateUserInfo = async () => {
        const userDocRef = doc(firestore, 'User', currentUserId);
        try {
            const docData = await getDoc(userDocRef);

            if (docData.exists()) {
                await updateDoc(userDocRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    bio: bio,
                    username: username,
                });

                showToastMessage('Profile updated', 'success');
            }
            else {
                await setDoc(userDocRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    bio: bio,
                });

                showToastMessage('Profile updated', 'success');
            }

            setIsEditing(false);
            setIsEditingBio(false);
        }
        catch (err) {
            showToastMessage('Profile cannot be updated', 'success');
        }
    };






    const updateUserImage = async () => {
        const storageRef = ref(storage, `User/${currentUserId}/${userImage}`);

        try {
            if (imageFile) {
                await uploadBytes(storageRef, imageFile);

                const imageURL = await getDownloadURL(storageRef);

                console.log("Image URL:", imageURL);

                const userDocRef = doc(firestore, 'User', currentUserId);
                await updateDoc(userDocRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    bio: bio,
                    username: username,
                    userImage: imageURL,
                });
            }
            else {
                const userDocRef = doc(firestore, 'User', currentUserId);
                await updateDoc(userDocRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    bio: bio,
                    username: username
                });
            }

            showToastMessage('Profile image updated', 'success');
        }
        catch (err) {
            showToastMessage('Profile image cannot be updated', 'error');
        }
    };





    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setUserImage(URL.createObjectURL(file));
            updateUserImage();
        }
    }





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
    <div className='w-full h-screen px-2.5 py-3 flex flex-1'>
        <div className='flex flex-col overflow-y-auto trick items-center gap-3 dark:bg-white dark:shadow-white/50 shadow-black/50 bg-neutral-950/80 w-full lg:w-[70%] mx-auto h-full rounded-lg shadow-md px-4 lg:px-7 py-9 dark:text-neutral-900 text-white'>
            <div className='flex flex-col lg:flex-row w-full rounded-lg items-center justify-start p-2 gap-2'>
                <div className='w-full lg:w-[25%] items-center justify-center flex p-1 relative'>
                    <img src={userImage} alt={currentUser} className='rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover ring-2 ring-white dark:ring-neutral-500/80' />
                    
                    <label htmlFor="upload" className="cursor-pointer absolute px-1 py-1 text-sm lg:text-base -top-0 lg:-top-0 rounded-lg dark:bg-white bg-neutral-700 z-50 shadow-sm right-24 lg:right-16">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="upload" />
                        <VscEdit />
                    </label>
                </div>
                <div className='flex flex-col w-full lg:w-[50%] gap-1 p-1 items-center lg:items-start justify-between'>
                    {/* <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="upload" />
                    <label htmlFor="upload" className="cursor-pointer px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm lg:text-sm" onClick={updateUserImage}>Upload new photo</label> */}
                    <button type="file" className='px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm lg:text-sm' onClick={updateUserImage}>Upload</button>
                    <div className='flex flex-col items-center lg:items-start'>
                        <p className='text-sm lg:text-sm'>At least 800x800 px recommended</p>
                        <p className='text-sm lg:text-sm'>JPG or PNG is allowed</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full rounded-lg items-center justify-start p-2 gap-3 border border-neutral-500'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <h4 className='text-base font-semibold'>Personal Info</h4>
                    { isEditing ? (
                        <button type="" className='flex items-center gap-1 py-1 px-2 shadow-md border border-neutral-200 dark:border-neutral-500/70 hover:shadow-lg hover:text-green-500 hover:font-medium rounded-lg text-sm lg:text-sm' onClick={updateUserInfo}>
                            <MdSaveAs />
                            Save
                        </button>
                    ) : (
                        <button type="" className='flex items-center gap-1 py-1 px-2 shadow-md border border-neutral-200 dark:border-neutral-500/70 hover:shadow-lg dark:hover:text-black/75 hover:text-white hover:font-medium rounded-lg text-sm lg:text-sm' onClick={() => setIsEditing(true)}>
                            <CiEdit />
                            Edit
                        </button>
                    ) }
                </div>
                <div className='flex flex-col lg:flex-row w-full lg:w-[90%] items-stretch justify-between self-start p-1 gap-3 lg:gap-10'>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Username</h4>
                        { isEditing ? (
                            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className=" border-none bg-blue-50 w-full focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-1 px-2 xl:px-3.5 text-sm md:text-sm lg:text-sm font-normal focus:border-blue-900 focus:outline-none rounded-lg focus:ring-1" />
                        ) : (
                            <p className='text-sm lg:text-sm'>{currentUser}</p>
                        )}
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Full Name</h4>
                        { isEditing ? (
                            <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} className=" border-none bg-blue-50 w-full focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-1 px-2 xl:px-3.5 text-sm md:text-sm lg:text-sm font-normal focus:border-blue-900 focus:outline-none rounded-lg focus:ring-1" />
                        ) : (
                            <p className='text-sm lg:text-sm'>{fullName}</p>
                        )}
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Email</h4>
                        <p className='text-sm lg:text-sm'>{userEmail}</p>
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Phone</h4>
                        { isEditing ? (
                            <input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className=" border-none bg-blue-50 w-full focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-1 px-2 xl:px-3.5 text-sm md:text-sm lg:text-sm font-normal focus:border-blue-900 focus:outline-none rounded-lg focus:ring-1" />
                        ) : (
                            <p className='text-sm lg:text-sm'>{phoneNumber}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full rounded-lg items-center justify-start p-2 gap-3 border border-neutral-500'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <h4 className='text-base font-semibold'>Bio</h4>
                    { isEditingBio ? (
                        <button type="" className='flex items-center gap-1 py-1 px-2 shadow-md border border-neutral-200 dark:border-neutral-500/70 hover:shadow-lg hover:text-green-500 hover:font-medium rounded-lg text-sm lg:text-sm' onClick={updateUserInfo}>
                            <MdSaveAs />
                            Save
                        </button>
                    ) : (
                        <button type="" className='flex items-center gap-1 py-1 px-2 shadow-md border border-neutral-200 dark:border-neutral-500/70 hover:shadow-lg dark:hover:text-black/75 hover:text-white hover:font-medium rounded-lg text-sm lg:text-sm' onClick={() => setIsEditingBio(true)}>
                            <CiEdit />
                            Edit
                        </button>
                    ) }
                </div>
                
                <div className='flex w-full h-auto items-center'>
                    { isEditingBio ? (
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='border-none bg-blue-50 w-full min-h-40 resize-none focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-1 px-2 xl:px-3.5 text-sm md:text-sm lg:text-sm font-normal focus:border-blue-900 focus:outline-none rounded-lg focus:ring-1'></textarea>
                    ) : (
                        <p className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium leading-4 tracking-wide'>
                            {bio}
                        </p>
                    )}
                </div>
                
            </div>
        </div>

        <Toast showToast={showToastMessage} />
    </div>
  )
}

export default Settings