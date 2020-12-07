import React, { useEffect } from 'react'
import blogService from './services/blogs';
import './App.css';
import { setInitialBlogs } from './reducers/blogs';
import { setUser } from './reducers/loggedInUser';
import { setSuccessMessage, setErrorMessage } from './reducers/notifications';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog'
import Notification from './components/Notification';

import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';


const Home = ({ user }) => {
  const blogs = useSelector( state => state.blogs );

  const dispatch = useDispatch();

  let sortedBlogs = [...blogs];
  sortedBlogs.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }

    if (b.likes < a.likes) {
      return -1;
    }

    return 0;
  });

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(setInitialBlogs(blogs));
    })}, []);

  const onCreateBlogSuccess = () => {
    blogService.getAll().then(blogs =>
      dispatch(setInitialBlogs(blogs))
    );
  }

  const setSuccessMessageInStore = (successMessage) => {
    dispatch(setSuccessMessage(successMessage));
  }

  const setErrorMessageInStore = (errorMessage) => {
    dispatch(setErrorMessage(errorMessage));
  }

  console.log('sorted blogs', sortedBlogs);

  return (
    <div>
      {user && <div>
        <Link to="/users">See users</Link>
        <BlogForm user={user} setSuccessMessage={setSuccessMessageInStore} setErrorMessage={setErrorMessageInStore} onSuccess={onCreateBlogSuccess}/>
        <br />
        {sortedBlogs.sort(blog => blog.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>}
    </div>
  )
}


const App = () => {
  const user = useSelector( state => state.loggedInUser );
  const dispatch = useDispatch();

  const setUserOnLogin = (user) => {
    dispatch(setUser(user));
  }

  const logout = () => {
    window.localStorage.removeItem('user');
    dispatch(setSuccessMessage(null));
    dispatch(setErrorMessage(null));
    setUserOnLogin(null);
  }

  const setSuccessMessageInStore = (successMessage) => {
    dispatch(setSuccessMessage(successMessage));
  }

  const setErrorMessageInStore = (errorMessage) => {
    dispatch(setErrorMessage(errorMessage));
  }


  return <div>
    <h2>blogs</h2>
    <Notification/>
    {!user && <LoginForm user={user} onLogin={setUserOnLogin} setSuccessMessage={setSuccessMessageInStore} setErrorMessage={setErrorMessageInStore} />}

    {user && <div>{user.name} logged in <button onClick={logout}>logout</button></div>}

    <Router>
      <Switch>
        <Route path="/users/:userId">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs">
          <Home user={user} />
        </Route>
        <Route path="/">
          <Home user={user} />
        </Route>
      </Switch>
    </Router>
  </div>
};

export default App