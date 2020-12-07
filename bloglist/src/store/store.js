import { createStore, combineReducers }from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogsReducer from '../reducers/blogs';
import loggedInUser from '../reducers/loggedInUser';
import notificationsReducer from '../reducers/notifications';
import usersReducer from '../reducers/usersReducer';

export default createStore(combineReducers({
  blogs: blogsReducer,
  loggedInUser: loggedInUser,
  notifications: notificationsReducer,
  users: usersReducer
}), composeWithDevTools());