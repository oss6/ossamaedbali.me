import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import sanityClient from '../client.js';
import { PortableText } from '@portabletext/react';
import './PostPage.css';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import { portableTextComponents } from '../shared/portable-text-components.js';
import Helmet from 'react-helmet';

export default function PostPage() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug]{
          title,
          slug,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
             }
           },
          body,
          "name": author->name,
          "categories": *[_type == "category" && _id in ^.categories[]._ref]
        }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  return (
    <div>
      <Helmet>
        <title>Ossama Edbali | Blog</title>
      </Helmet>

      <div className='post-header'>
        {(postData || state) &&
          <h1>{postData ? postData.title : state.title}</h1>
        }

        {(postData || state) &&
          <p>by {postData ? postData.name : state.name} - {format(new Date(postData ? postData.publishedAt : state.publishedAt), 'do MMMM yyyy')}</p>
        }

        {postData && postData.categories && postData.categories.length > 0 &&
          <div className='post-categories'>Categories: {postData.categories.map(c => <span key={c._id}>{c.title}</span>)}</div>
        }
      </div>

      <div className='post-content-wrapper'>
        {!postData &&
          <>
            <Skeleton count={5} />
            <Skeleton count={7} />
          </>
        }

        {postData && postData.body &&
          <PortableText
            value={postData.body}
            components={portableTextComponents}
          />
        }
      </div>
    </div>
  );
}
