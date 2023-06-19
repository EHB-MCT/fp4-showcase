import Link from 'next/link'
import { useContext, useState } from 'react'
import { UserContext } from '../lib/context'
import { registerUser,loginUser } from '../lib/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import ButtonPink from './ButtonPink';
import { motion, AnimatePresence } from "framer-motion";




const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register'>('register');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = null;
        if (mode === 'login') {
          response = await loginUser(email, password);
        } else {
          if (password != repeatPassword){
            return setErrorMessage("passwords do not match.")
          }
          response = await registerUser(email, password);
        }
  
        if (!response?.code && !response?.message) {
          // Redirect to home page or profile
          router.push('/');
        } else {
          setErrorMessage('Failed to register/login user.');
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    const handleButtonClick = () => {
      // Handle button click logic here
   router.push(`/reset`);
    };

    return (
        <>
  <div className='flex flex-col relative'>
            <form 
                onSubmit={onSubmit}
                className="w-2/2 flex flex-col gap-3 pt-5 pl-10 pr-10 pb-4 rounded-md mb-3 mt-5 border-2 border-purple-500"
                >
                {mode === "register" ? (
                    <h1 className="text-center text-white text-2xl">Register</h1>
                ) : (
                    <h1 className="text-center text-white text-2xl">Log in</h1>
                )
                    }
                <hr className="h-px my-0 bg-gray-200 border-0 w-full "></hr>
                <div className="flex flex-col gap-2 items-start w-full"></div>
                <label className="text-white " htmlFor="email">
                Email:
                </label>
                <div style={{ position: 'relative' }}>
  <svg                 width="100%"
                height="50"
                viewBox="0 0 570 50"
                preserveAspectRatio="none">
    <path
      id="Path_1213"
      data-name="Path 1213"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
  <input 
                    type="email" 
                    placeholder="studentname@student.ehb.be" 
                    id="emailInput"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={{ position: 'absolute', top: '1px', width:'80%' , color: 'white'}}
          className="border-none p-2 w-full rounded-sm bg-transparent text-white w-90 mx-4  "
                    required/>
    </div>

                <label className="text-white" htmlFor="password">
                Password:
                </label>
                <div style={{ position: 'relative' }}>
  <svg                 width="100%"
                height="50"
                viewBox="0 0 570 50"
                preserveAspectRatio="none">
    <path
      id="Path_1213"
      data-name="Path 1213"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
  <input 
                    type="password" 
                    placeholder="Password" 
                    id="passwordInput"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{ position: 'absolute', top: '1px', width:'80%' }}
                    className="border-none p-2 w-full rounded-sm bg-transparent text-white mx-4"
                    required/>
    </div>

    {mode === "register" && (
            <>
              <label className="text-white" htmlFor="repeatPassword">
                Repeat Password:
              </label>
              <div style={{ position: 'relative' }}>
                <svg
                  width="100%"
                  height="50"
                  viewBox="0 0 570 50"
                  preserveAspectRatio="none"
                >
                      <path
      id="Path_1213"
      data-name="Path 1213"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
                </svg>
                
                <input
                  type="password"
                  placeholder="Repeat Password"
                  id="repeatPasswordInput"
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  style={{ position: 'absolute', top: '1px', width: '80%' }}
                  className="border-none p-2 w-full rounded-sm bg-transparent text-white mx-4"
                  required
                />
              </div>
              
            </>
          )}
          


                   <ButtonPink title="Submit" color='white' />
                  
<button
  type="button"
  onClick={() => setMode(mode === "login" ? "register" : "login")}
  className="bg-transparent text-white px-4 py-2 rounded-md mt-0 w-full hover:underline"
>

 {mode === "login" ? "Don&apos;t have an account? Sign up" : "Already registered? Sign in"}
</button>





            </form>
            <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="error-message w-2/2 flex flex-col"
            >
              <span className="text-red-500 border-solid border-2 border-red-600 p-4 rounded-sm">
                {errorMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
</div>
        </>
  )
}

export default LoginForm


// {mode === "login" && (<button
//   className='bg-transparant text-gray-500 hover:underline'
//   type='button'
//   onClick={handleButtonClick}>Forgot password? Reset here...</button>)}
