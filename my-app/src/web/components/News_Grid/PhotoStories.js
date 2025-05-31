import React, { useState } from 'react';
import StoryCard from './StoryCard';
import styles from '../theme/css/PhotoStories.module.css';

const PhotoStories = ({ stories }) => {

  const storiesShuffled = shuffleArray(stories);
  const storiesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(storiesShuffled.length / storiesPerPage);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Get current stories to display
  const currentStories = storiesShuffled.slice(
    currentPage * storiesPerPage,
    (currentPage + 1) * storiesPerPage
  );

  return (
    <div className={styles.photoStoriesSection}>
      <h2 className={styles.sectionTitle}>Photostories</h2>

      <div className={styles.storiesGrid}>
        {currentStories.map(story => (
          <StoryCard
            key={story._id}
            id={story._id}
            title={story.title}
            image={"https://picsum.photos/200/300"}
            category={story.type}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentPage === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentPage(index)}
            ></span>
          ))}
        </div>

        <div className={styles.navigationControls}>
          <button className={styles.navButton} onClick={handlePrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <button className={styles.navButton} onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoStories;
