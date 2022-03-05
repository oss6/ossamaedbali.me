import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card(props) {
  function CardContent(props) {
    return <>
      {props.header && <header className='card__header'>{props.header}</header>}
      <div className='card__content'>{props.content}</div>
      {props.footer && <footer className='card__footer'>{props.footer}</footer>}
    </>;
  }

  return props.link
    ? <Link to={props.link} state={props.linkState} className='card' children={CardContent(props)} />
    : <div className='card'>{CardContent(props)}</div>
}
