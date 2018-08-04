import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Header from './Header/header'
import Trending from './Trending/trending'
import Search from './Search/search'
import { Typography } from '@material-ui/core';

class App extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column',backgroundColor:'#000', height:window.innerHeight}}>
          <Header App={this}/>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>     
              <Route exact path='/' render={()=><Trending/>}/>
              <Route path='/search/:keyword' render={()=><Search/>}/>              
            </div>
          </div>
          <Typography style={{position:'fixed',bottom:0,right:0,textSize:8, color:'#AAA'}}>A <a style={{color:'#96cb7f'}} href='https://github.com/divyankkarolia97'>divyankkarolia97</a> production. :)</Typography>
      </div>
    );
  }
}

export default App;