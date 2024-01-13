import React, { useState } from 'react'
import '../index.css'
import Image from '../assets/Bullet journal-pana.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Toast from './Toast';
import { firestore, auth, FacebookUser, GoogleUser } from '../Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc, where } from 'firebase/firestore';


const SignupForm = () => {
  const [emailSent, setEmailSent] = useState(false);

    //   SETTING UP NAVIGATION //
  const history = useNavigate();

    //   PASSWORD VISIBILITY TOGGLE //
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };


    //   DEFAULT VALUES OF FORM DATA //
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });


    //   HANDLING VALUE CHANGE IN THE INPUT FIELDS //
  const handleInputChange = (value, fieldName) => {
    setFormData({
    ...formData,
    [fieldName]: value,
    });

    // console.log(setFormData);
  };







  
    //   SIGNUP WITH GOOGLE //
  const googleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, GoogleUser);
      const user = result.user;

      await storeUserData(user, 'Google');

      // showToastMessage('Google sign-up successful', 'success');
    }
    catch (err) {
      showToastMessage(`User with same details already exists. Login to proceed`, 'warning');
    }
  };








    //   SIGNUP WITH FACEBOOK //
  const facebookSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, FacebookUser);
      const user = result.user;

      await storeUserData(user, 'Facebook');
    }
    catch (err) {
      showToastMessage(`User with same details already exists. Login to proceed`, 'warning');
    }
  }








    //   SAVING USER INFO FROM GOOGLE/FACEBOOK TO DATABASE //
  const storeUserData = async (user, provider) => {

    try {
      const userDocRef = doc(firestore, 'User', user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData;

        // SIGNING USER UP
      if (!userDoc.exists()) {

          // CHECK IF EMAIL IS ALREADY REGISTERED
        const emailExists = await checkIfEmailExists(user.email);

        if (emailExists) {
          showToastMessage(`User with the email ${user.email} already exists`, 'warning');
          return;
        }


        if (provider === 'Google' || provider === 'Facebook') {
          userData = {
            username: getFirstName(user.displayName),
            email: user.email,
          }
        }
  
        await setDoc(userDocRef, userData);

        if (provider !== 'Google' && provider !== 'Facebook') {
          await sendEmailVerification(user);
          setEmailSent(true);
          showToastMessage('Email verification sent. Please check your inbox.', 'success');
        }

        setTimeout(() => {
            //   ROUTING BACK TO LOGIN PAGE
            history('/welcome');
        }, 1500);
  
        showToastMessage(`${provider} Sign Up Successful`, 'success');
      }

        // SIGNING USER UIN
      else if (userDoc.exists()) {
        setTimeout(() => {
            //   ROUTING BACK TO LOGIN PAGE
            history('/welcome');
        }, 1500);
  
        showToastMessage(`Sign In Successful`, 'success');
      }

      else {
        showToastMessage(`User with the same ${provider} details already exists`, 'warning');
      }

      
    }
    catch (err) {
          showToastMessage('Sign Up failed', 'error');
    }
  };








    //    GETTING FIRSTNAME AS USERNAME FROM GOOGLE AUTH //
  const getFirstName = (fullName) => {
    const nameParts = fullName.split(' ');
    return nameParts[0];
  };









    //   SAVING/SIGNING UP NEW USER //
  const handleSave = async (e) => {
    e.preventDefault();

    //   PASSWORD VALIDATION
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    }

    
    if (!validatePassword(formData.password)) {
        showToastMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
        'warning');
    }

    //   EMAIL VALIDATION
    const validateEmail = (email) => {
      // eslint-disable-next-line
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    };


    if (!validateEmail(formData.email)) {
        showToastMessage('Invalid emaii address', 'error');
    }
    // console.log('FormData:', formData);




      // CHECK IF EMAIL IS ALREADY REGISTERED
    const emailExists = await checkIfEmailExists(formData.email);

    if (emailExists) {
      showToastMessage(`User with the email ${formData.email} already exists`, 'warning');
      return;
    }




    //   GETTING USER DATA FROM FORM AND SENDING TO FIREBASE STORAGE
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const userId = userCredential.user.uid;

        const userDocRef = doc(firestore, `User/${userId}`);

        await setDoc(userDocRef, {
            username: formData.username,
            email: formData.email,
        });

        setTimeout(() => {
            //   RESETTING THE FORM
            setFormData ({
                username: '',
                email: '',
                password: '',
            });


            //   ROUTING BACK TO LOGIN PAGE
            history('/login');
        }, 3500);

        showToastMessage('Sign Up Successful', 'success');

        await sendEmailVerification(user);

        setEmailSent(true);
        showToastMessage('Email verification sent. Please check your inbox.', 'success');
    }
    catch(err) {
        if (err.message.includes('auth/email-already-in-use')) {
            showToastMessage('User with the same email already exists', 'warning');
            setFormData ({
              username: '',
              email: '',
              password: '',
          });
        }
        else {
            showToastMessage('Sign Up failed', 'error');
            setFormData ({
              username: '',
              email: '',
              password: '',
            });
            // showToastMessage(err.message, 'error');
            // console.log(err.message);
        }
    }
  };
 






  const checkIfEmailExists = async (email) => {
    const querySnapshot = await getDocs(collection(firestore, 'User'), where('email', '==', email));
    return !querySnapshot.empty;
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
    <div className='flex flex-row items-center justify-between w-full h-screen'>
        <div className='w-full md:w-full lg:w-[55%] h-full flex items-center justify-center'>

          <div className="rounded-xl bg-blue-100 xl:w-[65%] lg:w-[80%] md:w-[70%] sm:w-[65%] w-[90%] h-auto py-5 px-3 gap-2 flex flex-col font-['Lato'] items-center">
            <div className='flex items-center flex-col w-[95%] md:w-[80%] text-center p-2 gap-1.5 xl:gap-3.5'>
              <h4 className='text-lg md:text-xl lg:text-2xl font-semibold'>Start Your Journey,</h4>
              <h4 className='text-lg md:text-xl font-medium'>Capture Moments, Stay Organized!</h4>
              <p className='text-sm md:text-base lg:text-lg font-extralight'>Welcome aboard! Let's begin your adventure of recording memories and staying organized. Enter your details to create your account.</p>
              {
                emailSent && (
                    <p className='text-xs text-green-600 md:text-base text-left md:text-center'>A password reset email has been sent to your mail.</p>
                )
              }
            </div>

            <form onSubmit={handleSave} className='w-[95%] md:w-[80%] mt-2 flex flex-col justify-between gap-4'>
              <label htmlFor="Username" className="relative block rounded-lg border w-full focus-within:border-white outline-none">
                <input type="text" id="Username" onChange={(event) => handleInputChange(event.target.value, 'username')} className="peer border-none bg-blue-50 w-full focus:bg-blue-100 placeholder-transparent py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base focus:border-transparent focus:outline-none rounded-lg focus:ring-0" placeholder="Username"/>
                <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-transparent top-0 -translate-y-1/2 p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Username</span>
              </label>

              <label htmlFor="Email" className="relative block rounded-lg border w-full focus-within:border-white outline-none">
                <input type="email" id="Email" onChange={(event) => handleInputChange(event.target.value, 'email')} className="peer border-none bg-blue-50 w-full focus:bg-blue-100 placeholder-transparent py-2 md:py-1.5 lg:py-1 px-2 xl:py-2 xl:px-3.5 text-sm md:text-sm lg:text-base focus:border-transparent focus:outline-none rounded-lg focus:ring-0" placeholder="Email"/>
                <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-transparent top-0 -translate-y-1/2 p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email</span>
              </label>

              <label htmlFor="Password" className="relative inline-flex rounded-lg border w-full bg-blue-50 peer-focus:bg-blue-100 focus-within:border-white outline-none">
                <div className='flex flex-row items-center w-full bg-blue-50 peer-focus:bg-blue-100 rounded-lg'>
                  <input type={passwordVisible ? "text" : "password"} id="Password" onChange={(event) => handleInputChange(event.target.value, 'password')} className="peer border-none bg-inherit bg-blue-50 focus:bg-blue-100 w-full h-full placeholder-transparent py-2 md:py-1.5 lg:py-1.5 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base focus:border-transparent focus:outline-none rounded-l-lg focus:ring-0" placeholder="Password"/>
                  <div className='w-auto h-full secure bg-blue-50 peer-focus:bg-blue-100 rounded-r-lg flex items-center py-2 md:py-1.5 lg:py-1 px-2 xl:px-3 xl:py-2.5'>
                    {passwordVisible ? (
                      <AiOutlineEyeInvisible className="cursor-pointer w-5 h-5 xl:w-6 xl:h-6"  onClick={togglePasswordVisibility} />
                    ) : (
                      <AiOutlineEye className="cursor-pointer w-5 h-5 xl:w-6 xl:h-6"  onClick={togglePasswordVisibility} />
                    )}
                  </div>
                  <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-transparent top-0 -translate-y-1/2 p-0.5 text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Password</span>
                </div>
              </label>

              <button type="submit" className='text-blue-400 px-2 py-2 rounded-xl w-[70%] mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300  hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >Sign Up</button>
              
            </form>

            
            <div className="my-5 border-b text-center w-[80%] border-gray-300 relative flex items-center justify-center">
              <div className="absolute pointer-events-none font-semibold bg-blue-100 backdrop-blur-sm top-0 leading-none px-2 inline-block tracking-wide transform -translate-y-1/2 mx-auto text-xs md:text-sm text-blue-500">Or Sign Up with</div>
            </div>
            
            <div className='flex flex-wrap items-center justify-between w-[40%]'>
                <button type="submit" onClick={googleSignUp} className='text-red-500 px-5 py-2 rounded-xl w-auto mx-auto bg-white shadow-neutral-200 border-neutral-50 shadow-md transition duration-300 hover:backdrop-blur-3xl hover:bg-blue-400 hover:text-white hover:shadow-2xl hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >
                    <IoLogoGoogleplus />
                </button>
                <button type="submit" onClick={facebookSignUp} className='text-blue-400 px-5 py-2 rounded-xl w-auto mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300 hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >
                    <FaFacebookF />
                </button>
            </div>

            <p className='text-blue-500 my-2 text-xs md:text-sm '>Already have an account? <Link to='/login' className='underline cursor-pointer'>Sign in</Link></p>
          </div>
        </div>



        <div className='w-[45%] md:hidden h-full hidden lg:flex items-center justify-center'>
            <img src={Image} alt="" className='object-cover space-x-4 w-[80%] xl:w-[90%]' loading='lazy' />
        </div>

        <Toast showToast={showToastMessage} />
    </div>
  )
}

export default SignupForm