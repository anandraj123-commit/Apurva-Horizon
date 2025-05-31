import React from 'react';
import { Calendar, User } from 'lucide-react';
import styles from '../theme/css/CategoryNewsCard.module.css';



const CategoryNewsCard= ({
  image,
  category,
  title,
  description,
  author,
  publishedAt,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <div className={styles.author}>
            <img src={author.avatar} alt={author.name} className={styles.authorImg} />
            <span>{author.name}</span>
          </div>
          <div className={styles.timestamp}>
            <Calendar size={14} className={styles.icon} />
            <span>{publishedAt}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CategoryNewsCard;