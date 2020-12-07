/* eslint-disable indent */
const initialState = {
  successMessage: null,
  errorMessage: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, successMessage: action.successMessage };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
}

export const setSuccessMessage = (successMessage) => {
  return {
    type: 'SET_SUCCESS_MESSAGE',
    successMessage
  }
}

export const setErrorMessage = (errorMessage) => {
  return {
    type: 'SET_ERROR_MESSAGE',
    errorMessage
  }
}

export default notificationReducer;