import React from 'react';
import { Link } from 'react-router-dom';

import './Event.css';
import Button from '../../UIComponents/Button/Button';

const marvelEvent = (props) => (

    <div className="Event">
      <div>
        <img src={props.img} alt={props.titiel}/>
        <h1>{props.title}</h1>
    </div>
    <div className="BottomEventSpace">
    <div className="Date">
    <strong>Publish Date:</strong><br/>    {props.publishDate}</div>
            <Link to={{
                pathname: props.url,
                state: {
                  title: props.title
                }
              }}><Button>Discover</Button></Link></div>
          </div>
  )
export default marvelEvent;
