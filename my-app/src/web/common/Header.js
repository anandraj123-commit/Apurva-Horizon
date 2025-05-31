import React, { useEffect, useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import styles from "./theme/css/Header.module.css";
import ApurvaNewsLogo from './theme/images/apurva-news-logo.png';
import io from 'socket.io-client';
import NavMenu from "./NavMenu";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import Twitter from "lucide-react/dist/esm/icons/twitter";
import Rss from "lucide-react/dist/esm/icons/rss";
import Youtube from "lucide-react/dist/esm/icons/youtube";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import { Link } from "react-router-dom";


const socket = io.connect("http://localhost:5000")
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  //set of three's for heder cards
  const [chunkedNewsData, setChunkedNewsData] = useState([]);

  //to make curr category red
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchAllCategory = async () => {
    const response = await fetch("http://localhost:5000/api/web/fetch-data/fetchAllCategory", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json();
    setCategoryData(responseData)
    console.log(responseData);

  }

  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };



  useEffect(() => {
    fetchAllCategory();
    //socket refresh if there is new category comes in
    socket.on("refresh_category", () => {
      fetchAllCategory();
    });
  }, []);


  const getNews = async (category, subcategory, index) => {
    const response = await fetch(`http://localhost:5000/api/web/fetch-data/fetchNewsByCategory/${category}/${subcategory}`, {
      method: "GET",
      headers: { 'content-type': "application/json" }
    })
    const responseData = await response.json();
    setNewsData(responseData);
    setChunkedNewsData(chunkArray(responseData, 3));
    setActiveIndex(index);
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });


  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.leftSection}>
          <span className={styles.date}>{today}</span>
          <a href="/epaper" className={styles.ePaper}>e-Paper</a>
        </div>
        <div className={styles.rightSection}>
          <select className={styles.languageOptions}>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Malyalam</option>
            <option>Gujrati</option>
            <option>Odia</option>
            <option>Telugu</option>
            <option>Tamil</option>
          </select>
          <div className={styles.socialIcons}>
            <Facebook />
            <Twitter />
            <Rss />
            <Youtube />
            <Instagram />
            <Linkedin />
          </div>
        </div>
      </div>

      <div className={styles.logoSection}>
        <img
          src={ApurvaNewsLogo}
          alt="The Hindu Logo"
          className={styles.logo}
        />
      </div>

      <nav className={styles.nav}>
        <div className={styles.mobileNav}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button className={styles.searchButton}>
            <Search size={20} />
          </button>
        </div>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
          {(showAllCategories ? categoryData : categoryData.slice(0, 10)).map((category, index) => (
            <li key={category} className={styles.navItemWrapper}>
              <Link to={`/${category?.title}`}>
                <a href={`/${category}`} className={styles.navItem} onMouseEnter={() => { getNews(category.title, category.subtype[0].name, 0); }}>{category.title.toUpperCase()} </a>
              </Link>
              <div className={styles.megaMenu}>
                <div className={styles.container}>
                  <aside className={styles.sidebar}>
                    <ul className={styles.menuList}>
                      {category.subtype.map((item, index) => (
                        <Link to={`/${category?.title}/${item?.name}`}>
                          <li key={index} className={`${styles.menuItem} ${index === activeIndex ? styles.activeIndex : ''}`} onMouseEnter={() => { getNews(category.title, item.name, index); }}>
                            {item.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </aside>

                  <main className={styles.content}>
                    <div className={styles.newsGrid}>
                      {chunkedNewsData.map((group, index) => (
                        <div key={index} className={styles.newsCard}>
                          {group.map((item, i) => (
                            <div key={i} className={styles.newsItem}>
                              {i === 0 ? <img src="https://picsum.photos/180/150" className={styles.newsImage} alt={item.title} /> : null}
                              <p style={i === 0 ? { "fontWeight": "bold" } : null} className={styles.newsTitle}>{item.title}</p>
                              <p className={styles.displayTime}>{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(item.DisplayTime).getTime()) / (1000 * 60))}</p>
                              <hr width="100%" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className={styles.seeMore}>see more...</p>
                  </main>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.categoryButton}>

          {!showAllCategories ? <Menu onClick={() => { setShowAllCategories(!showAllCategories) }} /> : <X onClick={() => { setShowAllCategories(!showAllCategories) }} />}
        </div>
      </nav>
      <div className={styles.centralizeNavMenu}>
        {showAllCategories ? <NavMenu /> : null}
      </div>
      <div className={`${styles.rightNav} ${isMenuOpen ? styles.rightNavOpen : ''}`}>
        <a href="/videos" className={styles.navItem}>Videos</a>
        <a href="/ebooks" className={styles.navItem}>eBooks</a>
        <a href="/podcast" className={styles.navItem}>Podcast</a>
        <a href="/crossword" className={styles.navItem}>Crossword</a>
        <a href="/photos" className={styles.navItem}>Photos</a>
        <a href="/newsletter" className={styles.navItem}>Newsletter</a>
        <a href="/visual-stories" className={styles.navItem}>Visual Stories</a>
        <a href="/litfest" className={styles.navItem}>Litfest</a>
        <a href="/specials" className={styles.navItem}>Specials</a>
        <a href="/the-huddle" className={styles.navItem}>The Huddle</a>
      </div>
    </header>
  );
};

export default Header;