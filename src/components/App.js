import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';
import Callback from './Callback';
import LoginPage from '../containers/LoginPage';
import Search from '../containers/Search';

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>Demo App</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
            {' | '}
            <NavLink to="/search" activeStyle={activeStyle}>Search</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/callback" component={Callback} />
          <Route path="/about" component={AboutPage} />
          <Route path="/search" component={Search} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;

