import React from 'react';
import classes from './EventDetails.module.css';
import { motion } from 'framer-motion';

const EventDetailComponent = (props) => {
if (!props.next) {
  return (

    <div className={classes.EventFold}>
      <img src={props.image} alt={props.title}/>
      <div className={classes.EventText}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <p>Since this event is pretty recent, there isn't much more information than this.</p>
  </div>

  )
}

return (
  <>
  <motion.div
    initial={{opacity: 0 }}
    animate={{opacity: 1 }}
    exit={{opacity: 0 }}
    className={classes.EventFold}>
    <img src={props.image}/>
    <div className={classes.EventText}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
      <p><strong>First Issue: </strong>{props.StartDate}</p>
      <p><strong>Final Issue: </strong>{props.endDate}</p>
  </motion.div>
  <h2 style={{marginLeft:'10px'}}>Characters involved: </h2>
</>)
};
export default EventDetailComponent;
