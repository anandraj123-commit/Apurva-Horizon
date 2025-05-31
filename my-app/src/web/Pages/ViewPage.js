import { useRef, useEffect, useState } from 'react';
import styles from './theme/css/ViewPage.module.css'
import NewsTabs from '../components/News_Grid/NewsTabs';
import PhotoStories from '../components/News_Grid/PhotoStories';
import EditorsPicks from '../components/News_Grid/EditorsPicks';
import LatestNews from '../components/News_Grid/LatestNews';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData'

const ViewPage = () => {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("600px");
  const {id,category,subcategory} = useParams();

  const {data:categoryData,loading:loading1,error:error1} = useFetchData(`http://localhost:5000/api/web/fetch-data/fetchParticularCategory/paginated?category=${category}&pageNo=0&rowsPerPage=10`)
  const {data:subcategoryData,loading:loading2,error:error2} = useFetchData(`http://localhost:5000/api/web/fetch-data/fetchEachSubcategory/paginated?category=${category}&subcategoryCount=7&newsLimit=20&subcategory=${subcategory}`)
  const {data:categoryDataGroupedBySubcategory,loading:loading3,error:error3} = useFetchData(`http://localhost:5000/api/web/fetch-data/fetchEachSubcategory/paginated?category=${category}&subcategoryCount=7&newsLimit=10`)
    
  const subcategoryItems = subcategoryData[0]?.news || [];
  const categoryItems = categoryData?.data || [];
  let editorialItems = [];
  categoryDataGroupedBySubcategory.forEach((element,index)=>{
    if(index<6)editorialItems.push(element?.news[0]);
  })

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'SET_IFRAME_HEIGHT') {
        setHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>

      <div className={styles.newsAndSidebarWrapper}>
        <div className={styles.iframeStyles}>
          <iframe
            ref={iframeRef}
            src={`http://localhost:5000/api/web/fetch-data/singleNews/${id}`}
            title="News View"
            style={{ width: "100%", height, border: 'none', transition: 'height 0.3s ease' }}
          ></iframe>
        </div>
        <div className={styles.sidebarTab}>
          <NewsTabs item1={subcategoryItems.slice(0,10)} item2={categoryItems}/>
          <PhotoStories stories={subcategoryItems.slice(11,20)} />
        </div>
      </div>
      <div className={styles.editorialpicks}>
        <EditorsPicks articles={editorialItems} />
        <LatestNews />

      </div>
    </div>
  );
};

export default ViewPage;
