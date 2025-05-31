import { useState } from 'react';
import { Zap } from 'lucide-react';
import styles from '../theme/css/LatestNews.module.css';
import ArticleCard from './ArticleCard';


const LatestNews = ({ initialCount = 6 }) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const articles = [
  {
    title: 'Global Summit Addresses Climate Crisis with New Emission Targets',
    summary: 'World leaders gathered to announce ambitious new climate goals as scientists warn of irreversible damage.',
    category: 'world',
    imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg',
    isFeatured: false,
    isTrending: true
  },
  {
    title: 'Revolutionary AI Model Can Predict Health Issues Before Symptoms Appear',
    summary: 'Researchers have developed an AI system that can detect potential health problems up to five years before clinical symptoms emerge.',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    isFeatured: false
  },
  {
    title: 'Underdog Team Wins Championship in Stunning Overtime Victory',
    summary: 'In what analysts are calling the greatest upset in decades, the underdogs clinched the title with a last-minute play.',
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    isFeatured: false
  },
  {
    title: 'Peace Negotiations Resume After Six-Month Stalemate',
    summary: 'Diplomatic talks have restarted with international mediators expressing cautious optimism about potential breakthrough.',
    category: 'world',
    imageUrl: 'https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg'
  },
  {
    title: 'Historic Drought Threatens Food Security in Multiple Regions',
    summary: 'Agricultural experts warn of potential food shortages as drought conditions persist across three continents.',
    category: 'world',
    imageUrl: 'https://images.pexels.com/photos/2100942/pexels-photo-2100942.jpeg'
  },
  {
    title: 'New Trade Agreement Set to Reshape Global Commerce',
    summary: 'The comprehensive deal involves fifteen nations and represents over 40% of the world economy.',
    category: 'world',
    imageUrl: 'https://images.pexels.com/photos/2058128/pexels-photo-2058128.jpeg'
  },
  {
    title: 'Tech Giant Unveils Next-Generation Smartphone with Foldable Display',
    summary: 'The innovative device features revolutionary battery technology and enhanced AI capabilities.',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
  },
  {
    title: 'Quantum Computing Breakthrough Could Revolutionize Data Encryption',
    summary: 'Scientists achieve quantum supremacy in solving complex problems previously impossible for classical computers.',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    isTrending: true
  },
  {
    title: 'Electric Vehicle Startup Secures Billion-Dollar Investment',
    summary: 'The funding will accelerate production of affordable electric cars with industry-leading range capabilities.',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'
  },
  {
    title: 'Legendary Athlete Announces Retirement After Record-Breaking Career',
    summary: 'The sports icon reflects on two decades of achievements and plans for the future.',
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
  },
  {
    title: 'City Approves Funding for New State-of-the-Art Stadium',
    summary: 'The multi-purpose venue will host major sporting events and concerts with completion expected by 2026.',
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg'
  },
  {
    title: 'Olympic Committee Announces New Sports for 2028 Games',
    summary: 'The additions reflect growing global interest in emerging competitive activities.',
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg'
  },
  {
    title: 'Award-Winning Director Announces Ambitious New Film Project',
    summary: 'The highly anticipated movie will begin production next month with an all-star cast.',
    category: 'entertainment',
    imageUrl: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg'
  },
  {
    title: 'Streaming Services Competition Intensifies with Major Content Deals',
    summary: 'Industry giants secure exclusive rights to popular franchises as subscriber growth becomes priority.',
    category: 'entertainment',
    imageUrl: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg'
  },
  {
    title: 'Virtual Reality Concert Breaks Attendance Records',
    summary: 'The groundbreaking digital event attracted millions of viewers and sets new standard for remote entertainment.',
    category: 'entertainment',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg'
  },
  {
    title: 'Global Markets Respond to Central Bank Policy Shifts',
    summary: 'Investors navigate uncertainty as major economies adjust interest rates to combat inflation.',
    category: 'business',
    imageUrl: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg'
  },
  {
    title: 'Major Merger Creates New Industry Leader in Renewable Energy',
    summary: 'The combined company aims to accelerate the transition to sustainable power sources worldwide.',
    category: 'business',
    imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg'
  },
  {
    title: 'Supply Chain Innovations Help Businesses Overcome Global Challenges',
    summary: 'Companies implement advanced technologies to improve resilience and efficiency in product distribution.',
    category: 'business',
    imageUrl: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg'
  },
  {
    title: 'Breakthrough Treatment Shows Promise for Chronic Condition',
    summary: 'Clinical trials report significant improvement in patient outcomes with minimal side effects.',
    category: 'health',
    imageUrl: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg'
  },
  {
    title: 'Study Reveals Surprising Benefits of Modified Exercise Routine',
    summary: 'Researchers document unexpected improvements in both physical and mental health metrics.',
    category: 'health',
    imageUrl: 'https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg'
  },
  {
    title: 'Global Health Initiative Expands Access to Essential Medications',
    summary: 'The program aims to reach millions of underserved people in developing regions.',
    category: 'health',
    imageUrl: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg',
    isTrending: true
  }
];

  
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };
  
  return (
    <section className={styles.section}>
      <div className={`${styles.header}`}>
        <h2 className={`${styles.title}`}>
          <Zap size={20} />
          Latest News
        </h2>
      </div>
      
      <div className={styles.grid}>
        {articles.slice(0, visibleCount).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {visibleCount < articles.length && (
        <button 
          className={`${styles.loadMore}`}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default LatestNews;