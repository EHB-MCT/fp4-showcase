import Link from 'next/link'
import { useContext, useState } from 'react'
import { UserContext } from '../lib/context'
import { registerUser,loginUser } from '../lib/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';




const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register'>('register');

    const onSubmit = async (e) => {
        e.preventDefault();
        let user = null;
        if(mode === "login"){
            user = await loginUser(email, password)
        }else{
            user = await registerUser(email, password)
        }
        
        if (!user.code && !user.message ) {
            //Redirect to home page or profile
            router.push("/");
            
        }else{
            console.log("failed")
            console.log(user)
            toast.error("Failed to register user");
        }
    }


    return (
        <>
        
            <form 
                onSubmit={onSubmit}
                className="w-1/2 flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5"
            >
                {mode === "register" ? (
                    <h1 className="text-center text-white text-2xl">Register User</h1>
                ) : (
                    <h1 className="text-center text-white text-2xl">Log in</h1>
                )
                    }
                <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
                <div className="flex flex-col gap-2 items-start w-full"></div>
                <label className="text-white" htmlFor="email">
                Email:
                </label>
                <input 
                    type="email" 
                    placeholder="studentname@student.ehb.be" 
                    id="emailInput"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className=" border-gray-800 p-2 w-full rounded-sm bg-gray-700 text-white"
                    required/>
                <label className="text-white" htmlFor="password">
                Password:
                </label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="passwordInput"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className=" border-gray-800 p-2 w-full rounded-sm bg-gray-700 text-white"
                    required/>
                <button type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
                >Submit</button>
                <button 
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 w-full"
                >
                    Switch to {mode === "login" ? "register" : "login"}
                </button>
            </form>

        </>
  )
}

export default LoginForm