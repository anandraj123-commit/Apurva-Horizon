import HeadlineGridLayout from '../components/News_Grid/HeadlineGridLayout'
import PopularStories from '../components/News_Grid/PopularStories'
import VideoGallery from '../components/News_Grid/VideoGallery'
import StoryCardGrid from '../components/News_Grid/StoryCardGrid'
import TrendingTopics from '../components/News_Grid/TrendingTopics'
import { useParams } from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../common/Loader'

export default function CategoryPage() {
  const category = useParams().category;
    const {data:responseData,loading,error} = useFetchData(`http://localhost:5000/api/web/fetch-data/fetchEachSubcategory/paginated?category=${category}&subcategoryCount=10&newsLimit=16`);
  

  if(loading){
    return <Loader/>
  }

  return (
    <div>
      <PopularStories items={responseData[0]}/>
       <HeadlineGridLayout items={responseData[1]}/>
      <TrendingTopics items={responseData}/>
      <VideoGallery />
      <StoryCardGrid category={category}/> 
    </div>
  )
}
