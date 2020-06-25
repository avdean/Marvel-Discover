import React from 'react';

import classes from './Button.module.css';

const Button = (props) => (
<div className={classes.Button}>
  <button>
      {props.children}
  </button>
</div>

);

export default Button;
