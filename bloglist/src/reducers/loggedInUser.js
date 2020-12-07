/* eslint-disable indent */
const initialState = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;

const loggedInUserReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export default loggedInUserReducer;