import { useState, useEffect } from 'react';
import styles from '../theme/css/StockTicker.module.css';

const StockTicker = ({ stocks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % stocks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [stocks.length]);

  if (!stocks || stocks.length === 0) {
    return null;
  }

  return (
    <div className={styles.stockTicker}>
      <h3 className={styles.tickerTitle}>Market Watch</h3>
      <div className={styles.tickerContainer}>
        <div className={styles.stockItems} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {stocks.map((stock, index) => (
            <div key={stock.symbol} className={styles.stockItem}>
              <span className={styles.symbol}>{stock.symbol}</span>
              <span className={styles.price}>${stock.price.toFixed(2)}</span>
              <span className={`${styles.change} ${stock.change >= 0 ? styles.positive : styles.negative}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
