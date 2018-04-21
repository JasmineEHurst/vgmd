import React, { Component } from "react";
import HomeContainer from "../components/homepage/HomeContainer";
import Footer from "../components/Footer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Home extends Component {
  render() {
    return (
      <div className="container" id="home-container">
        <HomeContainer />
        <Footer />
      </div>
    );
  }
}
