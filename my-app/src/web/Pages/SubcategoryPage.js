import { useParams } from "react-router-dom";
import OpinionSection from "../components/News_Grid/OpinionSection";
import PopularStories from "../components/News_Grid/PopularStories";
import TopStories from "../components/News_Grid/TopStories";
import styles from './theme/css/SubcategoryPage.module.css';
import useFetchData from "../../hooks/useFetchData";
import NewsSection from "../common/NewsSection";
import HeadlineGridLayout from "../components/News_Grid/HeadlineGridLayout";
import LatestNews from "../components/News_Grid/LatestNews";

export default function SubcategoryPage() {
    const {subcategory,category} = useParams();
      const {data:responseData,loading,error} = useFetchData(`http://localhost:5000/api/web/fetch-data/fetchEachSubcategory/paginated?category=${category}&subcategoryCount=10&newsLimit=21&subcategory=${subcategory}`);  

  return (
    <div className={styles.categoryPageWrapper}>
    <div>
      <NewsSection items = {responseData[0]}/>
      <PopularStories items={responseData[0]}/>
       <HeadlineGridLayout items={responseData[0]}/>

    </div>
      <div className={styles.opnionTopStoriesWrapper}>
        <div className={styles.columnOne}>
          <OpinionSection opinions={[
            {
              id: 'op1',
              title: 'Why Climate Action Cannot Wait',
              excerpt: 'The time for half-measures is over. We need bold action now to prevent catastrophic climate change.',
              author: 'Dr. Sarah Johnson',
              authorRole: 'Climate Scientist',
              date: '2023-05-23',
              readTime: '4 min'
            },
            {
              id: 'op2',
              title: 'The Future of Work in a Digital Age',
              excerpt: 'Remote work has fundamentally changed how we think about productivity and work-life balance.',
              author: 'Michael Chen',
              authorRole: 'Technology Analyst',
              date: '2023-05-22',
              readTime: '3 min'
            },
            {
              id: 'op3',
              title: 'The Future of Work in a Digital Age',
              excerpt: 'Remote work has fundamentally changed how we think about productivity and work-life balance.',
              author: 'Michael Chen',
              authorRole: 'Technology Analyst',
              date: '2023-05-22',
              readTime: '3 min'
            }
          ]} />
        </div>
        <div className={styles.columnTwo}>
          <TopStories stories={[
              {
                id: 'ts1',
                title: 'Global Leaders Meet for Climate Action',
                category: 'Environment',
                readTime: '5 min',
                isExclusive: true
              },
              {
                id: 'ts2',
                title: 'Tech Innovation Drives Market Growth',
                category: 'Business',
                readTime: '3 min'
              },
              {
                id: 'ts3',
                title: 'Space Mission Discovers New Planet',
                category: 'Science',
                readTime: '4 min'
              },
              {
                id: 'ts4',
                title: 'Healthcare Breakthrough in Gene Therapy',
                category: 'Health',
                readTime: '6 min',
                isExclusive: true
              }
            ]} />
        </div>
      </div>
      {/* <PopularStories category="City"/> */}
        <LatestNews />

    </div>
  )
}
