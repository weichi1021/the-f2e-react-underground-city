import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import routes from './router';
import * as serviceWorker from './serviceWorker';
import './assets/css/bootstrap-grid.css';
import './assets/scss/style.scss';

ReactDOM.render((
  <Router>
    <section name="router-gruop">
      { routes.map( item => (
        <Route path={item.path} component={item.component} key={item.name} exact />
      ))}
    </section>
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
