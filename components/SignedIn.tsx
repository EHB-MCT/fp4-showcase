import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { logoutUser } from '../lib/auth'

const SignedIn = () => {
    const {user} = useContext(UserContext); 
  return (
    <div className="w-1/2 flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5">
        <h1 className="text-center text-white text-2xl">Welcome {user?.email}</h1>      
        <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
        <div className="flex flex-col gap-2 items-start w-full"></div>
        <button 
                    type="button"
                    onClick={() => logoutUser()}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        >
        Log out
        </button>
    </div>
  )
}

export default SignedIn