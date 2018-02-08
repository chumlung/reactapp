import React from 'react';
import history from './history';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-widgets/dist/css/react-widgets.css'

import './index.css';
import App from './containers/App.js';
import store from './store';
import LogIn from './containers/LogIn';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <div>
      <Route exact path="/" component={LogIn}/>
      <Route path="/list" component={App}/>
    </div>
  </Router>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
