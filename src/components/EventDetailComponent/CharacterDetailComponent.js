import React from 'react';
import classes from './CharacterDetails.module.css';
import { motion } from 'framer-motion';

const CharacterDetailComponent = (props) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ease: "easeOut", duration: 2 }}
      className={classes.CharacterSnippet}>
      <img src={props.image}/>
      <h4>{props.name}</h4>
    </motion.div>
  )
}

export default CharacterDetailComponent;
