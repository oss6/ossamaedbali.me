import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import postsService from './posts.service';
import PostsCardView from './PostsCardView';

export default function PostsPage() {
  const [allPosts, setAllPosts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    categories: []
  });
  const [searchTermValue, setSearchTermValue] = useState('');

  useEffect(() => {
    postsService.getPosts(undefined, filters)
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, [filters]);

  useEffect(() => {
    postsService.getCategories()
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  function toggleCategory(category) {
    setAllPosts(null);

    if (isCategorySelected(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter(c => c !== category._id)
      });
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category._id]
      });
    }
  }

  function isCategorySelected(category) {
    return filters.categories.includes(category._id);
  }

  function setSearchTerm() {
    setAllPosts(null);

    setFilters({
      ...filters,
      searchTerm: searchTermValue
    });
  }

  function clearFilters() {
    setAllPosts(null);

    setFilters({
      categories: [],
      searchTerm: ''
    });

    setSearchTermValue('');
  }

  return (
    <div className='page'>
      <Helmet>
        <title>Ossama Edbali | Blog</title>
      </Helmet>

      <header className='page-header'>
        <h1>Blog</h1>
        <h2>A collection of blog posts ranging from software development to reflections.</h2>
      </header>

      <div className='blog-content'>
        <div className='search-area__search-bar-wrapper'>
          <label htmlFor='search-bar' className='hidden'>Search blog</label>
          <input
            id='search-bar'
            type='text'
            placeholder='Your search terms...'
            className='search-area__search-bar'
            value={searchTermValue}
            onChange={(e) => setSearchTermValue(e.target.value)}
          />
          <button className='search-area__search-btn' onClick={() => setSearchTerm()}>Search</button>
        </div>
        <div className='search-area__filters'>
          {categories && categories.map((category) =>
          <button
            key={category._id}
            className={'search-area__filter-btn' + (isCategorySelected(category) ? ' search-area__filter-btn--active' : '')}
            onClick={() => toggleCategory(category)}
          >
            {category.title}
          </button>
          )}
        </div>

        {(filters.searchTerm || filters.categories.length > 0) &&
          <div className='search-area__search-results-details'>
            <p>Filtered search results (<button className='search-area__search-results-clear' onClick={() => clearFilters()}>clear</button>):</p>
          </div>}

        <PostsCardView posts={allPosts} />
      </div>
    </div>
  );
}
