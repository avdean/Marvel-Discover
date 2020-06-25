import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Welcome.module.css';

import Button from '../../UIComponents/Button/Button';

class Welcome extends Component {
  render () {
    return (
      <motion.div
        initial={{opacity: 0 }}
        animate={{opacity: 1 }}
        exit={{opacity: 0 }}
        className={classes.Welcome}>
            <h1>Welcome to the Marvel Discover app</h1>
            <p>Although, this is a work in progress, the idea is that you can check out the various Marvel Comics events, characters and stories, using the Marvel API.</p>
            <Link to="/marvel-events">
              <Button>
                Get started
              </Button>
            </Link>
      </motion.div>
    );
  }
}

export default Welcome;
