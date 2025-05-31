import styles from '../theme/css/HeadlineGridLayout.module.css';
import useFetchData from '../../../hooks/useFetchData';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';


const HeadlineGridLayout = ({ items }) => {


  return (

    items ?

      <div className={`container ${styles.container}`}>
        <h1 className={`${styles.mainHeading} mb-4 pb-2 border-bottom`}>{items?.subcategory}</h1>

        <div className="row mb-4">
          {/* Left Featured News */}
          <div className="col-md-4">
            <Link to={`/${items?.news[0]?.type}/${items?.news[0]?.subcategory}/view-page/${items?.news[0]?._id}`}>
              <div className={`card border-0 shadow-sm h-100 ${styles.newsCard}`}>
                <img
                  src={items?.news[0].imageUrl || "https://picsum.photos/200/300"}
                  alt={items?.news[0].title}
                  className={`card-img-top ${styles.featureImage}`}
                />
                <div className="card-body">
                  <div className="mb-2 small">
                    <span className="text-danger fw-bold">{items?.news[0].type}</span>
                    <span className="text-secondary"> / </span>
                    <span className="text-secondary">{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(items?.news[0].DisplayTime).getTime()) / (1000 * 60))}</span>
                  </div>
                  <h2 className="card-title h5 fw-bold">{items?.news[0].title}</h2>
                  <p className="card-text small">{items?.news[0].description}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Featured News Column */}
          <div className="col-md-4">
            <div className="row h-100">
              <div className="col-12 mb-3 h-50">
            <Link to={`/${items?.news[1]?.type}/${items?.news[1]?.subcategory}/view-page/${items?.news[1]?._id}`}>

                <div className={`card border-0 shadow-sm h-100 ${styles.newsCard}`}>
                  <img
                    src={items?.news[1].imageUrl || "https://picsum.photos/200/300"}
                    alt={items?.news[1].title}
                    className={`card-img-top ${styles.smallFeatureImage}`}
                  />
                  <div className="card-body">
                    <div className="mb-2 small">
                      <span className="text-danger fw-bold">{items?.news[1].type}</span>
                      <span className="text-secondary"> / </span>
                      <span className="text-secondary">{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(items?.news[1].DisplayTime).getTime()) / (1000 * 60))}</span>
                    </div>
                    <h3 className="card-title h6 fw-bold">{items?.news[1].title}</h3>
                  </div>
                </div>
                </Link>
              </div>

              <div className="col-12 h-50">
            <Link to={`/${items?.news[2]?.type}/${items?.news[2]?.subcategory}/view-page/${items?.news[2]?._id}`}>

                <div className={`card border-0 shadow-sm h-100 ${styles.newsCard}`}>
                  <img
                    src={items?.news[2].imageUrl || "https://picsum.photos/200/300"}
                    alt={items?.news[2].title}
                    className={`card-img-top ${styles.smallFeatureImage}`}
                  />
                  <div className="card-body">
                    <div className="mb-2 small">
                      <span className="text-danger fw-bold">{items?.news[2].type}</span>
                      <span className="text-secondary"> / </span>
                      <span className="text-secondary">{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(items?.news[2].DisplayTime).getTime()) / (1000 * 60))}</span>
                    </div>
                    <h3 className="card-title h6 fw-bold">{items?.news[2].title}</h3>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Advertisement */}
          <div className="col-md-4">
            <div className={`card border-0 h-100 bg-light ${styles.adCard}`}>
              <div className="card-body d-flex align-items-center justify-content-center flex-column">
                {/* <div className="text-secondary text-center"></div> */}
                <img
                  src={"https://picsum.photos/200/300"}
                  className={`card-img-top`}
                />
                <div>Ad</div>
              </div>
            </div>
          </div>

          {/* Full width feature */}
          <div className="col-12 mt-4">
            <Link to={`/${items?.news[3]?.type}/${items?.news[3]?.subcategory}/view-page/${items?.news[3]?._id}`}>

            <div className={`card border-0 shadow-sm ${styles.newsCard}`}>
              <div className="card-body">
                <div className="mb-2 small">
                  <span className="text-danger fw-bold">{items?.news[3].type}</span>
                  <span className="text-secondary"> / </span>
                  <span className="text-secondary">{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(items?.news[3].DisplayTime).getTime()) / (1000 * 60))}</span>
                </div>
                <h3 className="card-title h5 fw-bold">{items?.news[3].title}</h3>
                <p className="card-text small">{items?.news[3].description}</p>
              </div>
            </div>
            </Link>
          </div>
        </div>

        {/* Bottom smaller news items */}
        <div className="row border-top pt-4">
          {items && items?.news.slice(4, 7).map((news, index) => (
            <div key={news?._id || index} className="col-md-4 mb-4">
            <Link to={`/${news?.type}/${news?.subcategory}/view-page/${news?._id}`}>
            
              <div className={`card border-0 shadow-sm h-100 ${styles.newsCard}`}>
                <img
                  src={news.imageUrl || "https://picsum.photos/200/300"}
                  alt={news?.title}
                  className={`card-img-top ${styles.smallImage}`}
                />
                <div className="card-body">
                  <h4 className="card-title h6 fw-bold">{news?.title}</h4>
                  <div className="mt-2 small">
                    <span className="text-danger fw-bold">{news?.type}</span>
                    <span className="text-secondary"> / </span>
                    <span className="text-secondary">{(d => d >= 60 ? `${(d / 60).toFixed(1)} hr ago` : `${Math.round(d)} min ago`)((Date.now() - new Date(news?.DisplayTime).getTime()) / (1000 * 60))}</span>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))}

        </div>
        <div className={styles.seeMoreAlign}>see more ...</div>
        <hr />
      </div> : <Loader />
  );
};

export default HeadlineGridLayout;