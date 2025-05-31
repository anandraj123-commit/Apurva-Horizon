// src/components/Footer/Footer.tsx
import React, { useEffect, useState } from 'react';
import styles from './theme/css/Footer.module.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000")

const Footer = () => {

  const [categoryData, setCategoryData] = useState([]);

  const fetchAllCategory = async () => {
    const response = await fetch("http://localhost:5000/api/main/fetch-data/fetchAllCategory", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json();
    setCategoryData(responseData)
    // console.log(responseData);

  }

  useEffect(() => {
    fetchAllCategory();
    //socket refresh if there is new category comes in
    socket.on("refresh_category", () => {
      fetchAllCategory();
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.mainSections}>
        {categoryData.map((item, index) => {
          return (  // Add return here to properly render the mapped element
            <div className={styles.section} key={index}>
              <h3 className={styles.sectionTitle}>{item.title}</h3>
              <div className={styles.linksList}>
                {item.subtype.map((subtypeItem, subIndex) => {
                  return (
                    <a href="#" className={styles.link} key={subIndex}>{subtypeItem.name}</a>
                  );
                })}
              </div>
            </div>
          );
        })}

      </div>

      <div className={styles.hotWeb}>
        <h2 className={styles.hotWebTitle}>Hot on the Web</h2>
        <div className={styles.hotWebGrid}>
          <a href="#" className={styles.link}>Health Tips</a>
          <a href="#" className={styles.link}>Ground Zero Box Office Collection</a>
          <a href="#" className={styles.link}>Brain Exercises</a>
          <a href="#" className={styles.link}>Kesari 2 Box Office Collection</a>
          <a href="#" className={styles.link}>Good Bad Ugly Box Office</a>
          <a href="#" className={styles.link}>Optical Illusion</a>
          <a href="#" className={styles.link}>Mantras For Problems</a>
          <a href="#" className={styles.link}>Naga Chaitanya</a>
          <a href="#" className={styles.link}>Knee Exercises</a>
          <a href="#" className={styles.link}>Relationship Tips</a>
        </div>
      </div>

      <div className={styles.trendingTopics}>
        <h2 className={styles.trendingTitle}>Trending Topics</h2>
        <div className={styles.trendingGrid}>
          <a href="#" className={styles.link}>GT vs RR</a>
          <a href="#" className={styles.link}>Hardik Pandya</a>
          <a href="#" className={styles.link}>Shahid Afridi</a>
          <a href="#" className={styles.link}>Sanjiv Goenka</a>
          <a href="#" className={styles.link}>Mumbai Indians</a>
          <a href="#" className={styles.link}>NEET UG Exam</a>
          <a href="#" className={styles.link}>West Bengal NMMS Scholarship</a>
          <a href="#" className={styles.link}>Assam CEE Answer Key</a>
          <a href="#" className={styles.link}>Shoaib Akhtar</a>
          <a href="#" className={styles.link}>Dowry Abuse Case 2019</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
