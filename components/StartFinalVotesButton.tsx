import React,{useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const StartFinalVotesButton = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        // Handle button click logic here
     router.push(`/awards/upload`);
      };
  return (
    <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={handleButtonClick}
  >
    Add Award
  </button>
  )
}

export default StartFinalVotesButton