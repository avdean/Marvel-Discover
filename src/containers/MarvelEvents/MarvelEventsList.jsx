import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import classes from './MarvelEvents.module.css'
import { motion } from 'framer-motion'

import Spinner from '../../UIComponents/Spinner/Spinner';
// import Header from '../../UIComponents/Header/Header';
import MarvelEvent from '../../components/MarvelEvent/MarvelEvent';

class MarvelEventsList extends Component {
  state = {
    events: [],
    selectedEventId: null,
    loading: false
    }

  componentDidMount () {
    this.setState({loading: true})
    axios.get('/v1/public/events?orderBy=name&limit=100&ts=1&apikey=50ecb8ea2e106155d511b72c67a1225f&hash=6246a3899786b342ae623b9268a1194f')
        .then(response => {
          this.setState({events:response.data.data.results, loading: false})
          console.log(response.data.data.results)
          });
  }

   eventSelectedHandler = (id) => {
     this.setState({selectedEventId: id});
   }
    render () {
      let events = <Spinner />
      if (!this.state.loading) {
        events = this.state.events.map(event => {
          if (event.start == null) {

          return <MarvelEvent
            title={event.title}
            publishDate="N/A"
            key={event.id}
            img={event.thumbnail.path+'/detail.'	+event.thumbnail.extension}
            url={'/marvel-events/' + event.id}
            />

        }

        const date = moment(event.start).format('MMMM D, YYYY');

        return <MarvelEvent
          title={event.title}
          publishDate={date}
          key={event.id}
          img={event.thumbnail.path+'/detail.'	+event.thumbnail.extension}
            url={'/marvel-events/' + event.id}
          />
      })
      }
        return (
          <motion.div
                  initial={{opacity: 0 }}
                  animate={{opacity: 1 }}
                  exit={{opacity: 0 }}>
                <section className={classes.Events}>
                  {events}
                </section>
            </motion.div>
        );
      //  console.log(events);
    }
}
export default MarvelEventsList;
