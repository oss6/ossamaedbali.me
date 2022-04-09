import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import postsService from '../posts/posts.service';
import PostsCardView from '../posts/PostsCardView';
import './Home.css';

export default function Home() {
  const [posts, setAllPosts] = useState(null);

  useEffect(() => {
    postsService.getPosts({ limit: 4 })
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Ossama Edbali</title>
      </Helmet>

      <p className='intro'>
        Hi there, thanks for stopping by! I'm Ossama Edbali, software developer at <a href="https://www.ebi.ac.uk/">The European Bioinformatics Institute (EMBL-EBI)</a> and MSc Bioinformatics student at <a href='https://www.birmingham.ac.uk/'>The University of Birmingham</a>.
      </p>
      <p>I design and build bespoke web applications and websites. <a href="mailto: ossedb@gmail.com">Get in touch</a> to start something great! For more insights on what I do check out the <a href="/work">work</a> page.</p>
      <p>I develop web applications, services, and APIs in <strong>Node JS</strong>, <strong>.NET</strong>, <strong>Laravel PHP</strong> for backend and <strong>React JS</strong> and <strong>Angular</strong> for frontend.</p>

      <div className='recent-posts'>
        <h2>Recent posts</h2>

        <PostsCardView posts={posts} />

        <div className='view-all-posts'>
          <Link to={'/blog'} className='btn'>View all</Link>
        </div>
      </div>
    </div>
  );
}
