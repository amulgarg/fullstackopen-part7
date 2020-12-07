import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ onLogin, setSuccessMessage, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const loginUser = async (event) => {
    event.preventDefault();
    console.log('username password', username, password);
    try{
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      console.log('user', user);
      onLogin(user);
      setSuccessMessage(`user ${user.name} successfully logged in`);
    }catch(error){
      setErrorMessage(error);
    }
  }

  return <div>
    <h2>Login to the application</h2>
    <form onSubmit={loginUser} id="login-form">
      <div>
		name: <input value={username} onChange={handleUsernameChange} id="username"/>
      </div>
      <div>
		password: <input type="password" value={password} onChange={handlePasswordChange} id="password"/>
      </div>
      <div>
        <button type="submit" id="login-submit">Login</button>
      </div>
    </form>
  </div>
}

export default LoginForm;