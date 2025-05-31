import React from 'react';
import styles from '../theme/css/TrendingTopics.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useFetchData from '../../../hooks/useFetchData';



const TrendingTopics = ({items}) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (direction === 'left') {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };


  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Trending Topics</span>
      <div className={styles.scrollWrapper}>
        <div className={styles.scrollContainer} ref={scrollRef}>
          {items.map((topic, index) => (
            <span key={index} className={styles.topicChip}>{topic?.subcategory}</span>
          ))}
        </div>
        <div className={styles.scrollButtons}>
          <button onClick={() => scroll('left')} className={styles.arrowBtn}><ChevronLeft size={18} /></button>
          <button onClick={() => scroll('right')} className={styles.arrowBtn}><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
