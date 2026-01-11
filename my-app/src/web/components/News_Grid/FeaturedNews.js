import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import styles from '../theme/css/FeaturedNews.module.css';



const FeaturedNews = ({
  image,
  title,
  description,
  author,
  publishedAt,
  readTime,
  isBreaking = false,
}) => {
  return (
    <div className={styles.hero}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.overlay}>
        {isBreaking && <div className={styles.breaking}>Breaking News</div>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <User size={16} className={styles.icon} />
            <span>{author}</span>
          </div>
          <div className={styles.metaItem}>
            <Calendar size={16} className={styles.icon} />
            <span>{publishedAt}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={16} className={styles.icon} />
            <span>{readTime}</span>
          </div>
        </div>
        <a href="#" className={styles.readMore}>
          Read Full Story <ArrowRight size={16} className={styles.arrowIcon} />
        </a>
      </div>
    </div>
  );
};

export default FeaturedNews;