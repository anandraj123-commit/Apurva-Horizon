// components/NewsCard.jsx
import React from "react";
import styles from "./css/NewsCard.module.css";

const NewsCard = ({ img, title }) => {
  return (
    <div className={styles.card}>
      <img src={img} alt={title} className={styles.image} />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default NewsCard;
