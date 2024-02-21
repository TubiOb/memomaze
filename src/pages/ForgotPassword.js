import React, { useState } from 'react'
import { auth } from '../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'sonner'
import Toast from '../components/Toast';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

    //   SETTING UP NAVIGATION //
  const history = useNavigate();

    //   DEFAULT VALUES OF FORM DATA //
  const [formData, setFormData] = useState({
    email: '',
  });

     //   HANDLING VALUE CHANGE IN THE INPUT FIELDS //
  const handleInputChange = (value, fieldName) => {
    setFormData({
    ...formData,
    [fieldName]: value,
    });
  };



    //    FORGOT PASSWORD RESET BY MAIL FUNCTIONALITY
   const sendEmail = async (e) => {
    e.preventDefault();
    try {
        await sendPasswordResetEmail(auth, formData.email);

        setEmailSent(true);

        showToastMessage('Password Reset Email Sent', 'success');
        setTimeout(() => {
            setFormData({
                email: '',
            });
            console.log('Password Reset Email Sent')
  
            history('/login');
        }, 1500);
    }
    catch (err) {
        showToastMessage('Invalid Signin Parameter', 'error');
        console.log('Invalid Signin Parameter');
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
    <div className='flex items-center justify-center w-full h-screen'>
        <div className="rounded-xl bg-blue-100 dark:bg-white dark:text-blue-400 w-[90%] lg:w-[45%] 2xl:w-[60%] h-auto py-9 px-3 gap-4 flex flex-col font-['Lato'] items-center">
            <div className='flex flex-col w-[95%] md:w-[80%] p-2 gap-1'>
              <h4 className='text-lg md:text-xl lg:text-2xl font-semibold text-left md:text-center'>Forgot your password?</h4>
              <p className='text-xs md:text-base text-left md:text-center'>Enter the email associated with your account, and we'll send an email with instructions to reset your password.</p>
              {
                emailSent && (
                    <p className='text-xs text-green-600 md:text-base text-left md:text-center'>A password reset email has been sent to your mail.</p>
                )
              }
            </div>
            <form onSubmit={sendEmail} className='w-[95%] md:w-[80%] dark:text-blue-700 mt-2 flex flex-col justify-between gap-6'>
                <label htmlFor="Email" className="relative block rounded-lg border w-full focus-within:border-white outline-none">
                    <input type="email" id="Email" className="peer border-none bg-blue-50 w-full h-full focus:bg-blue-100 placeholder-transparent py-2 md:py-1.5 lg:py-1.5 px-2 xl:px-3.5 xl:py-2.5 text-xs md:text-sm lg:text-base focus:border-transparent focus:outline-none rounded-lg focus:ring-0 required:border-red-500" placeholder="Email" value={formData.email} onChange={(event) => handleInputChange(event.target.value, 'email')}/>
                    <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-transparent top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700 dark:text-blue-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email</span>
                </label>

                <button type="submit" className='text-blue-400 px-3.5 py-2 rounded-xl w-auto mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300  hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >Send Instructions</button>
            </form>

            <p className='text-blue-500 my-3 text-xs md:text-sm '>Back to <Link to='/login' className='underline cursor-pointer'>Login</Link></p>
        </div>

        <Toast showToast={showToastMessage} />
    </div>
  )
}

export default ForgotPassword