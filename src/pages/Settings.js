import React, { useState, useEffect } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdSaveAs } from "react-icons/md";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
                            const usersImage = userInfo.userImage;
                            setCurrentUser(loggedUser);
                            setUserEmail(usersMail);
                            setUserImage(usersImage);

                            if (userInfo.fullName) setFullName(userInfo.fullName);
                            if (userInfo.phoneNumber) setPhoneNumber(userInfo.phoneNumber);
                            if (userInfo.bio) setBio(userInfo.bio);
                        }
                    }
                }
                catch (err) {
                    // showToastMessage('No user found', 'error');
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
                });
            }
            else {
                await setDoc(userDocRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    bio: bio,
                });
            }

            setIsEditing(false);
            setIsEditingBio(false);
        }
        catch (err) {

        }
    }







  return (
    <div className='w-full h-screen px-2.5 py-3 flex flex-1'>
        <div className='flex flex-col overflow-y-auto trick items-center gap-3 dark:bg-white dark:shadow-white/50 shadow-black/50 bg-neutral-950/80 w-full lg:w-[70%] mx-auto h-full rounded-lg shadow-md px-4 lg:px-7 py-9 dark:text-neutral-900 text-white'>
            <div className='flex flex-col lg:flex-row w-full rounded-lg items-center justify-start p-2 gap-2'>
                <div className='w-full lg:w-[25%] items-center justify-center flex p-1'>
                    <img src={userImage} alt='' className='rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover' />    
                </div>
                <div className='flex flex-col w-full lg:w-[50%] gap-1 p-1 items-center lg:items-start justify-between'>
                    <button type="button" className='px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm lg:text-sm'>Upload new photo</button>
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
                <div className='flex flex-col lg:flex-row w-full lg:w-[90%] items-stretch justify-between self-start p-1 gap-10'>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Username</h4>
                        <p>{currentUser}</p>
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Full Name</h4>
                        <p>{}</p>
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Email</h4>
                        <p>{userEmail}</p>
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Phone</h4>
                        <p></p>
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

                <p className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium leading-4 tracking-wide'>
                    
                </p>
            </div>
        </div>
    </div>
  )
}

export default Settings