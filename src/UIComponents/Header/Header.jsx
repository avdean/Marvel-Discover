import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Header.module.css';
import {RiArrowLeftLine} from 'react-icons/ri';

const Header = (props) => (
    <div className={classes.Header}>
      <nav>
        <ul>
          <li><Link to="/marvel-events">
            <button><RiArrowLeftLine size={24} style={{color:'#96a7af'}}/></button>
          </Link></li>
        </ul>
      </nav>
    </div>
    );

export default Header;
