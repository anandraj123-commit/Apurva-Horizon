import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../theme/css/EditorsPicks.module.css';

const EditorsPicks = ({ articles }) => {

  const articlesShuffled =  shuffleArray(articles);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <section className={styles.editorsPicksSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Editor's Picks</h2>
      <div className={styles.categoryHeader}>
        <Link to={`/category/${"anything".toLowerCase()}`} className={styles.viewAllLink}>
          View All
        </Link>
      </div>
        <div className={styles.sectionDivider}></div>
      </div>
      <div className={styles.articleGrid}>
        {articlesShuffled.map((article) => (
          <article key={article.id} className={styles.articleCard}>
            <Link to={`/article/${article.id}`} className={styles.articleLink}>
              <div className={styles.imageContainer}>
                <img 
                  src={article.imageUrl || "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg"} 
                  alt={article.title} 
                  className={styles.articleImage}
                />
                <div className={styles.categoryBadge}>{article.type}</div>
              </div>
              
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleSummary}>{article.shortDescription}</p>
                <div className={styles.articleMeta}>
                  <span className={styles.articleDate}>{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(article.DisplayTime).getTime()) / (1000 * 60))}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EditorsPicks;