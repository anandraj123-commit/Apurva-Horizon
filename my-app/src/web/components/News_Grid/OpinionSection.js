import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../theme/css/OpinionSection.module.css';

const OpinionSection = ({ opinions }) => {
  return (
    <section className={styles.opinionSection}>
      <h2 className={styles.sectionTitle}>Opinion</h2>
      <div className={styles.opinionList}>
        {opinions.map((opinion) => (
          <article key={opinion.id} className={styles.opinionItem}>
            <h3 className={styles.opinionTitle}>
              <Link to={`/article/${opinion.id}`}>
                {opinion.title}
              </Link>
            </h3>
            <p className={styles.excerpt}>{opinion.excerpt}</p>
            <div className={styles.opinionMeta}>
              <span className={styles.author}>By {opinion.author}</span>
              <span className={styles.authorRole}>{opinion.authorRole}</span>
              <span className={styles.date}>{opinion.date}</span>
              <span className={styles.readTime}>{opinion.readTime} read</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OpinionSection;