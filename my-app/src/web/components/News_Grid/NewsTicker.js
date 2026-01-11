import styles from '../theme/css/NewsTicker.module.css';

const NewsTicker= ({ items }) => {
  return (
    <div className={styles.tickerContainer}>
      <div className={styles.label}>Breaking</div>
      <div className={styles.ticker}>
        {items.map((item) => (
          <a href="#" key={item.id} className={styles.tickerItem}>
            <span className={styles.tickerDot}></span>
            <span className={styles.timestamp}>{item.timestamp}</span>
            <span>{item.text}</span>
          </a>
        ))}
        {/* Duplicate items for seamless loop */}
        {items.map((item) => (
          <a href="#" key={`duplicate-${item.id}`} className={styles.tickerItem}>
            <span className={styles.tickerDot}></span>
            <span className={styles.timestamp}>{item.timestamp}</span>
            <span>{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;