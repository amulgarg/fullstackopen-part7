/* eslint-disable indent */
const initialState = [];

const blogsReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_INIT_USERS':
      return action.users;
    default:
      return state;
  }
}

export const setInitialUsers = (users) => {
  return {
    type: 'SET_INIT_USERS',
    users
  }
}

export default blogsReducer;