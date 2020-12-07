import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector( state => state.notifications );
  console.log('notific', notifications);
  const { successMessage, errorMessage } = notifications;
  return <React.Fragment>
    {successMessage ? <div className="success-message">{successMessage}</div> : null}
    {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
  </React.Fragment>
}

export default Notification;