import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IndexRoute, hashHistory } from "react-router";
import Home from "./containers/Home";
import Layout from "./components/Layout";

class RouteList extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Layout}>
            // <IndexRoute path="/home" component={Home} />
          </Route>
          {/* IndexRoute renders Home container by default */}
        </div>
      </Router>
    );
  }
}

export default RouteList;
