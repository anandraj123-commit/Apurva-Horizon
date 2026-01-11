import React from 'react';
import styles from './css/CategoryCard.module.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CategoryCard = ({ category, title, imageUrl, articles }) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.category}>{category} <MdOutlineKeyboardArrowRight className={styles.arrowIcon}/></h4>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.articleList}>
        {articles.map((article, idx) => (
          <li key={idx}>{article}
          <hr/></li>
          
        ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
