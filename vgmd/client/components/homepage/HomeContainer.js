import React, { Component } from 'react';
import App from './App';
import AboutUs from './AboutUs'

class HomeContainer extends React.Component {
  render() {
    return(
      <div className="row">
        <App/>
        <AboutUs/>
      </div>
    );
  }
}

export default HomeContainer;
