/*
 Dependency imports
*/
import React, {Component} from 'react';
import { Route } from 'react-router-dom';
/*
 Local imports
*/
import Nav from './Nav';
import Home from '../containers/Home'
import Footer from './Footer';

export default class Layout extends Component {

  render () {
    return (
        <div id="master-container">
          <div id="navigation-container" className="container_12 clearfix">
            <Nav />
          </div>
          <div id="base-container">
            <Route path="/" component={ Home } />
          </div>
          // {this.props.children}
        </div>
    );
  }
}

// const Layout = (props) => {
//   const { children } = props;
//   return (
//     <div>
//       <Nav />
//       { children }
//     </div>
//   );
// };
//
// export default Layout;
