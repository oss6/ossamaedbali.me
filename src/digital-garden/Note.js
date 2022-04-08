import { PortableText } from '@portabletext/react';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useParams } from 'react-router-dom';
import { portableTextComponents } from '../shared/portable-text-components';
import digitalGardenService from './digital-garden.service';

export default function Note() {
  const [note, setNote] = useState(null);
  const { slug } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    digitalGardenService.getNote(slug)
      .then((data) => setNote(data[0]))
      .catch(console.error);
  }, [slug]);

  return (
    <div className='page'>
      <header className='page-header'>
        {(note || state) &&
          <h1>{note ? note.title : state.title}</h1>
        }
      </header>

      <div className='post-content-wrapper'>
        {!note &&
          <>
            <Skeleton count={5} />
            <Skeleton count={7} />
          </>
        }

        {note && note.body &&
          <PortableText
            value={note.body}
            components={portableTextComponents}
          />
        }
      </div>
    </div>
  )
}
