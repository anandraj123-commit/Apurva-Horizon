// components/NewsGridSection.jsx
import React from "react";
import styles from "./css/NewsGridSection.module.css";
import NewsCard from "./NewsCard";

const newsData = [
  {
    img: "https://picsum.photos/200/300",
    title: "Indians battle respiratory issues, skin rashes in world’s most polluted town",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "‘A peek into the transformative power of AI, from education to healthcare’",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "Disha Patani’s sister rescues injured infant from abandoned building in U.P.’s Bareilly",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "UPSC civil services results declared; Shakti Dubey tops",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "Now, IAF officer booked for attempt to murder in Bengaluru road rage case",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "IPL 2025 introduces a robot dog to its broadcasting team",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "Road rage incident: Police will take action in accordance with the law, says Siddaramaiah",
  },
  {
    img: "https://picsum.photos/200/300",
    title: "Three held for manufacturing, selling fake soaps online",
  },
];

const NewsGridSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>In Case You Missed It</h2>
      <div className={styles.grid}>
        {newsData.map((item, index) => (
          <NewsCard key={index} img={item.img} title={item.title} />
        ))}
      </div>
    </section>
  );
};

export default NewsGridSection;
