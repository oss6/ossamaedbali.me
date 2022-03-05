import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import sanityClient from '../client.js';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url'
import './PostPage.css';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source)
}

export default function PostPage() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const { state } = useLocation();

  const portableTextComponents = useMemo(() => ({
    types: {
      image: ({ value }) => {
        return (
          <img src={urlFor(value)} alt={value.caption} title={value.caption} style={{width: '100%'}} />
        );
      },
      iframe: ({ value }) => {
        return (
          <iframe title={value.title} style={{width: '100%'}} height={value.height} src={value.url} frameBorder="0" scrolling="no" allowFullScreen></iframe>
        );
      }
    },
    marks: {
      internalLinkSource: ({ children, value }) => {
        return (
          <a href={'#' + value.iref}>{children}</a>
        );
      },
      internalLinkTarget: ({ children, value }) => {
        return (
          <>
          <span id={value.irefTarget}></span>
          {children}
          </>
        )
      }
    }
  }), []);

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
      <div className='post-header'>
        {(postData || state) &&
          <h1>{postData ? postData.title : state.title}</h1>
        }

        {(postData || state) &&
          <p>by {postData ? postData.name : state.name} - {format(new Date(postData ? postData.publishedAt : state.publishedAt), 'do MMMM yyyy')}</p>
        }

        {postData && postData.categories && postData.categories.length > 0 &&
          <div className='post-categories'>Categories: {postData.categories.map(c => <a key={c._id} href={'/categories/' + c._id}>{c.title}</a>)}</div>
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
