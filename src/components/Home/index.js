import React, { Component } from 'react';
import HomeSlider from './slider';
import Subscriptions from '../utils/subcribe';
import HomeArticles from './articles';
import Poll from '../utils/poll';

class Home extends Component {
  state = {
    home: '',
  };
  render() {
    return (
      <div>
        <HomeSlider />
        <Subscriptions />
        <div className='container'>
          <HomeArticles />
          <Poll />
        </div>
      </div>
    );
  }
}

export default Home;
