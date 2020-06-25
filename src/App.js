import React from 'react';
import { AnimatePresence } from "framer-motion";
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css'

import Welcome from './containers/Welcome/Welcome';
import MarvelEventsList from './containers/MarvelEvents/MarvelEventsList';
import EventDetail from './containers/EventDetail/EventDetail';
import Footer from './UIComponents/Footer/Footer'

function App(props) {

  return (
    <React.Fragment>
      <div className="App">
        <AnimatePresence location={window.location} key={window.location.pathname} exitBeforeEnter>
          <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/marvel-events" exact component={MarvelEventsList}/>
          <Route path="/marvel-events/:id" exact component={EventDetail}/>
        </Switch>
      </AnimatePresence>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default withRouter(App);
