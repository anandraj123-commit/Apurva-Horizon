import { Link } from 'react-router-dom';
import styles from '../theme/css/TopStories.module.css';

const TopStories = ({ stories }) => {
  return (
    <section className={styles.topStories}>
      <h2 className={styles.sectionTitle}>Top Stories</h2>
      <div className={styles.storiesList}>
        {stories.map((story, index) => (
          <Link key={story.id} to={`/article/${story.id}`} className={styles.storyItem}>
            <div className={styles.storyRank}>{index + 1}</div>
            <div className={styles.storyContent}>
              <h3 className={styles.storyTitle}>
                {story.title}
                {story.isExclusive && (
                  <span className={styles.exclusiveBadge}>EXCLUSIVE</span>
                )}
              </h3>
              <div className={styles.storyMeta}>
                <span className={styles.category}>{story.category}</span>
                <span className={styles.readTime}>{story.readTime} read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopStories;