import React from 'react';
import { Clock } from 'lucide-react';
import styles from '../theme/css/ArticleCard.module.css';

const ArticleCard= ({ 
  article, 
  size = 'medium', 
  horizontal = false 
}) => {
  
  const { 
    title, 
    summary, 
    category, 
    author, 
    publishedAt, 
    imageUrl, 
    isFeatured,
    isBreaking,
    readTime 
  } = article;
  
  return (
    <article className={`
      ${styles.card} 
      ${styles[size]} 
      ${horizontal ? styles.horizontal : ''}
    `}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
        {isBreaking && <span className={styles.breaking}>Breaking</span>}
        {!isBreaking && isFeatured && <span className={styles.featured}>Featured</span>}
      </div>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`${styles.date}`}>
            {publishedAt}
          </span>
        </div>
        
        <h3 className={`${styles.title}`}>{title}</h3>
        
        {size !== 'small' && (
          <p className={`${styles.summary}`}>{summary}</p>
        )}
        
        <div className={styles.footer}>
          <span className={`${styles.author}`}>
            By {author}
          </span>
          
          {readTime && (
            <span className={`${styles.readTime}`}>
              <Clock className={styles.readTimeIcon} />
              {readTime} min read
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;