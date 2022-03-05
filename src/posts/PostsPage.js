import React, { useEffect, useState } from 'react';
import postsService from './posts.service';
import PostsCardView from './PostsCardView';

export default function PostsPage() {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    postsService.getPosts()
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <PostsCardView posts={allPosts} />
    </div>
  );
}
