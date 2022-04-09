import React from 'react';
import { Helmet } from 'react-helmet-async';
import notFoundIllustration from './404.png';

export default function NotFound() {
  return (
    <div className='page'>
      <Helmet>
        <title>Ossama Edbali | Page not found</title>
      </Helmet>

      <header className='page-header'>
        <h1>Page not found</h1>
        <h2>
          This page may have been moved or it doesn't exist.
          If you think this a bug/issue please contact me <a href='mailto:ossedb@gmail.com'>here</a>.
        </h2>

        <img src={notFoundIllustration} alt='Not found illustration' style={{ width: '100%' }} />
      </header>
    </div>
  );
}
