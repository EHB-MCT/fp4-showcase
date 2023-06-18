import React,{useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AwardCard = ({award}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/awards/${award.id}`);
  };

  return (
    <div className="bg-slate-500 w-full h-full"  onClick={handleCardClick}>
      <img src={award.cardImageUrl} alt="" className="src" />
        <h2>{award.title}</h2>
        <p>{award.description}</p>
    </div>
  )
}

export default AwardCard