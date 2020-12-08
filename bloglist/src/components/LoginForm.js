import React, { useState } from 'react';
import loginService from '../services/login';
import { Button, Form } from 'react-bootstrap';

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

  return <div style={{ marginTop: '10px' }}>
    <h2>Login to the application</h2>
    <Form onSubmit={loginUser} id="login-form">
      <Form.Label>Name:</Form.Label>
      <Form.Control type="text" value={username} onChange={handleUsernameChange} id="username"/>
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" value={password} onChange={handlePasswordChange} id="password"/>
      <Button type="submit" id="login-submit">Login</Button>
    </Form>
  </div>
}

export default LoginForm;