import React, { useState } from 'react'
import StoryCard from './StoryCard'
import styles from "../theme/css/StoryCardGrid.module.css"
import useFetchData from '../../../hooks/useFetchData'
import Pagination from '@mui/material/Pagination';
import Loader from '../../common/Loader';

export default function StoryCardGrid({category}) {

  const [pageNo,setPageNo] = useState(0);
  const {data:responseData,loading,error} = useFetchData(`http://localhost:5000/api/web/fetch-data/fetchParticularCategory/paginated?category=${category}&pageNo=${pageNo}&rowsPerPage=12`);
  const items = responseData?.data || [];

  const TotalPages = parseInt(responseData.count)<responseData.count?parseInt(responseData.count)+1:responseData.count;  

  const paginationHandler = (event,page)=>{
    setPageNo(page-1);
  }
  
  if(loading){
    return <Loader/>
  }
    return <div className={styles.StoryCardGridContainer}>
        <div className={styles.gridSection}>
          {
            items.map((item,index)=>{
            return <StoryCard image="https://picsum.photos/200/300" title={item.title} key={index}/>
            })
          }
        </div>
        <div className={styles.pagination}>
          <Pagination count={TotalPages} page={pageNo + 1} shape="rounded" onChange={paginationHandler}/>
        </div>
    </div>
}
