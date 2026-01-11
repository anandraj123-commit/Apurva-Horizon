// import React, { useState } from 'react';
// import { Menu } from 'lucide-react';
// import styles from './theme/css/NavMenu.module.css';

// interface Category {
//   title: string;
//   links: string[];
// }

// const categories: Category[] = [
//   {
//     title: "News Home",
//     links: ["City", "Liveblogs", "India", "Elections 2025", "Politics", "World", "Citizen Reporter", "NRI", "Headlines", "Podcasts", "Sunday Times", "Good News", "TOI Features", "Specials", "Times Fact Check", "Good Governance", "Times of a Better India", "South Pole - Chennai Times"]
//   },
//   {
//     title: "Entertainment",
//     links: ["Movie Reviews", "Photos (ETIMES)", "Music", "Events"]
//   },
//   {
//     title: "Lifestyle",
//     links: ["Health+", "Times Pets", "Femina", "Women", "Travel", "Recipes"]
//   },
//   {
//     title: "Opinion",
//     links: ["Infographics", "Humour", "Cartoons", "Blogs"]
//   },
//   {
//     title: "Technology",
//     links: ["Mobile & Tabs", "Laptops & PC", "Appliances", "Tech Tips", "Tech News", "Gaming"]
//   },
//   {
//     title: "TV",
//     links: ["TV News", "TV Listings"]
//   },
//   {
//     title: "Business",
//     links: ["Startups", "International Business"]
//   },
//   {
//     title: "Social",
//     links: ["Viral News", "Trending News"]
//   },
//   {
//     title: "Sports",
//     links: ["Cricket", "IPL 2025", "Football", "TOISA"]
//   },
//   {
//     title: "Astrology",
//     links: ["Horoscope", "Planets & Transits"]
//   },
//   {
//     title: "Speaking Tree",
//     links: ["Atheism", "Daily Ecstasy", "Vastu and Feng Shui", "Yoga & Meditation", "The Joy of Death", "Quotes"]
//   },
//   {
//     title: "Education",
//     links: ["Bennett University", "TOI Student", "Study Abroad", "Jobs"]
//   },
//   {
//     title: "Religion",
//     links: ["Rituals & Puja", "Festivals", "Mantras & Chants"]
//   },
//   {
//     title: "Services",
//     links: ["Mediawire", "Epaper", "Newspaper Subscription", "Classifieds", "Archives", "Be Swatantra"]
//   },
//   {
//     title: "Auto",
//     links: ["News", "Reviews", "Advice centre", "Commercial vehicles", "Motorsports", "Videos", "Visual Stories"]
//   },
//   {
//     title: "Editorials",
//     links: ["TOI Editorials", "ET Editorials"]
//   },
//   {
//     title: "Real Estate",
//     links: ["Property Listings", "New Projects", "Home Loans"]
//   }
// ];

// const NavMenu = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <nav className={styles.navContainer}>
//       <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
//         <span>Menu</span>
//         <Menu className={styles.menuIcon} />
//       </div>

//       <div className={`${styles.menuContainer} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
//         {categories.map((category) => (
//           <div key={category.title} className={styles.categoryBlock}>
//             <div className={styles.categoryTitle}>
//               <span>{category.title}</span>
//             </div>
//             <div className={styles.linksGrid}>
//               {category.links.map((link) => (
//                 <a key={`${category.title}-${link}`} href="#" className={styles.navLink}>
//                   {link}
//                 </a>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default NavMenu;

import React from 'react';
import styles from './theme/css/NavMenu.module.css';
const NavMenu = () => {
  const menu = [
    {
      title: 'News Home',
      items: [
        'City', 'Liveblogs', 'India', 'Elections 2025', 'Politics', 'World',
        'Citizen Reporter', 'NRI', 'Headlines', 'Podcasts', 'Sunday Times',
        'Good News', 'TOI Features', 'Specials', 'Times Fact Check',
        'Good Governance', 'Times of a Better India', 'South Pole - Chennai Times'
      ]
    },
    {
      title: 'Entertainment',
      items: ['Movie Reviews', 'Photos (ETIMES)', 'Music', 'Events']
    },
    {
      title: 'Lifestyle',
      items: ['Health+', 'Times Pets', 'Femina', 'Women', 'Travel', 'Recipes']
    },
    {
      title: 'Sports',
      items: ['Cricket', 'IPL 2025', 'Football', 'TOISA']
    },
    {
      title: 'Opinion',
      items: ['Infographics', 'Humour', 'Cartoons', 'Blogs']
    },
    {
      title: 'Social',
      items: ['Viral News', 'Trending News']
    },
    {
      title: 'Astrology',
      items: ['Horoscope', 'Planets & Transits']
    },
    {
      title: 'Technology',
      items: ['Mobile & Tabs', 'Laptops & PC', 'Appliances', 'Tech Tips', 'Tech News', 'Gaming']
    },
    {
      title: 'Business',
      items: ['Startups', 'International Business']
    },
    {
      title: 'Speaking Tree',
      items: ['Atheism', 'Daily Ecstasy', 'Vastu and Feng Shui', 'Yoga & Meditation', 'The Joy of Death', 'Quotes']
    },
    {
      title: 'Education',
      items: ['Bennett University', 'TOI Student', 'Study Abroad', 'Jobs']
    },
    {
      title: 'Religion',
      items: ['Rituals & Puja', 'Festivals', 'Mantras & Chants']
    },
    {
      title: 'Services',
      items: ['Mediawire', 'Epaper', 'Newspaper Subscription', 'Classifieds', 'Archives', 'Be Swatantra']
    },
    {
      title: 'Auto',
      items: ['News', 'Reviews', 'Advice centre', 'Commercial vehicles', 'Motorsports', 'Videos', 'Visual Stories']
    },
    {
      title: 'Real Estate',
      items: ['🏠 HOUSING.COM']
    },
    {
      title: 'Editorials',
      items: ['TOI Editorials', 'ET Editorials']
    }
  ];

  return (
    <div className={styles.gridContainer}>
      {menu.map((section, index) => (
        <div className={styles.gridItem} key={index}>
          <h3 className={styles.title}>{section.title}</h3>
          <ul>
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NavMenu;
