import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/AwardCard.module.css";
import ButtonPink from "./ButtonPink";

const AwardCard = ({ award }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/awards/${award.id}`);
  };

  return (
    <div
      className={styles.awardCardContainer}
      style={{ backgroundImage: `url(${award.cardImageUrl})` }}
    >
      <div>
        <h3>{award.title}</h3>
        <p>{award.description}</p>
      </div>
      <ButtonPink title="Browse" color="Pink" onClick={handleCardClick} />
    </div>
  );
};

export default AwardCard;
