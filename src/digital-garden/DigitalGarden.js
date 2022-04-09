import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import digitalGardenService from './digital-garden.service';

export default function DigitalGarden() {
  const [notes, setNotes] = useState(null);
  const [topics, setTopics] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    topics: []
  });
  const [searchTermValue, setSearchTermValue] = useState('');

  useEffect(() => {
    digitalGardenService.getNotes(filters)
      .then((data) => setNotes(data))
      .catch(console.error);
  }, [filters]);

  useEffect(() => {
    digitalGardenService.getTopics()
      .then((data) => setTopics(data))
      .catch(console.error);
  }, []);

  function toggleTopic(topic) {
    setNotes(null);

    if (isTopicSelected(topic)) {
      setFilters({
        ...filters,
        topics: filters.topics.filter(c => c !== topic._id)
      });
    } else {
      setFilters({
        ...filters,
        topics: [...filters.topics, topic._id]
      });
    }
  }

  function isTopicSelected(topic) {
    return filters.topics.includes(topic._id);
  }

  function setSearchTerm() {
    setNotes(null);

    setFilters({
      ...filters,
      searchTerm: searchTermValue
    });
  }

  function clearFilters() {
    setNotes(null);

    setFilters({
      topics: [],
      searchTerm: ''
    });

    setSearchTermValue('');
  }

  return (
    <div className='page'>
      <Helmet>
        <title>Ossama Edbali | Digital garden</title>
      </Helmet>

      <header className='page-header'>
        <h1>Digital garden</h1>
        <h2>The digital garden is a way to cultivate the mind with quality content.</h2>
      </header>

      <div>
        <p>From <a href='https://www.mentalnodes.com/a-gardening-guide-for-your-mind'>A gardening guide for your mind</a>:</p>

        <ul className='list'>
          <li><strong className='bold'>Seeds</strong> - seed your garden with quality content and cultivate your curiosity. Plant seeds in your mind garden by taking smart personal notes (taking raw notes is useless). These don't need to be written in a publishable form.</li>
          <li><strong className='bold'>Trees</strong> - grow your knowledge by forming new branches and connecting the dots. Write short structured notes articulating specific ideas and publish them in your digital garden. One note in your digital garden = one idea. (what you're currently reading is such a note) Do not keep orphan notes. Thread your thoughts.</li>
          <li><strong className='bold'>Fruits</strong> - produce new work. These are more substantial—essays, videos, maybe a book at some point. The kind of work researchers and creatives may hope will help them live beyond their expiration date.</li>
        </ul>
      </div>

      <div>
        <div className='search-area__search-bar-wrapper'>
          <label htmlFor='search-bar' className='hidden'>Search digital garden</label>
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
          {topics && topics.map((topic) =>
          <button
            key={topic._id}
            className={'search-area__filter-btn' + (isTopicSelected(topic) ? ' search-area__filter-btn--active' : '')}
            onClick={() => toggleTopic(topic)}
          >
            {topic.title}
          </button>
          )}
        </div>

        {(filters.searchTerm || filters.topics.length > 0) &&
          <div className='search-area__search-results-details'>
            <p>Filtered search results (<button className='search-area__search-results-clear' onClick={() => clearFilters()}>clear</button>):</p>
          </div>}
      </div>

      {notes &&
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Topics</th>
            {/* <th>Notes</th> */}
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id}>
              <td><Link to={'/digital-garden/' + note.slug.current} state={note}>{note.title}</Link></td>
              <td>
                <ul>
                  {note.topics && note.topics.map((topic) => <li key={topic._id}>{topic.title}</li>)}
                </ul>
              </td>
              {/* <td>N.A.</td> */}
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
