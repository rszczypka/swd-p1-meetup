import React from 'react';
import { a11y } from 'react-a11y';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import * as Pages from 'pages';
import store from '../stores';
import * as Containers from 'containers';

if (process.env.NODE_ENV === 'development') a11y(React);

function requireAuth(nextState, replaceState) {
  if (!store.getState().loggedUser.uid) {
    replaceState({ nextPathname: nextState.location.pathname }, '/landing');
  }
}

export default function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={Containers.App}>
          <Route component={Containers.LandingLayout}>
            <Route path="landing" component={Pages.Landing} />
            <Route path="login" component={Pages.LogIn} />
            <Route path="signup" component={Pages.SignUp} />
          </Route>
          <Route path="/" component={Containers.AppLayout}>
            <IndexRoute component={Pages.Events} onEnter={requireAuth}/>
            <Route path="add-event" component={Pages.AddEvent} onEnter={requireAuth}/>
            <Route path="logout" component={Pages.Logout} />
          </Route>
        </Route>
      </Router>
    </Provider>
    ,
    document.getElementById('meetUp')
  );
}
