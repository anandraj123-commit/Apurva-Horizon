import  { useEffect, useState } from 'react';
import styles from '../theme/css/PopularStories.module.css';
import useFetchData from '../../../hooks/useFetchData';
import Loader from '../../common/Loader';
import {Link} from 'react-router-dom'


const PopularStories = ({items}) => {

  const [activeTab, setActiveTab] = useState('most-read');  
  const [sidebarStories, setSidebarStories] = useState([]);  
  
  const featuredStory=items?.news[0];

  const bulletPointStories = items?.news.slice(1,6);

  const bottomStories = items?.news.slice(6,10);

  useEffect(() => {
  let newSidebarStories = items?.news.slice(10,16);

  if(activeTab === "most-commented") {
    newSidebarStories = [...newSidebarStories].reverse(); // avoid mutating original
  } else if(activeTab === "most-shared") {
    newSidebarStories = [...newSidebarStories].toSorted((a, b) => a.title.localeCompare(b.title)); // or any logic
  }

  setSidebarStories(newSidebarStories);
}, [activeTab, items]);  // Also depend on `items`

  
  return (
    <div className={`container ${styles.popularStoriesContainer}`}>
      <div className="row mb-4">
        <div className="col-12">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{items?.subcategory} <span className={styles.arrowIcon}>&gt;</span></h2>
            
            <ul className={`nav nav-tabs ${styles.tabsNav}`}>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'most-read' ? 'active ' + styles.tabActive : ''}`} 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('most-read');
                  }}
                >
                  MOST READ
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'most-commented' ? 'active ' + styles.tabActive : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('most-commented');
                  }}
                >
                  MOST COMMENTED
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'most-shared' ? 'active ' + styles.tabActive : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('most-shared');
                  }}
                >
                  MOST SHARED
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Main content - Left side */}
        <div className="col-lg-8">
          <div className="row mb-4">
            {/* Featured story */}
            <div className="col-md-6">
                <Link to = {`/${featuredStory?.type}/${featuredStory?.subcategory}/view-page/${featuredStory?._id}`}>
              <div className={styles.featuredStoryCard}>
                <div className={styles.featuredImageContainer}>
                  <img 
                    src="https://picsum.photos/200/300" 
                    // alt={featuredStory.title} 
                    className={styles.featuredImage}
                  />
                {featuredStory && 
                  <div className={styles.featuredOverlay}>
                    <h3 className={styles.featuredTitle}>{featuredStory?.title}</h3>
                  </div>
                }
                </div>
              </div>
                </Link>
            </div>
            
            {/* Bulleted stories list */}
            <div className="col-md-6">
              <ul className={`list-unstyled ${styles.bulletList}`}>
                {bulletPointStories && bulletPointStories.map(story => (
                <Link to = {`/${story?.type}/${story?.subcategory}/view-page/${story?._id}`}>
                  <li key={story?._id} className={styles.bulletListItem}>
                    <span className={styles.bulletPoint}>&bull;</span>
                    <a href="#" className={styles.bulletLink}>
                      {story?.title}
                    </a>
                  </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom stories */}
          <div className="row">
            {bottomStories && bottomStories.map(story => (
              <div key={story?._id} className="col-md-3 mb-4">
                <Link to = {`/${story?.type}/${story?.subcategory}/view-page/${story?._id}`}>
                <div className={styles.storyCard}>
                  <img 
                    src="https://picsum.photos/200/300" 
                    alt={story.title} 
                    className={styles.storyImage}
                  />
                  <h4 className={styles.storyTitle}>{story?.title}</h4>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Right side */}
        <div className="col-lg-4">
          <div className={styles.sidebarContent}>
            {sidebarStories && sidebarStories.map(story => (
                <Link to = {`/${story?.type}/${story?.subcategory}/view-page/${story?._id}`}>
              <div key={story?._id} className={`d-flex mb-3 ${styles.sidebarStory}`}>
                <div className={styles.sidebarImageContainer}>
                  <img 
                    src={story?.imageUrl || "https://picsum.photos/200/300"} 
                    alt={story?.title} 
                    className={styles.sidebarImage}
                  />
                </div>
                <div className={styles.sidebarTextContent}>
                  <h5 className={styles.sidebarTitle}>{story?.title}</h5>
                </div>
              </div>
                </Link>
            ))}
          </div>
        </div>
        <span align="right">see more ...</span>
      </div>
    </div>
  );
};

export default PopularStories;