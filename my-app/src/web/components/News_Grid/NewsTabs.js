import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from '../theme/css/NewsTabs.module.css';

export default function NewsTabs({ item1, item2 }) {
  const [activeTab, setActiveTab] = useState('col1');
  const itemList1 = shuffleArray(item1);
  const itemList2 = shuffleArray(item2);

  function shuffleArray(array) {

    // Iterate over the array in reverse order
    for (let i = array.length - 1; i > 0; i--) {

      // Generate Random Index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className={styles.newsBox}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'col1' ? styles.active : ''}`}
          onClick={() => setActiveTab('col1')}
        >
          {itemList1 && itemList1[0]?.subcategory}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'col2' ? styles.active : ''}`}
          onClick={() => setActiveTab('col2')}
        >
          {itemList1 && itemList1[0]?.type}
        </button>
      </div>
      <div className={styles.newsList}>
        {activeTab === 'col1' ? itemList1.map((headline, index) => (
          <Link to={`/${headline?.type}/${headline?.subcategory}/view-page/${headline?._id}`}>
            <div key={index} className={styles.newsItem}>
              <span className={styles.icon}>📰</span>
              <span className={styles.headline}>{headline.title}</span>
            </div>
          </Link>
        )) : itemList2.map((headline, index) => (
          <Link to={`/${headline?.type}/${headline?.subcategory}/view-page/${headline?._id}`}>

            <div key={index} className={styles.newsItem}>
              <span className={styles.icon}>📰</span>
              <span className={styles.headline}>{headline.title}</span>
            </div>
          </Link>
        ))
        }
      </div>
    </div>
  );
}
