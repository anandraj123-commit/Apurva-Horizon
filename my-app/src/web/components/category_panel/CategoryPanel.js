import React from 'react';
import styles from './css/CategoryPanel.module.css';
import CategoryCard from './CategoryCard';

const CategoryPanel = () => {
  return (
    <div className={styles.wrapper}>
      <CategoryCard
        category="Global Business"
        title="Trump keeps finding new ways to terrify Wall Street"
        imageUrl="https://picsum.photos/200/100" // Replace with actual image
        articles={[
          "Beijing warns countries against colluding with US to restrict trade with China",
          "Boeing jet returns to US from China, a victim of Trump’s tariff war",
          "Target rolled back DEI efforts. A boycott ensued – and traffic dropped"
        ]}
      />

      <CategoryCard
        category="Style"
        title="Most striking celebrity looks from Coachella"
        imageUrl="https://picsum.photos/200/100"
        articles={[
          "The Princess of Wales brings back a Millennial trend",
          "Anne Hathaway, Michelle Williams among A-listers at Ralph Lauren show",
          "The latest trend in watches might surprise you",
          "What these 20-year-olds say about American culture"
        ]}
      />

      <CategoryCard
        category="Sport"
        title="Sharon Lokedi smashes women’s course record at the Boston Marathon"
        imageUrl="https://picsum.photos/200/100"
        articles={[
          "John Korir wins men’s race",
          "Duke star Cooper Flagg declares for the NBA draft",
          "Max Verstappen says ‘people can’t handle the full truth’ after Saudi Arabia time-penalty"
        ]}
      />
    </div>
  );
};

export default CategoryPanel;
