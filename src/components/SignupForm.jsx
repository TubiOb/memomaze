import React, { useState } from 'react'
import '../index.css'
import Image from '../assets/Bullet journal-pana.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Toast from './Toast';
import { firestore, auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';


const SignupForm = () => {

    //   SETTING UP NAVIGATION
  const history = useNavigate();


    //   PASSWORD VISIBILITY TOGGLE
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
          setPasswordVisible(!passwordVisible);
  };


    //   DEFAULT VALUES OF FORM DATA
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });


    //   HANDLING VALUE CHANGE IN THE INPUT FIELDS 
  const handleInputChange = (value, fieldName) => {
    setFormData({
    ...formData,
    [fieldName]: value,
    });
  };



    //   CONFIGURING TOAST TO TOAST MESSAGE
  const showToastMessage = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    duration: 3000,
                    preventDefault: true,
                });
                break;
            case 'error':
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    duration: 3000,
                    preventDefault: true,
                });
                break;
            case 'warning':
                toast.warning(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    duration: 3000,
                    preventDefault: true,
                });
                break;
            default:
                break;
        }
    };




    //   SAVING/SIGNING UP NEW USER
  const handleSave = async (e) => {
    e.preventDefault();



    //   PASSWORD VALIDATION
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.twst(formData.password)) {
        showToastMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number',
        'error');
        return;
    }


    //   EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showToastMessage('Invalid emaii address', 'error');
        return;
    }

    //   GETTING USER DATA FROM TABLE AND SENDING TO FIREBASE STORAGE
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

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
            })


            //   ROUTING BACK TO LOGIN PAGE
            history('/login');
        }, 3500);

        showToastMessage('Sign Up Successful', 'success')
    }
    catch(err) {
        if (err.message.includes('already in use')) {
            showToastMessage('User already exists', 'warning');
        }
        else {
            showToastMessage('Sign Up failed', 'error');
        }
    }
  };
 





   

  return (
    <div className='flex flex-row items-center justify-between w-full h-screen'>
        <div className='w-full md:w-full lg:w-[55%] h-full flex items-center justify-center'>

          <div className="rounded-xl bg-blue-100 xl:w-[60%] lg:w-[80%] md:w-[70%] sm:w-[65%] w-[90%] h-auto py-9 px-3 gap-4 flex flex-col font-['Lato'] items-center">
            <div className='flex items-center flex-col w-[95%] md:w-[80%] text-center p-2 gap-1.5 xl:gap-3'>
              <h4 className='text-lg md:text-xl lg:text-2xl font-semibold'>Start Your Journey,</h4>
              <h4 className='text-lg md:text-xl lg:text-2xl font-normal'>Capture Moments, Stay Organized!</h4>
              <p className='text-sm md:text-base lg:text-lg'>Welcome aboard! Let's begin your adventure of recording memories and staying organized. Enter your details to create your account.</p>
            </div>

            <form onSubmit={handleSave} className='w-[95%] md:w-[80%] mt-2 flex flex-col justify-between gap-6'>
              <label htmlFor="Username" className="relative block rounded-lg border w-full focus-within:border-white outline-none">
                <input type="text" id="Username" onInputChange={(value) => handleInputChange(value, 'username')} className="peer border-none bg-blue-50 w-full focus:bg-blue-100 placeholder-transparent py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-xs md:text-sm lg:text-base xl:text-xl focus:border-transparent focus:outline-none rounded-lg focus:ring-0" placeholder="Username"/>
                <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-blue-100 top-0 -translate-y-1/2 p-0.5 text-xs md:twxt-sm lg:text-base xl:text-lg text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Username</span>
              </label>

              <label htmlFor="Email" className="relative block rounded-lg border w-full focus-within:border-white outline-none">
                <input type="email" id="Email" onInputChange={(value) => handleInputChange(value, 'email')} className="peer border-none bg-blue-50 w-full focus:bg-blue-100 placeholder-transparent py-2 md:py-1.5 lg:py-1 px-2 xl:py-2 xl:px-3.5 text-xs md:text-sm lg:text-base focus:border-transparent focus:outline-none rounded-lg focus:ring-0" placeholder="Email"/>
                <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-blue-100 top-0 -translate-y-1/2 p-0.5 text-xs md:twxt-sm lg:text-base xl:text-lg text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email</span>
              </label>

              <label htmlFor="Password" className="relative inline-flex rounded-lg border w-full bg-blue-50 peer-focus:bg-blue-100 focus-within:border-white outline-none">
                <div className='flex flex-row items-center w-full bg-blue-50 peer-focus:bg-blue-100 rounded-lg'>
                  <input type={passwordVisible ? "text" : "password"} id="Password" onInputChange={(value) => handleInputChange(value, 'password')} className="peer border-none bg-inherit bg-blue-50 focus:bg-blue-100 w-full h-full placeholder-transparent py-2 md:py-1.5 lg:py-1.5 xl:py-2 px-2 xl:px-3.5 text-xs md:twxt-sm lg:text-base xl:text-lg focus:border-transparent focus:outline-none rounded-l-lg focus:ring-0" placeholder="Password"/>
                  <div className='w-auto h-full secure bg-blue-50 peer-focus:bg-blue-100 rounded-r-lg flex items-center py-2 md:py-1.5 lg:py-1 px-2 xl:px-3 xl:py-2.5'>
                    {passwordVisible ? (
                      <AiOutlineEye className="cursor-pointer w-4 h-4 xl:w-5 xl:h-5"  onClick={togglePasswordVisibility} />
                    ) : (
                      <AiOutlineEyeInvisible className="cursor-pointer w-4 h-4 xl:w-5 xl:h-5"  onClick={togglePasswordVisibility} />
                    )}
                  </div>
                  <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-blue-100 top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Password</span>
                </div>
              </label>

              <button type="submit" className='text-blue-400 px-2 py-2 rounded-xl w-[70%] mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300  hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >Sign Up</button>
              
            </form>

            
            <div class="my-3 border-b text-center w-[80%] border-gray-300 relative flex items-center justify-center">
              <div className="absolute pointer-events-none font-semibold bg-blue-100 backdrop-blur-sm top-0 leading-none px-2 inline-block tracking-wide transform -translate-y-1/2 mx-auto text-xs md:text-sm text-blue-500">Or Sign Up with</div>
            </div>
            
            <div className='flex flex-wrap items-center justify-between w-[80%]'>
                <button type="submit" className='text-red-500 px-5 py-2 rounded-xl w-auto mx-auto bg-white shadow-neutral-200 border-neutral-50 shadow-md transition duration-300 hover:backdrop-blur-3xl hover:bg-blue-400 hover:text-white hover:shadow-2xl hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >
                    <IoLogoGoogleplus />
                </button>
                <button type="submit" className='px-5 py-2 rounded-xl w-auto mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300 hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >
                    <FaApple className='' />
                </button>
                <button type="submit" className='text-blue-400 px-5 py-2 rounded-xl w-auto mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300 hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >
                    <FaFacebookF />
                </button>
            </div>

            <p className='text-blue-500 mt-6 mb-3 text-xs md:text-sm '>Already have an account? <Link to='/login' className='underline cursor-pointer'>Sign in</Link></p>
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