import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { RiSkipForwardLine } from 'react-icons/ri';
import { RiSkipBackLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import Spinner from '../../UIComponents/Spinner/Spinner';
import Header from '../../UIComponents/Header/Header';

import EventDetailComponent from '../../components/EventDetailComponent/EventDetailComponent';
import CharacterDetailComponent from '../../components/EventDetailComponent/CharacterDetailComponent';

import classes from '../../components/EventDetailComponent/EventDetails.module.css';

class EventDetail extends Component {
  state = {
    loading: false,
    imagePath: null,
    imageExtension: null,
    eventAPI: '/v1/public/events/'+this.props.match.params.id+'?ts=1&apikey=50ecb8ea2e106155d511b72c67a1225f&hash=6246a3899786b342ae623b9268a1194f',
    loadedDetails: [],
    characterAPI: '/v1/public/events/'+this.props.match.params.id+'/characters?&ts=1&apikey=50ecb8ea2e106155d511b72c67a1225f&hash=6246a3899786b342ae623b9268a1194f',
    characterDetails: [],
    charactersAvailable: 0,
    offset: 0,
    needed: true,
    prevDisabled: true,
    nextDisabled: false,
  }

  componentDidMount () {
    this.setState({loading: true})
    this.GetAxiosEventAPI();
    this.GetAxiosCharacterAPI();
  }

  componentDidUpdate (previousProps, previousState){
    if (previousState.offset !== this.state.offset) {
      this.GetAxiosCharacterAPI();
    }
  }

GetAxiosEventAPI () {
  axios.get(this.state.eventAPI)
  .then(response => {
    this.setState({
      loadedDetails: response.data.data.results[0],
      imagePath:response.data.data.results[0].thumbnail.path,
      imageExtension: response.data.data.results[0].thumbnail.extension,
      charactersAvailable: response.data.data.results[0].characters.available });
    console.log(this.state.loadedDetails);
    this.setState({loading: false})
    if (this.state.charactersAvailable < 20) {
        this.setState({needed: false})
    }
  })
}

GetAxiosCharacterAPI () {
  axios.get(this.state.characterAPI+'&offset='+this.state.offset)
  .then(response => {
    this.setState({characterDetails: response.data.data.results});
    console.log(this.state.characterDetails);
    this.setState({loading: false})
  })
}

OffsetAddClickHandler = (event) => {
    const oldOffset = this.state.offset
    const updatedOffset = oldOffset + 20
    this.setState({offset: updatedOffset, prevDisabled: false});
    if (updatedOffset +20 > this.state.charactersAvailable && this.state.offset != 0) {
      this.setState({nextDisabled: true})
    }
    console.log(this.state.offset);
  }

OffsetSubtractClickHandler = (event) => {
  const oldOffset = this.state.offset
  if (oldOffset > 0 ) {
  const updatedOffset = oldOffset - 20
  this.setState({offset: updatedOffset, nextDisabled: false})
  if (updatedOffset < 20){
    this.setState({prevDisabled: true})
  };
  console.log(this.state.offset);
}
}


  render () {
  const charDetails = this.state.characterDetails.map(char => {
          return (
            <CharacterDetailComponent
              key={char.id}
              name={char.name}
              image={char.thumbnail.path+'/standard_xlarge.'+char.thumbnail.extension}
              />
          )

        })

    let content =  <Spinner />
    const dateStart = moment(this.state.loadedDetails.start).format('MMMM D, YYYY');
    const dateEnd = moment(this.state.loadedDetails.end).format('MMMM D, YYYY');

    if (!this.state.loading) {
      content =
        <EventDetailComponent
          title={this.state.loadedDetails.title}
          id={this.props.match.params.id}
          eventID={this.state.loadedDetails.id}
          description={this.state.loadedDetails.description}
          next={this.state.loadedDetails.next}
          prev={this.state.loadedDetails.prev}
          endDate={dateEnd}
          StartDate={dateStart}
          image={this.state.imagePath+'/detail.'+this.state.imageExtension}
           />
    }
    return (
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{ type: "spring", stiffness:100 }}>
      <Header />
      <div className={classes.EventDetail}>
        {content}
        {this.state.loadedDetails.next ? (
          <React.Fragment>
        <div className={classes.characterDetails}>
          {charDetails}
        </div>
          <div className={classes.CharacterPage}>
            {this.state.needed ? (
              <React.Fragment>
              <button
                disabled={this.state.prevDisabled}
                onClick={this.OffsetSubtractClickHandler}>
                <RiSkipBackLine size={32} />
              </button>
              <button
              disabled={this.state.nextDisabled}
              onClick={this.OffsetAddClickHandler}>
                <RiSkipForwardLine size={32} style={{color:'#25212b'}}/>
              </button>
            </React.Fragment>
            ):null}

          </div>
        </React.Fragment>
        ): null }
      </div>
    </motion.div>
    );
  }
}
export default EventDetail;
