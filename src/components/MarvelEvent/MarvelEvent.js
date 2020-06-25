import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Event.css';
import Button from '../../UIComponents/Button/Button';

const marvelEvent = (props) => (

    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ type: "spring", stiffness:100 }}
      className="Event">
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
          </motion.div>
  )
export default marvelEvent;
