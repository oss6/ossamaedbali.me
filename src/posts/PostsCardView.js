import { format } from 'date-fns';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../card/Card';
import 'react-loading-skeleton/dist/skeleton.css'
import './PostsCardView.css';

function LoadingBoxes() {
  const numberOfCards = 4;

  return (
    <div className='cards'>
      {new Array(numberOfCards).fill(0).map((_, i) => (
        <div key={i} className='card' style={{ padding: '1rem', width: '43%' }}>
          <Skeleton count={6} />
        </div>
      ))}
    </div>
  )
}

export default function PostsCardView(props) {
  if (!props.posts) {
    return <LoadingBoxes />
  }

  if (props.posts && props.posts.length === 0) {
    return (
      <p>No results found. Please change filters.</p>
    )
  }

  return (
    <div className='cards'>
    {props.posts && props.posts.map((post, index) =>
      <Card
        key={index}
        header={<img src={post.mainImage.asset.url} alt={post.title} className='post-image' />}
        link={'/blog/' + post.slug.current}
        linkState={post}
        content={
          <>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-published-at'>{format(new Date(post.publishedAt), 'do MMMM yyyy')}</p>
          </>
        }
      />
    )}
    </div>
  )
}
