import React from 'react';
import styles from '../theme/css/StoryCard.module.css';

const StoryCard = ({ image, title }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="news" className="img-fluid w-100" />
      <div className={styles.textOverlay}>
        <p className="mb-0">{title}</p>
      </div>
    </div>
  );
};

export default StoryCard;
