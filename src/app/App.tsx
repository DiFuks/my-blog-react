import * as React from 'react';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import { createRootReducer } from '@app/reducers';
import { Routes } from '@app/common/constants';
import { Root } from '@app/common/pages';
import { Theme } from '@app/common/Theme';

const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);

export const App: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Theme>
          <Switch>
            <Route path={Routes.ROOT} name='Root' component={Root} />
          </Switch>
        </Theme>
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);
