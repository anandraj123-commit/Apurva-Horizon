import React from 'react';
import styles from '../theme/css/VideoGallery.module.css';

const videos = [
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '03:00',
    title: 'India DESTROYS Pak F-16 Jet, Drones Mid-air In Massive Attack On Pathankot Airbase',
  },
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '03:00',
    title: 'India DESTROYS Pak F-16 Jet, Drones Mid-air In Massive Attack On...',
  },
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '05:38',
    title: "India's 'Happy Drone Hits The Bull's Eye' In Lahore; Pak's HQ-9 Defence...",
  },
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '03:20',
    title: 'Putin Rattles Pak With Big Offer To PM Modi On Pahalgam Retaliation...',
  },
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '03:24',
    title: "Indian Air Force Dares Pakistan With 'Secret Drills'; Fighter Jets...",
  },
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '05:34',
    title: "'Invade India's Northeast If Pak Is Attacked': Ex-Bangladesh General's...",
  },
  {
    thumbnail: 'https://picsum.photos/400/225',
    duration: '05:34',
    title: "'Invade India's Northeast If Pak Is Attacked': Ex-Bangladesh General's...",
  },
];

const VideoGallery = () => {
  return (
    <div className={`container-fluid ${styles.videoSection}`} >
      <h2 className="text-white mb-4">Videos</h2>
      <div className="row" >
        <div className="col-12 col-lg-6 mb-4">
          <div className={styles.mainVideo}>
            <img
              src={videos[0].thumbnail}
              alt="Main video thumbnail"
              className="img-fluid w-100"
            />
            <span className={styles.duration}>{videos[0].duration}</span>
            <h5 className={`${styles.videoTitle}`}>{videos[0].title}</h5>
          </div>
          <div className={styles.mainVideo}>
            <img
              src={videos[0].thumbnail}
              alt="Main video thumbnail"
              className="img-fluid w-100"
            />
            <span className={styles.duration}>{videos[0].duration}</span>
            <h5 className={`${styles.videoTitle}`}>{videos[0].title}</h5>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="row">
            {videos.slice(1).map((video, index) => (
              <div key={index} className="col-6 mb-4">
                <div className={styles.videoItem}>
                  <img
                    src={video.thumbnail}
                    alt={`Thumbnail ${index}`}
                    className="img-fluid w-100"
                  />
                  <span className={styles.duration}>{video.duration}</span>
                  <p className={`${styles.videoText}`}>{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
