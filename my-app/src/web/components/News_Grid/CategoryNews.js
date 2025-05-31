import React, { useState } from 'react';
import styles from '../theme/css/CategoryNews.module.css';
import CategoryNewsCard from './CategoryNewsCard';



const CategoryNews= ({ categories, items }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleTabClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.tab} ${activeCategory === category ? styles.tabActive : ''}`}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        {items[activeCategory]?.map((item) => (
          <CategoryNewsCard
            key={item.id}
            image={item.image}
            category={item.category}
            title={item.title}
            description={item.description}
            author={item.author}
            publishedAt={item.publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;