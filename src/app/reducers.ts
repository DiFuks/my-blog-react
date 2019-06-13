import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { reducer as postReducer } from '@app/post/duck';
import { reducer as submenuReducer } from '@app/submenu/duck';
import { reducer as menuReducer } from '@app/menu/duck';

import { IState as IPostState } from '@app/post/duck/reducer';
import { IState as ISubmenuState } from '@app/submenu/duck/reducer';
import { IState as IMenuState } from '@app/menu/duck/reducer';

export interface IRootState {
  router: RouterState;
  submenu: ISubmenuState;
  post: IPostState;
  menu: IMenuState;
}

export const createRootReducer = (history: History) => combineReducers<IRootState>({
  router: connectRouter(history),
  submenu: submenuReducer,
  post: postReducer,
  menu: menuReducer,
});
