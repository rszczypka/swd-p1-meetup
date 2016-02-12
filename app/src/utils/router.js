import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import * as Pages from 'pages';
import store from '../stores';
import * as Containers from 'containers';
import history from 'utils/history';

function requireAuth(nextState, replaceState) {
  if (!store.getState().loggedUser.uid) {
    replaceState({ nextPathname: nextState.location.pathname }, '/landing');
  }
}

export default function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={Containers.App}>
          <Route component={Containers.LandingLayout}>
            <Route path="landing" component={Pages.Landing} />
            <Route path="login" component={Pages.LogIn} />
            <Route path="signup" component={Pages.SignUp} />
          </Route>
          <Route path="/" component={Containers.AppLayout}>
            <IndexRoute component={Pages.About} onEnter={requireAuth}/>
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('meetUp')
  );
}
