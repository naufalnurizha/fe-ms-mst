import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from './history';
import './styles/index.scss';

import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Confirm from './pages/Confirm';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgot' component={Forgot} />
        <Route exact path='/confirm' component={Confirm} />
      </Switch>
    </Router>
  );
}

export default App;
