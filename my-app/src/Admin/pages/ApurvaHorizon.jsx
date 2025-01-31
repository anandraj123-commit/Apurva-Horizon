import React from 'react'
import contentImage from './images/Content-image.webp'
import categoryImage from './images/Category-image.webp'
import newsImage from './images/News-image.webp'
import regionalImage from './images/Regional-image.webp'
import sensorshipImage from './images/Sensorship-image.webp'
import MediaCard from '../common/MediaCard'

export default function ApurvaHorizon() {
  return (
    <div className='d-flex flex-wrap gap-4 justify-content-around'>
        <MediaCard url={contentImage} redirectTo={'/admin/content-type'} title={'Content Type'}/>
        <MediaCard url={categoryImage} redirectTo={'/admin/category-type/list'} title={'Category Type'}/>
        <MediaCard url={newsImage} redirectTo={'/admin/news/list'} title={'News'}/>
        <MediaCard url={regionalImage} redirectTo={'/admin/regional-news/list'} title={'Regional News'}/>
        <MediaCard url={sensorshipImage} redirectTo={'/admin/sensorship-news/list'} title={'Sensorship News'}/>
        {/* <MediaCard url={contentImage} redirectTo={'/admin/content-type'} title={}/> */}
        {/* <MediaCard url={contentImage} redirectTo={'/admin/content-type'} title={}/> */}
    </div>
)
}
