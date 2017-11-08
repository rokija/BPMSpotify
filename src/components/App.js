import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import Callback from '../containers/Callback';
import LoginPage from '../containers/LoginPage';
import Search from '../components/Search';

class App extends React.Component {
  render() {
    return (
      <div className="base-container">
        <div className="header-container" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/callback" component={Callback} />
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

