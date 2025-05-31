import styles from './theme/css/NewsSection.module.css';

const NewsSection = ({items}) => {

  console.log(items);
  

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        {/* Premium Column */}
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>Premium</h2>
          <div className={styles.premiumItem}>
            <p style={{"marginBottom":0}}>{items?.news[3]?.title}</p>
            <span>{items?.news[1]?.DisplayTime}</span>
          </div>
          <ul className={styles.premiumList}>
          {items?.news.slice(4,13).map((item,index)=>{
            return <li key={index}>
              {item?.title}
              <br /><span>{item?.DisplayTime}</span>
            </li>
          })}
          </ul>
        </div>

        {/* Main Headline */}
        <div className={styles.column}>
          <h5 className={styles.category}>WORLD</h5>
          <h1 className={styles.headline}></h1>
          <p>{items?.news[0]?.title}</p>
          <div className={styles.imageWrapper}>
            <img src="https://picsum.photos/250/200" alt="Pope Francis" />
            <div className={styles.imageText}>{items?.news[0]?.DisplayTime}</div>
          </div>
          <div className={styles.subNews}>
            <h4 className={styles.live}>LIVE</h4>
            <p>{items?.news[1]?.title}</p>
            <h4 className={styles.live}>LIVE</h4>
            <p>{items?.news[2]?.title}</p>
          </div>
        </div>

        {/* Latest News Column */}
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>Latest News</h2>
          <ul className={styles.timeline}>
          {items?.news.slice(13,19).map((item,index)=>{
            return <li key={index}>
              <time>{item?.DisplayTime} - {item?.type}</time>
              {item?.title}
            </li>
          })}
          </ul>
          <a className={styles.moreStories} href="#">READ MORE STORIES</a>

          {/* Sponsored */}
          <div className={styles.sponsored}>
            <span>SPONSORED</span>
            <p>{items?.news[19]?.title}</p>
          </div>
          <div className={styles.sponsored}>
            <span>SPONSORED</span>
            <p>{items?.news[20]?.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
